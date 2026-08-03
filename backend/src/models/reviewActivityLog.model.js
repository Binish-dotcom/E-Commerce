import mongoose from "mongoose";

// Activity log + audit trail scoped to the Reviews & Ratings module.
// Kept separate from the Admin Dashboard's ActivityLog (which requires
// an admin actor) since review actions are performed by buyers and
// sellers too, not just admins.
const reviewActivityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: null },
    oldData: { type: mongoose.Schema.Types.Mixed, default: null },
    newData: { type: mongoose.Schema.Types.Mixed, default: null },
    ipAddress: { type: String, default: "" },
  },
  { timestamps: true }
);

reviewActivityLogSchema.index({ createdAt: -1 });
reviewActivityLogSchema.index({ review: 1 });

const ReviewActivityLog = mongoose.model("ReviewActivityLog", reviewActivityLogSchema);
export default ReviewActivityLog;
