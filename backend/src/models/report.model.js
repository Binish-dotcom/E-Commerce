import mongoose from "mongoose";

// Generated report snapshots — written by cron jobs (daily / monthly)
// and by the manual "Generate Report" quick action.
const reportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["daily", "monthly", "manual"],
      required: true,
    },
    periodLabel: { type: String, required: true }, // e.g. "2026-08-01" or "August 2026"
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null when generated automatically by cron
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
