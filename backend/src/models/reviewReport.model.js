import mongoose from "mongoose";

// Generated review-analytics snapshots — written by the weekly/monthly
// cron jobs (analytics report + top-rated leaderboard).
const reviewReportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["weekly_analytics", "monthly_leaderboard"],
      required: true,
    },
    periodLabel: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const ReviewReport = mongoose.model("ReviewReport", reviewReportSchema);
export default ReviewReport;
