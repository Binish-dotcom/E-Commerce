import asyncHandler from "../utils/asyncHandler.js";
import adminStatsService from "../services/adminStats.service.js";

export const getExtendedOverview = asyncHandler(async (req, res) => {
  const result = await adminStatsService.getExtendedOverview();
  res.status(200).json(result);
});

export const getCategoryDistribution = asyncHandler(async (req, res) => {
  const result = await adminStatsService.getCategoryDistribution();
  res.status(200).json(result);
});

export const getTopCategories = asyncHandler(async (req, res) => {
  const result = await adminStatsService.getTopCategories();
  res.status(200).json(result);
});

export const getDailyOrders = asyncHandler(async (req, res) => {
  const result = await adminStatsService.getDailyOrders();
  res.status(200).json(result);
});
