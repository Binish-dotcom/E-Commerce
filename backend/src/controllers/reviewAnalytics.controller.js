import reviewAnalyticsService from "../services/reviewAnalytics.service.js";

export const getReviewOverview = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getOverview());
  } catch (error) {
    next(error);
  }
};

export const getMostReviewedProducts = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getMostReviewedProducts());
  } catch (error) {
    next(error);
  }
};

export const getHighestRatedProducts = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getHighestRatedProducts());
  } catch (error) {
    next(error);
  }
};

export const getLowestRatedProducts = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getLowestRatedProducts());
  } catch (error) {
    next(error);
  }
};

export const getMostActiveBuyers = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getMostActiveBuyers());
  } catch (error) {
    next(error);
  }
};

export const getProductsWithoutReviews = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getProductsWithoutReviews());
  } catch (error) {
    next(error);
  }
};

export const getMonthlyTrends = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getMonthlyTrends());
  } catch (error) {
    next(error);
  }
};

export const getReviewDistribution = async (req, res, next) => {
  try {
    res.status(200).json(await reviewAnalyticsService.getReviewDistribution());
  } catch (error) {
    next(error);
  }
};
