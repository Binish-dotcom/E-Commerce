import analyticsService from "../services/analytics.service.js";

export const getOverview = async (req, res, next) => {
  try {
    const result = await analyticsService.getOverview();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSalesReport = async (req, res, next) => {
  try {
    const result = await analyticsService.getSalesReport();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getRevenue = async (req, res, next) => {
  try {
    const result = await analyticsService.getRevenue();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getLatestOrders = async (req, res, next) => {
  try {
    const result = await analyticsService.getLatestOrders();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTopSellers = async (req, res, next) => {
  try {
    const result = await analyticsService.getTopSellers();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const result = await analyticsService.getTopProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPendingSellers = async (req, res, next) => {
  try {
    const result = await analyticsService.getPendingSellers();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPendingProducts = async (req, res, next) => {
  try {
    const result = await analyticsService.getPendingProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getRecentActivity = async (req, res, next) => {
  try {
    const result = await analyticsService.getRecentActivity();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
