import cron from "node-cron";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import ReviewActivityLog from "../models/reviewActivityLog.model.js";
import ReviewReport from "../models/reviewReport.model.js";
import reviewAnalyticsService from "../services/reviewAnalytics.service.js";
import sendReviewEmail from "../utils/sendReviewEmail.js";
import { emitToAdmins, emitToUser } from "../sockets/index.js";
import {
  SOCKET_EVENTS,
  REVIEW_REMINDER_DAYS_AFTER_DELIVERY,
  SPAM_MIN_DESCRIPTION_LENGTH,
  SPAM_REPEATED_CHAR_PATTERN,
} from "../utils/constants.js";

// ==========================================
// All scheduled jobs for the Product Reviews
// & Ratings module. Registered once from
// server.js on boot, alongside the Admin
// Dashboard's cron jobs.
// ==========================================

// 1. Every day (9 AM) — delivered orders older than 7 days with no
//    review yet get an in-app reminder notification for the buyer.
const reviewReminderJob = () => {
  cron.schedule("0 9 * * *", async () => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - REVIEW_REMINDER_DAYS_AFTER_DELIVERY);

      const eligibleOrders = await Order.find({
        status: "delivered",
        updatedAt: { $lte: cutoff },
      })
        .populate("buyer", "_id")
        .limit(500);

      let reminderCount = 0;
      for (const order of eligibleOrders) {
        const alreadyReviewed = await Review.exists({ product: order.product, buyer: order.buyer._id });
        if (!alreadyReviewed) {
          emitToUser(order.buyer._id, SOCKET_EVENTS.NEW_NOTIFICATION, {
            type: "review_reminder",
            title: "How was your recent purchase?",
            productTitle: order.productTitle,
          });
          reminderCount += 1;
        }
      }

      console.log(`⭐ [Cron] Review reminders sent to ${reminderCount} buyer(s)`);
    } catch (error) {
      console.error("[Cron] Review reminder job failed:", error.message);
    }
  });
};

// 2. Every day (9:30 AM) — email reminder to buyers who haven't
//    reviewed purchased products (same eligibility as job 1, email channel).
const reviewEmailReminderJob = () => {
  cron.schedule("30 9 * * *", async () => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - REVIEW_REMINDER_DAYS_AFTER_DELIVERY);

      const eligibleOrders = await Order.find({ status: "delivered", updatedAt: { $lte: cutoff } })
        .populate("buyer", "email")
        .limit(200);

      let emailCount = 0;
      for (const order of eligibleOrders) {
        const alreadyReviewed = await Review.exists({ product: order.product, buyer: order.buyer._id });
        if (!alreadyReviewed && order.buyer?.email) {
          try {
            await sendReviewEmail(order.buyer.email, "review_reminder", { productTitle: order.productTitle });
            emailCount += 1;
          } catch (mailError) {
            console.error("Review reminder email failed:", mailError.message);
          }
        }
      }

      console.log(`📧 [Cron] Review reminder emails sent: ${emailCount}`);
    } catch (error) {
      console.error("[Cron] Review email reminder job failed:", error.message);
    }
  });
};

// 3. Every week (Monday, 1 AM) — generate + store the review analytics report
const weeklyAnalyticsReportJob = () => {
  cron.schedule("0 1 * * 1", async () => {
    try {
      const [overview, mostReviewed, highestRated, lowestRated, distribution] = await Promise.all([
        reviewAnalyticsService.getOverview(),
        reviewAnalyticsService.getMostReviewedProducts(),
        reviewAnalyticsService.getHighestRatedProducts(),
        reviewAnalyticsService.getLowestRatedProducts(),
        reviewAnalyticsService.getReviewDistribution(),
      ]);

      await ReviewReport.create({
        type: "weekly_analytics",
        periodLabel: `Week of ${new Date().toISOString().slice(0, 10)}`,
        data: {
          overview: overview.overview,
          mostReviewedProducts: mostReviewed.mostReviewedProducts,
          highestRatedProducts: highestRated.highestRatedProducts,
          lowestRatedProducts: lowestRated.lowestRatedProducts,
          distribution: distribution.distribution,
        },
      });

      console.log("📊 [Cron] Weekly review analytics report generated");
    } catch (error) {
      console.error("[Cron] Weekly analytics report failed:", error.message);
    }
  });
};

// 4. Every month (1st, 1:30 AM) — top-rated products leaderboard
const monthlyLeaderboardJob = () => {
  cron.schedule("30 1 1 * *", async () => {
    try {
      const highestRated = await reviewAnalyticsService.getHighestRatedProducts(20);
      const monthLabel = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

      await ReviewReport.create({
        type: "monthly_leaderboard",
        periodLabel: monthLabel,
        data: { leaderboard: highestRated.highestRatedProducts },
      });

      console.log("🏆 [Cron] Monthly top-rated leaderboard generated");
    } catch (error) {
      console.error("[Cron] Monthly leaderboard job failed:", error.message);
    }
  });
};

