import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import ReviewActivityLog from "../models/reviewActivityLog.model.js";
import { emitToUser } from "../sockets/index.js";
import sendReviewEmail from "../utils/sendReviewEmail.js";
import { REVIEW_ACTIVITY_ACTIONS, SOCKET_EVENTS } from "../utils/constants.js";
import { NotFoundError, BadRequestError } from "../utils/ApiError.js";

const logActivity = async (payload) => {
  try {
    await ReviewActivityLog.create(payload);
  } catch (error) {
    console.error("Review activity log failed:", error.message);
  }
};

// Admin-only review moderation: browse/search/filter every review on
// the platform, approve/reject, pin/unpin, delete, view reported
// reviews, and suspend buyers who repeatedly post fake reviews.
class ReviewModerationService {
  async getAllReviews({
    page = 1,
    limit = 15,
    status,
    rating,
    verifiedOnly,
    reportedOnly,
    imagesOnly,
    product,
    seller,
    from,
    to,
    q,
  } = {}) {
    const currentPage = Math.max(parseInt(page) || 1, 1);
    const perPage = Math.max(parseInt(limit) || 15, 1);
    const skip = (currentPage - 1) * perPage;

    const filter = {};
    if (status) filter.status = status;
    if (rating) filter.rating = Number(rating);
    if (verifiedOnly === "true") filter.verifiedPurchase = true;
    if (imagesOnly === "true") filter.images = { $exists: true, $ne: [] };
    if (product) filter.product = product;
    if (seller) filter.seller = seller;
    if (reportedOnly === "true") filter["reports.0"] = { $exists: true };
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (q) {
      filter.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("buyer", "firstName lastName email")
        .populate("product", "title")
        .populate("seller", "firstName lastName storeProfile.storeName")
        .sort({ isPinned: -1, createdAt: -1 })
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

  async getReportedReviews({ page = 1, limit = 15 } = {}) {
    return this.getAllReviews({ page, limit, reportedOnly: "true" });
  }

  async approveReview(adminId, reviewId, meta = {}) {
    const review = await Review.findById(reviewId).populate("product", "title");
    if (!review) throw new NotFoundError("Review not found");

    const oldData = { status: review.status };
    review.status = "approved";
    await review.save();

    try {
      const buyer = await User.findById(review.buyer).select("email");
      emitToUser(review.buyer, SOCKET_EVENTS.NEW_NOTIFICATION, { type: "review_approved", title: "Your review was approved" });
      if (buyer?.email) {
        await sendReviewEmail(buyer.email, "review_approved", { productTitle: review.product?.title });
      }
    } catch (error) {
      console.error("Review-approved notify failed:", error.message);
    }

    logActivity({
      user: adminId,
      action: REVIEW_ACTIVITY_ACTIONS.ADMIN_APPROVED_REVIEW,
      review: review._id,
      oldData,
      newData: { status: "approved" },
      ipAddress: meta.ip,
    });

    return { success: true, message: "Review approved", data: review };
  }

  async rejectReview(adminId, reviewId, meta = {}) {
    const review = await Review.findById(reviewId);
    if (!review) throw new NotFoundError("Review not found");

    const oldData = { status: review.status };
    review.status = "rejected";
    await review.save();

    logActivity({
      user: adminId,
      action: REVIEW_ACTIVITY_ACTIONS.ADMIN_REJECTED_REVIEW,
      review: review._id,
      oldData,
      newData: { status: "rejected" },
      ipAddress: meta.ip,
    });

    return { success: true, message: "Review rejected", data: review };
  }

  async togglePin(adminId, reviewId, meta = {}) {
    const review = await Review.findById(reviewId);
    if (!review) throw new NotFoundError("Review not found");

    const oldData = { isPinned: review.isPinned };
    review.isPinned = !review.isPinned;
    await review.save();

    logActivity({
      user: adminId,
      action: review.isPinned ? REVIEW_ACTIVITY_ACTIONS.ADMIN_PINNED_REVIEW : REVIEW_ACTIVITY_ACTIONS.ADMIN_UNPINNED_REVIEW,
      review: review._id,
      oldData,
      newData: { isPinned: review.isPinned },
      ipAddress: meta.ip,
    });

    return { success: true, message: review.isPinned ? "Review pinned" : "Review unpinned", data: review };
  }

  // Suspend a buyer's account for posting fake/spam reviews.
  async suspendBuyer(adminId, buyerId, meta = {}) {
    const buyer = await User.findOne({ _id: buyerId, role: "buyer" });
    if (!buyer) throw new NotFoundError("Buyer not found");
    if (buyer.accountStatus === "suspended") throw new BadRequestError("Buyer is already suspended");

    const oldData = { accountStatus: buyer.accountStatus };
    buyer.accountStatus = "suspended";
    await buyer.save();

    logActivity({
      user: adminId,
      action: REVIEW_ACTIVITY_ACTIONS.ADMIN_SUSPENDED_BUYER,
      oldData,
      newData: { accountStatus: "suspended" },
      ipAddress: meta.ip,
    });

    return { success: true, message: "Buyer suspended", data: buyer };
  }

  async getActivityLogs({ page = 1, limit = 25, action } = {}) {
    const currentPage = Math.max(parseInt(page) || 1, 1);
    const perPage = Math.max(parseInt(limit) || 25, 1);
    const skip = (currentPage - 1) * perPage;

    const filter = {};
    if (action) filter.action = action;

    const [logs, total] = await Promise.all([
      ReviewActivityLog.find(filter)
        .populate("user", "firstName lastName email role")
        .populate("review", "title")
        .sort("-createdAt")
        .skip(skip)
        .limit(perPage),
      ReviewActivityLog.countDocuments(filter),
    ]);

    return {
      success: true,
      logs,
      pagination: { page: currentPage, limit: perPage, total, totalPages: Math.max(Math.ceil(total / perPage), 1) },
    };
  }
}

export default new ReviewModerationService();
