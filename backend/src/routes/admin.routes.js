import express from "express";
import {
  getOverview,
  getSalesReport,
  getRevenue,
  getLatestOrders,
  getTopSellers,
  getTopProducts,
  getPendingSellers,
  getPendingProducts,
  getRecentActivity,
} from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Every route here requires: logged in (authMiddleware) AND role === "admin"
router.use(authMiddleware, adminMiddleware);

router.get("/analytics/overview", getOverview);
router.get("/analytics/sales-report", getSalesReport);
router.get("/analytics/revenue", getRevenue);
router.get("/analytics/latest-orders", getLatestOrders);
router.get("/analytics/top-sellers", getTopSellers);
router.get("/analytics/top-products", getTopProducts);
router.get("/analytics/pending-sellers", getPendingSellers);
router.get("/analytics/pending-products", getPendingProducts);
router.get("/analytics/recent-activity", getRecentActivity);

export default router;
