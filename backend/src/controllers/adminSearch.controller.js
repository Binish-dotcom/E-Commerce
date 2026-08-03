import asyncHandler from "../utils/asyncHandler.js";
import adminSearchService from "../services/adminSearch.service.js";

export const globalSearch = asyncHandler(async (req, res) => {
  const result = await adminSearchService.globalSearch(req.query.q);
  res.status(200).json(result);
});

export const searchBuyers = asyncHandler(async (req, res) => {
  const buyers = await adminSearchService.searchBuyers(req.query.q || "");
  res.status(200).json({ success: true, buyers });
});

export const searchSellers = asyncHandler(async (req, res) => {
  const sellers = await adminSearchService.searchSellers(req.query.q || "");
  res.status(200).json({ success: true, sellers });
});

export const searchProducts = asyncHandler(async (req, res) => {
  const products = await adminSearchService.searchProducts(req.query.q || "");
  res.status(200).json({ success: true, products });
});

export const searchOrders = asyncHandler(async (req, res) => {
  const orders = await adminSearchService.searchOrders(req.query.q || "");
  res.status(200).json({ success: true, orders });
});
