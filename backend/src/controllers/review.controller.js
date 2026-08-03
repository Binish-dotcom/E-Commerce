import reviewService from "../services/review.service.js";

// ==========================
// Create a review (buyer only, verified purchase enforced in service)
// ==========================
export const createReview = async (req, res, next) => {
  try {
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        success: false,
        message: "Only buyers can submit reviews",
      });
    }

    const result = await reviewService.createReview(req.user.id, req.body, { ip: req.ip });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update own review
// ==========================
export const updateReview = async (req, res, next) => {
  try {
    const result = await reviewService.updateReview(req.user.id, req.params.id, req.body, { ip: req.ip });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete own review
// ==========================
export const deleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(req.user.id, req.params.id, { meta: { ip: req.ip } });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Like / unlike a review
// ==========================
export const toggleLikeReview = async (req, res, next) => {
  try {
    const result = await reviewService.toggleLike(req.user.id, req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Paginated + sorted reviews for a product (public)
// ==========================
export const getProductReviews = async (req, res, next) => {
  try {
    const { page, limit, sort, verifiedOnly, rating, imagesOnly } = req.query;
    const result = await reviewService.getProductReviews(req.params.productId, {
      page,
      limit,
      sort,
      verifiedOnly,
      rating,
      imagesOnly,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Average rating + star distribution for a product (public)
// ==========================
export const getRatingSummary = async (req, res, next) => {
  try {
    const result = await reviewService.getRatingSummary(req.params.productId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Can the logged-in buyer review this product? (drives the frontend form)
// ==========================
export const canReview = async (req, res, next) => {
  try {
    const result = await reviewService.canReview(req.user.id, req.params.productId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
