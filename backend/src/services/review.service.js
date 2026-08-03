import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import ReviewActivityLog from "../models/reviewActivityLog.model.js";
import { stripHtml, sanitizeArray } from "../utils/sanitize.js";
import { emitToUser, emitToAdmins } from "../sockets/index.js";
import sendReviewEmail from "../utils/sendReviewEmail.js";
import {
  REVIEW_ACTIVITY_ACTIONS,
  SOCKET_EVENTS,
  SPAM_REPORT_THRESHOLD,
} from "../utils/constants.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const SORT_MAP = {
  newest: { isPinned: -1, createdAt: -1 },
  oldest: { createdAt: 1 },
  highest: { rating: -1, createdAt: -1 },
  lowest: { rating: 1, createdAt: -1 },
  helpful: { isPinned: -1, likesCount: -1, createdAt: -1 },
};

// Fire-and-forget helper: writes a review activity log entry without
// ever blocking or failing the calling action.
const logActivity = async ({ userId, action, reviewId, oldData, newData, ipAddress }) => {
  try {
    await ReviewActivityLog.create({
      user: userId,
      action,
      review: reviewId || null,
      oldData: oldData || null,
      newData: newData || null,
      ipAddress: ipAddress || "",
    });
  } catch (error) {
    console.error("Review activity log failed:", error.message);
  }
};

class ReviewService {
  // =========================
  // Create a review — only for a product the buyer has actually
  // received a DELIVERED order for (verified purchase gate)
  // =========================
  async createReview(buyerId, data, meta = {}) {
    const { productId, rating, title, description, pros = [], cons = [], images = [], videos = [], isAnonymous = false } = data;

    const deliveredOrder = await Order.findOne({
      buyer: buyerId,
      product: productId,
      status: "delivered",
    }).sort({ createdAt: -1 });

    if (!deliveredOrder) {
      throw createError(
        "You can only review products you have purchased and received",
        403
      );
    }

    const alreadyReviewed = await Review.findOne({ product: productId, buyer: buyerId });
    if (alreadyReviewed) {
      throw createError("You have already reviewed this product", 400);
    }

    const product = await Product.findById(productId).select("seller title");
    if (!product) {
      throw createError("Product not found", 404);
    }

    // Structural guard: a seller account can never hold a "buyer"-role
    // delivered order for its own product, but this stays as a defensive
    // check against a seller reviewing their own listing.
    if (String(product.seller) === String(buyerId)) {
      throw createError("Sellers cannot review their own products", 403);
    }

    const review = await Review.create({
      product: productId,
      buyer: buyerId,
      seller: product.seller,
      order: deliveredOrder._id,
      rating,
      title: stripHtml(title),
      description: stripHtml(description),
      pros: sanitizeArray(pros).slice(0, 10),
      cons: sanitizeArray(cons).slice(0, 10),
      images,
      videos,
      isAnonymous: Boolean(isAnonymous),
      verifiedPurchase: true,
    });

    const populated = await review.populate("buyer", "firstName lastName");

    // Notify the seller (socket + DB notification) — best-effort, never
    // blocks the buyer's submission if it fails.
    try {
      emitToUser(product.seller, SOCKET_EVENTS.NEW_NOTIFICATION, {
        type: "new_review",
        title: "New Review Received",
        productTitle: product.title,
        rating,
      });
      await Notification.create({
        type: "new_review",
        title: "New Review Received",
        message: `${populated.buyer?.firstName || "A buyer"} left a ${rating}-star review on "${product.title}".`,
        relatedId: review._id,
        relatedModel: "Review",
      });
    } catch (error) {
      console.error("Seller review notification failed:", error.message);
    }

    logActivity({
      userId: buyerId,
      action: REVIEW_ACTIVITY_ACTIONS.REVIEW_CREATED,
      reviewId: review._id,
      newData: { rating, title },
      ipAddress: meta.ip,
    });

    return {
      success: true,
      message: "Review submitted successfully",
      review: populated,
    };
  }

  // =========================
  // Update — only the review's own author
  // =========================
  async updateReview(buyerId, reviewId, data, meta = {}) {
    const review = await Review.findOne({ _id: reviewId, buyer: buyerId });

    if (!review) {
      throw createError("Review not found", 404);
    }

    const oldData = {
      rating: review.rating,
      title: review.title,
      description: review.description,
    };

    const { rating, title, description, images, videos, pros, cons, isAnonymous } = data;

    if (rating !== undefined) review.rating = rating;
    if (title !== undefined) review.title = stripHtml(title);
    if (description !== undefined) review.description = stripHtml(description);
    if (images !== undefined) review.images = images;
    if (videos !== undefined) review.videos = videos;
    if (pros !== undefined) review.pros = sanitizeArray(pros).slice(0, 10);
    if (cons !== undefined) review.cons = sanitizeArray(cons).slice(0, 10);
    if (isAnonymous !== undefined) review.isAnonymous = Boolean(isAnonymous);

    await review.save();

    logActivity({
      userId: buyerId,
      action: REVIEW_ACTIVITY_ACTIONS.REVIEW_UPDATED,
      reviewId: review._id,
      oldData,
      newData: { rating: review.rating, title: review.title },
      ipAddress: meta.ip,
    });

    return {
      success: true,
      message: "Review updated successfully",
      review,
    };
  }

