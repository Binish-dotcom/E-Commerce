import Notification from "../models/notification.model.js";

class NotificationService {
  async list({ page = 1, limit = 20, unreadOnly = false } = {}) {
    const filter = unreadOnly ? { isRead: false } : {};
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter).sort("-createdAt").skip(skip).limit(limit),
      Notification.countDocuments(filter),
      Notification.countDocuments({ isRead: false }),
    ]);

    return {
      success: true,
      notifications,
      unreadCount,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async markAsRead(id) {
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    return { success: true, data: notification };
  }

  async markAllAsRead() {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    return { success: true, message: "All notifications marked as read" };
  }
}

export default new NotificationService();
