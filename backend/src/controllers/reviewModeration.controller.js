import reviewModerationService from "../services/reviewModeration.service.js";

export const getAllReviews = async (req, res, next) => {
  try {
    const result = await reviewModerationService.getAllReviews(req.query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getReportedReviews = async (req, res, next) => {
  try {
    const result = await reviewModerationService.getReportedReviews(req.query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const approveReview = async (req, res, next) => {
  try {
    const result = await reviewModerationService.approveReview(req.user.id, req.params.id, { ip: req.ip });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const rejectReview = async (req, res, next) => {
  try {
    const result = await reviewModerationService.rejectReview(req.user.id, req.params.id, { ip: req.ip });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const togglePinReview = async (req, res, next) => {
  try {
    const result = await reviewModerationService.togglePin(req.user.id, req.params.id, { ip: req.ip });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const suspendBuyer = async (req, res, next) => {
  try {
    const result = await reviewModerationService.suspendBuyer(req.user.id, req.params.buyerId, { ip: req.ip });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getReviewActivityLogs = async (req, res, next) => {
  try {
    const result = await reviewModerationService.getActivityLogs(req.query);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