  // =========================
  // Delete — the review's own author, OR an admin (moderation)
  // =========================
  async deleteReview(userId, reviewId, { isAdmin = false, meta = {} } = {}) {
    const query = isAdmin ? { _id: reviewId } : { _id: reviewId, buyer: userId };
    const review = await Review.findOne(query).populate("product", "title");

    if (!review) {
      throw createError("Review not found", 404);
    }

    await Review.findByIdAndDelete(reviewId);

    logActivity({
      userId,
      action: isAdmin ? REVIEW_ACTIVITY_ACTIONS.ADMIN_DELETED_REVIEW : REVIEW_ACTIVITY_ACTIONS.REVIEW_DELETED,
      reviewId,
      oldData: { rating: review.rating, title: review.title, buyer: review.buyer },
      ipAddress: meta.ip,
    });

    if (isAdmin) {
      try {
        const buyer = await User.findById(review.buyer).select("email firstName");
        if (buyer?.email) {
          await sendReviewEmail(buyer.email, "review_deleted", {
            productTitle: review.product?.title || "your product",
          });
        }
        emitToUser(review.buyer, SOCKET_EVENTS.NEW_NOTIFICATION, {
          type: "review_deleted",
          title: "Your review was removed",
        });
      } catch (error) {
        console.error("Review-deleted notify failed:", error.message);
      }
    }

    return { success: true, message: "Review deleted successfully" };
  }

  // =========================
  // Like / unlike (helpful vote) toggle on a review
  // =========================
  async toggleLike(userId, reviewId) {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw createError("Review not found", 404);
    }

