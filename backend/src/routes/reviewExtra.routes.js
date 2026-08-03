import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { reportReviewSchema, sellerReplySchema } from "../schemas/review.schema.js";
import { reviewRateLimiter, reviewActionRateLimiter } from "../middleware/rateLimiter.middleware.js";

import {
  reportReview,
  sellerReply,
  getMyReviews,
  getSellerReviews,
  adminDeleteReview,
} from "../controllers/reviewExtra.controller.js";

import {
  getAllReviews,
  getReportedReviews,
  approveReview,
  rejectReview,
  togglePinReview,
  suspendBuyer,
  getReviewActivityLogs,
} from "../controllers/reviewModeration.controller.js";

import {
  getReviewOverview,
  getMostReviewedProducts,
  getHighestRatedProducts,
  getLowestRatedProducts,
  getMostActiveBuyers,
  getProductsWithoutReviews,
  getMonthlyTrends,
  getReviewDistribution,
} from "../controllers/reviewAnalytics.controller.js";

const router = express.Router();

router.use(reviewRateLimiter);

// ===== Buyer: My Reviews =====
router.get("/mine", authMiddleware, getMyReviews);

// ===== Anyone logged in: Report Review =====
router.post("/:id/report", authMiddleware, reviewActionRateLimiter, validate(reportReviewSchema), reportReview);

// ===== Seller: reply + review inbox =====
router.post("/:id/reply", authMiddleware, reviewActionRateLimiter, validate(sellerReplySchema), sellerReply);
router.get("/seller/mine", authMiddleware, getSellerReviews);

// ===== Admin: moderation =====
router.get("/admin/all", authMiddleware, adminMiddleware, getAllReviews);
router.get("/admin/reported", authMiddleware, adminMiddleware, getReportedReviews);
router.patch("/admin/:id/approve", authMiddleware, adminMiddleware, reviewActionRateLimiter, approveReview);
router.patch("/admin/:id/reject", authMiddleware, adminMiddleware, reviewActionRateLimiter, rejectReview);
router.patch("/admin/:id/pin", authMiddleware, adminMiddleware, reviewActionRateLimiter, togglePinReview);
router.delete("/admin/:id", authMiddleware, adminMiddleware, reviewActionRateLimiter, adminDeleteReview);
router.patch("/admin/buyers/:buyerId/suspend", authMiddleware, adminMiddleware, reviewActionRateLimiter, suspendBuyer);
router.get("/admin/activity-logs", authMiddleware, adminMiddleware, getReviewActivityLogs);

// ===== Admin: review analytics =====
router.get("/admin/analytics/overview", authMiddleware, adminMiddleware, getReviewOverview);
router.get("/admin/analytics/most-reviewed", authMiddleware, adminMiddleware, getMostReviewedProducts);
router.get("/admin/analytics/highest-rated", authMiddleware, adminMiddleware, getHighestRatedProducts);
router.get("/admin/analytics/lowest-rated", authMiddleware, adminMiddleware, getLowestRatedProducts);
router.get("/admin/analytics/active-buyers", authMiddleware, adminMiddleware, getMostActiveBuyers);
router.get("/admin/analytics/no-reviews", authMiddleware, adminMiddleware, getProductsWithoutReviews);
router.get("/admin/analytics/monthly-trends", authMiddleware, adminMiddleware, getMonthlyTrends);
router.get("/admin/analytics/distribution", authMiddleware, adminMiddleware, getReviewDistribution);

export default router;
