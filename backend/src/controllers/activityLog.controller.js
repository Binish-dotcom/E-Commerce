import asyncHandler from "../utils/asyncHandler.js";
import activityLogService from "../services/activityLog.service.js";

export const getActivityLogs = asyncHandler(async (req, res) => {
  const { page, limit, action, adminId } = req.query;
  const result = await activityLogService.list({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    action,
    adminId,
  });
  res.status(200).json(result);
});
