import asyncHandler from "../utils/asyncHandler.js";
import notificationService from "../services/notification.service.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { page, limit, unreadOnly } = req.query;
  const result = await notificationService.list({
    page: Number(page) || 1,
    limit: Number(limit) || 20,
    unreadOnly: unreadOnly === "true",
  });
  res.status(200).json(result);
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markAsRead(req.params.id);
  res.status(200).json(result);
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markAllAsRead();
  res.status(200).json(result);
});
