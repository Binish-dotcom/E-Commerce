import asyncHandler from "../utils/asyncHandler.js";
import adminTablesService from "../services/adminTables.service.js";

export const getBuyersTable = asyncHandler(async (req, res) => {
  const { page, limit, sort } = req.query;
  const result = await adminTablesService.getBuyersTable({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort,
  });
  res.status(200).json(result);
});

export const getSellersTable = asyncHandler(async (req, res) => {
  const { page, limit, sort, status } = req.query;
  const result = await adminTablesService.getSellersTable({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort,
    status,
  });
  res.status(200).json(result);
});

export const getOrdersTable = asyncHandler(async (req, res) => {
  const { page, limit, sort, status, paymentStatus, range, q } = req.query;
  const result = await adminTablesService.getOrdersTable({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort,
    status,
    paymentStatus,
    range,
    q,
  });
  res.status(200).json(result);
});
