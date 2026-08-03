import reviewService from "../services/review.service.js";

// =========================
// Report a review (any authenticated user)
// =========================
export const reportReview = async (req, res, next) => {
  try {
    const result = await reviewService.reportReview(req.user.id, req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =========================
// Seller replies to a review on their own product
// =========================
export const sellerReply = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ success: false, message: "Only sellers can reply to reviews" });
    }
    const result = await reviewService.sellerReply(req.user.id, req.params.id, req.body.message);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =========================
// My Reviews (logged-in buyer)
// =========================
export const getMyReviews = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await reviewService.getMyReviews(req.user.id, { page, limit });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =========================
// Seller's review inbox — every review across their products
// =========================
export const getSellerReviews = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ success: false, message: "Sellers only" });
    }
    const { page, limit, rating } = req.query;
    const result = await reviewService.getSellerReviews(req.user.id, { page, limit, rating });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =========================
// Delete review — admin moderation path (buyer's own-delete stays on
// the original DELETE /:id route in review.controller.js)
// =========================
export const adminDeleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(req.user.id, req.params.id, {
      isAdmin: true,
      meta: { ip: req.ip },
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
