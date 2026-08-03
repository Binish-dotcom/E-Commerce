import ActivityLog from "../models/activityLog.model.js";

// Wraps a controller action with automatic Activity Log + Audit Trail
// recording. `actionName` should be one of ACTIVITY_ACTIONS in
// utils/constants.js. `getTarget` optionally extracts
// { targetType, targetId, oldData } from (req) BEFORE the handler runs,
// and the handler's return value becomes `newData`.
//
// Usage:
//   router.patch("/sellers/:id/approve",
//     auditLog("seller_approved", (req) => ({ targetType: "User", targetId: req.params.id })),
//     approveSeller
//   );
const auditLog = (actionName, getTarget = () => ({})) => {
  return async (req, res, next) => {
    // Capture the original res.json so we can log AFTER the handler
    // succeeds, using whatever it responded with as "newData".
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      // Only log successful admin actions (2xx responses).
      if (res.statusCode < 400) {
        const target = getTarget(req) || {};
        ActivityLog.create({
          admin: req.user?.id || req.user?._id,
          action: actionName,
          targetType: target.targetType || null,
          targetId: target.targetId || req.params?.id || null,
          oldData: target.oldData || null,
          newData: body?.data || body?.result || null,
          ipAddress: req.ip || req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
        }).catch((err) => console.error("Audit log write failed:", err.message));
      }
      return originalJson(body);
    };

    next();
  };
};

export default auditLog;