// 5. Every night (2 AM) — configurable-rule spam detection. Flags
//    reviews as suspicious for admin review without deleting anything
//    automatically (moderation stays a human decision).
const spamDetectionJob = () => {
  cron.schedule("0 2 * * *", async () => {
    try {
      const candidates = await Review.find({ isFlaggedSpam: false, status: "approved" }).select(
        "description title"
      );

      let flaggedCount = 0;
      for (const review of candidates) {
        const tooShort = review.description.length < SPAM_MIN_DESCRIPTION_LENGTH;
        const repeatedChars = SPAM_REPEATED_CHAR_PATTERN.test(review.description);
        const allCaps = review.title === review.title.toUpperCase() && review.title.length > 5;

        if (tooShort || repeatedChars || allCaps) {
          review.isFlaggedSpam = true;
          await review.save();
          flaggedCount += 1;
        }
      }

      if (flaggedCount > 0) {
        emitToAdmins(SOCKET_EVENTS.NEW_NOTIFICATION, { type: "spam_detected", count: flaggedCount });
        await Notification.create({
          type: "spam_detected",
          title: "Nightly Spam Scan",
          message: `${flaggedCount} review(s) were auto-flagged as likely spam and need review.`,
        });
      }

      console.log(`🕵️  [Cron] Spam detection complete — flagged ${flaggedCount} review(s)`);
    } catch (error) {
      console.error("[Cron] Spam detection job failed:", error.message);
    }
  });
};

// 6. Every night (2:30 AM) — recalculate + fix product average ratings
//    (guards against drift from any manual DB edits or edge cases).
const recalculateRatingsJob = () => {
  cron.schedule("30 2 * * *", async () => {
    try {
      const rows = await Review.aggregate([
        { $match: { status: "approved" } },
        { $group: { _id: "$product", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
      ]);

      let updatedCount = 0;
      for (const row of rows) {
        await Product.findByIdAndUpdate(row._id, {
          averageRating: Number(row.avgRating.toFixed(1)),
          reviewCount: row.reviewCount,
        });
        updatedCount += 1;
      }

      console.log(`🔁 [Cron] Recalculated ratings for ${updatedCount} product(s)`);
    } catch (error) {
      console.error("[Cron] Rating recalculation job failed:", error.message);
    }
  });
};

// 7. Every month (1st, 3 AM) — archive old review activity logs
//    (older than 180 days) to keep the collection lean.
const archiveReviewLogsJob = () => {
  cron.schedule("0 3 1 * *", async () => {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);

      const result = await ReviewActivityLog.deleteMany({ createdAt: { $lte: sixMonthsAgo } });
      console.log(`🗄️  [Cron] Archived ${result.deletedCount} old review activity log(s)`);
    } catch (error) {
      console.error("[Cron] Archive review logs job failed:", error.message);
    }
  });
};

// 8. Every week (Sunday, 10 AM) — notify sellers about products with
//    zero reviews so they can encourage buyers to leave feedback.
const noReviewsSellerNudgeJob = () => {
  cron.schedule("0 10 * * 0", async () => {
    try {
      const products = await reviewAnalyticsService.getProductsWithoutReviews(200);
      const bySeller = new Map();

      products.productsWithoutReviews.forEach((p) => {
        const sellerId = String(p.seller);
        if (!bySeller.has(sellerId)) bySeller.set(sellerId, []);
        bySeller.get(sellerId).push(p.title);
      });

      for (const [sellerId, titles] of bySeller.entries()) {
        emitToUser(sellerId, SOCKET_EVENTS.NEW_NOTIFICATION, {
          type: "no_reviews_nudge",
          title: "Some of your products have no reviews yet",
          count: titles.length,
        });
      }

      console.log(`📣 [Cron] No-review nudges sent to ${bySeller.size} seller(s)`);
    } catch (error) {
      console.error("[Cron] No-reviews seller nudge job failed:", error.message);
    }
  });
};

export const registerReviewCronJobs = () => {
  reviewReminderJob();
  reviewEmailReminderJob();
  weeklyAnalyticsReportJob();
  monthlyLeaderboardJob();
  spamDetectionJob();
  recalculateRatingsJob();
  archiveReviewLogsJob();
  noReviewsSellerNudgeJob();
  console.log("⏱️  All review module cron jobs registered");
};

export default registerReviewCronJobs;
