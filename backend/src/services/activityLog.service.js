import ActivityLog from "../models/activityLog.model.js";

class ActivityLogService {
  async list({ page = 1, limit = 20, action, adminId } = {}) {
    const filter = {};
    if (action) filter.action = action;
    if (adminId) filter.admin = adminId;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter)
        .populate("admin", "firstName lastName email")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments(filter),
    ]);

    return {
      success: true,
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }
}

export default new ActivityLogService();