    const alreadyLiked = review.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      review.likes = review.likes.filter((id) => id.toString() !== userId);
    } else {
      review.likes.push(userId);
    }

    await review.save();

    logActivity({
      userId,
      action: REVIEW_ACTIVITY_ACTIONS.HELPFUL_VOTE,
      reviewId: review._id,
      newData: { liked: !alreadyLiked },
    });

    return {
      success: true,
      liked: !alreadyLiked,
      likesCount: review.likes.length,
    };
  }

  // =========================
  // Report a review (buyer/seller/anyone logged in)
  // =========================
  async reportReview(userId, reviewId, { reason, note } = {}) {
    const review = await Review.findById(reviewId);
    if (!review) throw createError("Review not found", 404);

    const alreadyReported = review.reports.some((r) => String(r.user) === String(userId));
    if (alreadyReported) {
      throw createError("You have already reported this review", 400);
    }

    review.reports.push({ user: userId, reason: reason || "other", note });

    // Auto-flag once report count crosses the spam threshold
    if (review.reports.length >= SPAM_REPORT_THRESHOLD) {
      review.isFlaggedSpam = true;
    }

    await review.save();

    emitToAdmins(SOCKET_EVENTS.NEW_NOTIFICATION, {
      type: "reported_review",
      title: "Review Reported",
      reviewId: review._id,
      reportCount: review.reports.length,
    });

    if (review.reports.length >= SPAM_REPORT_THRESHOLD) {
      await Notification.create({
        type: "spam_detected",
        title: "Review Auto-Flagged as Spam",
        message: `A review has been reported ${review.reports.length} times and was auto-flagged for moderation.`,
        relatedId: review._id,
        relatedModel: "Review",
      }).catch((err) => console.error("Spam notification failed:", err.message));
    }

    logActivity({ userId, action: REVIEW_ACTIVITY_ACTIONS.REVIEW_REPORTED, reviewId, newData: { reason } });

    return { success: true, message: "Review reported. Our team will take a look." };
  }

  // =========================
  // Seller reply to a review on one of their products
  // =========================
  async sellerReply(sellerId, reviewId, message) {
    const review = await Review.findOne({ _id: reviewId, seller: sellerId }).populate("product", "title");
    if (!review) throw createError("Review not found for this seller", 404);

    review.sellerReply = { message: stripHtml(message), repliedAt: new Date() };
    await review.save();

    try {
      const buyer = await User.findById(review.buyer).select("email");
      emitToUser(review.buyer, SOCKET_EVENTS.NEW_NOTIFICATION, {
        type: "seller_reply",
        title: "Seller Replied to Your Review",
        productTitle: review.product?.title,
      });
      if (buyer?.email) {
        await sendReviewEmail(buyer.email, "seller_reply", {
          productTitle: review.product?.title,
          replyMessage: review.sellerReply.message,
        });
      }
    } catch (error) {
      console.error("Seller reply notify failed:", error.message);
    }

    logActivity({ userId: sellerId, action: REVIEW_ACTIVITY_ACTIONS.SELLER_REPLY, reviewId });

    return { success: true, message: "Reply posted", review };
  }

  // =========================
  // Paginated + sorted + filtered reviews for a product (public)
  // =========================
  async getProductReviews(productId, { page = 1, limit = 5, sort = "newest", verifiedOnly, rating, imagesOnly } = {}) {
    const currentPage = Math.max(parseInt(page) || 1, 1);
    const perPage = Math.max(parseInt(limit) || 5, 1);
    const skip = (currentPage - 1) * perPage;
    const sortBy = SORT_MAP[sort] || SORT_MAP.newest;

    const filter = { product: productId, status: "approved" };
    if (verifiedOnly === "true" || verifiedOnly === true) filter.verifiedPurchase = true;
    if (rating) filter.rating = Number(rating);
    if (imagesOnly === "true" || imagesOnly === true) filter.images = { $exists: true, $ne: [] };

    const [reviews, totalReviews] = await Promise.all([
      Review.find(filter)
        .populate("buyer", "firstName lastName")
        .sort(sortBy)
        .skip(skip)
        .limit(perPage),
      Review.countDocuments(filter),
    ]);

    // Anonymize buyer identity on the response for anonymous reviews.
    const shaped = reviews.map((r) => {
      const obj = r.toObject();
      if (obj.isAnonymous) {
        obj.buyer = { firstName: "Anonymous", lastName: "Buyer" };
      }
      return obj;
    });

    return {
      success: true,
      reviews: shaped,
      pagination: {
        page: currentPage,
        limit: perPage,
        totalReviews,
        totalPages: Math.max(Math.ceil(totalReviews / perPage), 1),
      },
    };
  }

  // =========================
  // Average rating + star distribution (1-5) for a product
  // =========================
  async getRatingSummary(productId) {
    const rows = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId), status: "approved" } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ]);

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalCount = 0;
    let totalStars = 0;

    rows.forEach((row) => {
      distribution[row._id] = row.count;
      totalCount += row.count;
      totalStars += row._id * row.count;
    });

    const averageRating = totalCount > 0 ? Number((totalStars / totalCount).toFixed(1)) : 0;
    const percentage = {};
    Object.keys(distribution).forEach((star) => {
      percentage[star] = totalCount > 0 ? Math.round((distribution[star] / totalCount) * 100) : 0;
    });

    return {
      success: true,
      summary: {
        averageRating,
        totalReviews: totalCount,
        distribution,
        percentage,
      },
    };
  }

  // =========================
  // Can the current buyer review this product? (used to show/hide the form)
  // =========================
  async canReview(buyerId, productId) {
    const [deliveredOrder, existingReview] = await Promise.all([
      Order.findOne({ buyer: buyerId, product: productId, status: "delivered" }),
      Review.findOne({ product: productId, buyer: buyerId }),
    ]);

    return {
      success: true,
      canReview: Boolean(deliveredOrder) && !existingReview,
      hasPurchased: Boolean(deliveredOrder),
      alreadyReviewed: Boolean(existingReview),
    };
  }

  // =========================
  // My Reviews — everything the logged-in buyer has written
  // =========================
  async getMyReviews(buyerId, { page = 1, limit = 10 } = {}) {
    const currentPage = Math.max(parseInt(page) || 1, 1);
    const perPage = Math.max(parseInt(limit) || 10, 1);
    const skip = (currentPage - 1) * perPage;

    const [reviews, total] = await Promise.all([
      Review.find({ buyer: buyerId })
        .populate("product", "title images")
        .sort("-createdAt")
        .skip(skip)
        .limit(perPage),
      Review.countDocuments({ buyer: buyerId }),
    ]);

    return {
      success: true,
      reviews,
      pagination: { page: currentPage, limit: perPage, total, totalPages: Math.max(Math.ceil(total / perPage), 1) },
    };
  }

  // =========================
  // Seller's reviews inbox — every review across their products
  // =========================
  async getSellerReviews(sellerId, { page = 1, limit = 10, rating } = {}) {
    const currentPage = Math.max(parseInt(page) || 1, 1);
    const perPage = Math.max(parseInt(limit) || 10, 1);
    const skip = (currentPage - 1) * perPage;

    const filter = { seller: sellerId, status: "approved" };
    if (rating) filter.rating = Number(rating);

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("buyer", "firstName lastName")
        .populate("product", "title")
        .sort("-createdAt")
        .skip(skip)
        .limit(perPage),
      Review.countDocuments(filter),
    ]);

    return {
      success: true,
      reviews,
      pagination: { page: currentPage, limit: perPage, total, totalPages: Math.max(Math.ceil(total / perPage), 1) },
    };
  }
}

export default new ReviewService();
