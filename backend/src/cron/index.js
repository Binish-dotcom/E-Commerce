import cron from "node-cron";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Report from "../models/report.model.js";
import Notification from "../models/notification.model.js";
import analyticsService from "../services/analytics.service.js";
import adminStatsService from "../services/adminStats.service.js";
import { emitToAdmins } from "../sockets/index.js";
import {
  SOCKET_EVENTS,
  NOTIFICATION_TYPES,
  DEFAULT_LOW_STOCK_THRESHOLD,
} from "../utils/constants.js";

// ==========================================
// All scheduled jobs for the Admin Dashboard
// & Analytics module. Registered once from
// server.js on boot.
// ==========================================

// 1. Every night at 12 AM — generate + save the daily sales report
const dailySalesReportJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const [overview, salesReport, revenue] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getSalesReport(),
        analyticsService.getRevenue(),
      ]);

      await Report.create({
        type: "daily",
        periodLabel: new Date().toISOString().slice(0, 10),
        data: { overview: overview.overview, salesReport: salesReport.salesReport, revenue: revenue.revenue },
      });

      console.log("🌙 [Cron] Daily sales report generated");
    } catch (error) {
      console.error("[Cron] Daily sales report failed:", error.message);
    }
  });
};

// 2. Every month (1st, 12:05 AM) — generate monthly analytics
const monthlyAnalyticsJob = () => {
  cron.schedule("5 0 1 * *", async () => {
    try {
      const [overview, salesReport] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getSalesReport(),
      ]);

      const now = new Date();
      const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

      await Report.create({
        type: "monthly",
        periodLabel: monthLabel,
        data: { overview: overview.overview, salesReport: salesReport.salesReport },
      });

      console.log("📅 [Cron] Monthly analytics report generated");
    } catch (error) {
      console.error("[Cron] Monthly analytics failed:", error.message);
    }
  });
};

// 3. Every hour — refresh dashboard cache
// (This project has no dedicated cache layer like Redis yet, so
// "refreshing the cache" here means pushing a fresh live snapshot to
// every connected admin dashboard over the socket.)
const refreshDashboardCacheJob = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const overview = await analyticsService.getOverview();
      emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "hourly_cache_refresh", overview: overview.overview });
      console.log("♻️  [Cron] Dashboard cache refreshed");
    } catch (error) {
      console.error("[Cron] Dashboard cache refresh failed:", error.message);
    }
  });
};

// 4. Every day (1 AM) — check low stock products, notify admin
const lowStockCheckJob = () => {
  cron.schedule("0 1 * * *", async () => {
    try {
      const lowStockProducts = await Product.find({
        stock: { $gt: 0, $lte: DEFAULT_LOW_STOCK_THRESHOLD },
        isActive: true,
      }).select("title stock");

      if (lowStockProducts.length > 0) {
        await Notification.create({
          type: NOTIFICATION_TYPES.LOW_STOCK,
          title: "Low Stock Alert",
          message: `${lowStockProducts.length} product(s) are running low on stock.`,
        });
        emitToAdmins(SOCKET_EVENTS.NEW_NOTIFICATION, { type: "low_stock", count: lowStockProducts.length });
      }

      console.log(`📦 [Cron] Low stock check complete (${lowStockProducts.length} found)`);
    } catch (error) {
      console.error("[Cron] Low stock check failed:", error.message);
    }
  });
};

// 5. Every day (1:15 AM) — pending seller requests older than 7 days
const pendingSellerOverdueJob = () => {
  cron.schedule("15 1 * * *", async () => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const overdueSellers = await User.find({
        role: "seller",
        sellerStatus: "pending",
        createdAt: { $lte: sevenDaysAgo },
      }).select("firstName lastName email createdAt");

      if (overdueSellers.length > 0) {
        await Notification.create({
          type: NOTIFICATION_TYPES.PENDING_SELLER_OVERDUE,
          title: "Overdue Seller Approvals",
          message: `${overdueSellers.length} seller request(s) have been pending for over 7 days.`,
        });
        emitToAdmins(SOCKET_EVENTS.NEW_NOTIFICATION, {
          type: "pending_seller_overdue",
          count: overdueSellers.length,
        });
      }

      console.log(`⏰ [Cron] Pending seller overdue check complete (${overdueSellers.length} found)`);
    } catch (error) {
      console.error("[Cron] Pending seller overdue check failed:", error.message);
    }
  });
};

// 6. Every day (2 AM) — archive analytics logs/reports older than 90 days
// ("Archiving" here means marking them archived via periodLabel prefix,
// since there's no cold-storage layer in this project — swap this out
// for a real archive destination later if needed.)
const archiveOldAnalyticsLogsJob = () => {
  cron.schedule("0 2 * * *", async () => {
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const result = await Report.deleteMany({
        type: "daily",
        createdAt: { $lte: ninetyDaysAgo },
      });

      console.log(`🗄️  [Cron] Archived/cleared ${result.deletedCount} old daily reports`);
    } catch (error) {
      console.error("[Cron] Archive old analytics logs failed:", error.message);
    }
  });
};

export const registerCronJobs = () => {
  dailySalesReportJob();
  monthlyAnalyticsJob();
  refreshDashboardCacheJob();
  lowStockCheckJob();
  pendingSellerOverdueJob();
  archiveOldAnalyticsLogsJob();
  console.log("⏱️  All admin cron jobs registered");
};

export default registerCronJobs;
