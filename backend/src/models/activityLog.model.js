import mongoose from "mongoose";

// Combined Admin "Activity Log" + "Audit Trail".
// Every sensitive admin action is written here: who did it, when,
// what changed (old vs new), and from which IP address.
const activityLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true },
    targetType: { type: String, default: null }, // e.g. "Product", "User", "Order"
    targetId: { type: mongoose.Schema.Types.ObjectId, default: null },
    oldData: { type: mongoose.Schema.Types.Mixed, default: null },
    newData: { type: mongoose.Schema.Types.Mixed, default: null },
    ipAddress: { type: String, default: "" },
  },
  { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
