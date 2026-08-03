import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { adminRateLimiter, adminActionRateLimiter } from "../middleware/rateLimiter.middleware.js";
import auditLog from "../middleware/auditLog.middleware.js";
import { ACTIVITY_ACTIONS } from "../utils/constants.js";

import {
  getExtendedOverview,
  getCategoryDistribution,
  getTopCategories,
  getDailyOrders,
} from "../controllers/adminStats.controller.js";

import {
  approveSeller,
  rejectSeller,
  suspendSeller,
  activateSeller,
  approveProduct,
  rejectProduct,
  deactivateProduct,
  deleteProduct,
  generateReport,
  sendAnnouncement,
} from "../controllers/adminActions.controller.js";

import {
  globalSearch,
  searchBuyers,
  searchSellers,
  searchProducts,
  searchOrders,
} from "../controllers/adminSearch.controller.js";

import {
  getBuyersTable,
  getSellersTable,
  getOrdersTable,
} from "../controllers/adminTables.controller.js";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notification.controller.js";

import { getActivityLogs } from "../controllers/activityLog.controller.js";

const router = express.Router();

// Every route here requires: logged in AND role === "admin",
// plus general rate limiting to protect the dashboard from abuse.
router.use(authMiddleware, adminMiddleware, adminRateLimiter);

// ===== Extended Analytics (stat cards + extra charts) =====
router.get("/stats/overview", getExtendedOverview);
router.get("/stats/category-distribution", getCategoryDistribution);
router.get("/stats/top-categories", getTopCategories);
router.get("/stats/daily-orders", getDailyOrders);

// ===== Tables (paginated / sortable / filterable) =====
router.get("/tables/buyers", getBuyersTable);
router.get("/tables/sellers", getSellersTable);
router.get("/tables/orders", getOrdersTable);

// ===== Global + Entity Search =====
router.get("/search", globalSearch);
router.get("/search/buyers", searchBuyers);
router.get("/search/sellers", searchSellers);
router.get("/search/products", searchProducts);
router.get("/search/orders", searchOrders);

// ===== Notifications =====
router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markNotificationRead);
router.patch("/notifications/read-all", markAllNotificationsRead);

// ===== Activity Log / Audit Trail =====
router.get("/activity-logs", getActivityLogs);

// ===== Quick Actions (sensitive writes — stricter limiter + audit trail) =====
router.patch(
  "/sellers/:id/approve",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.SELLER_APPROVED, (req) => ({ targetType: "User", targetId: req.params.id })),
  approveSeller
);
router.patch(
  "/sellers/:id/reject",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.SELLER_REJECTED, (req) => ({ targetType: "User", targetId: req.params.id })),
  rejectSeller
);
router.patch(
  "/sellers/:id/suspend",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.SELLER_SUSPENDED, (req) => ({ targetType: "User", targetId: req.params.id })),
  suspendSeller
);
router.patch(
  "/sellers/:id/activate",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.SELLER_ACTIVATED, (req) => ({ targetType: "User", targetId: req.params.id })),
  activateSeller
);

router.patch(
  "/products/:id/approve",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.PRODUCT_APPROVED, (req) => ({ targetType: "Product", targetId: req.params.id })),
  approveProduct
);
router.patch(
  "/products/:id/reject",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.PRODUCT_REJECTED, (req) => ({ targetType: "Product", targetId: req.params.id })),
  rejectProduct
);
router.patch(
  "/products/:id/deactivate",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.PRODUCT_DEACTIVATED, (req) => ({ targetType: "Product", targetId: req.params.id })),
  deactivateProduct
);
router.delete(
  "/products/:id",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.PRODUCT_DELETED, (req) => ({ targetType: "Product", targetId: req.params.id })),
  deleteProduct
);

router.post(
  "/reports/generate",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.REPORT_GENERATED),
  generateReport
);
router.post(
  "/announcements",
  adminActionRateLimiter,
  auditLog(ACTIVITY_ACTIONS.ANNOUNCEMENT_SENT),
  sendAnnouncement
);

export default router;
