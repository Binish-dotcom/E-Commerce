import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";
import { COMMISSION_RATE, DEFAULT_LOW_STOCK_THRESHOLD } from "../utils/constants.js";

// Extends the original analytics.service.js overview with every extra
// stat card requested by the Admin Dashboard spec (today's revenue,
// active sellers, order-status breakdown, stock levels, coupons...),
// without touching the existing, already-working analytics module.
class AdminStatsService {
  async getExtendedOverview() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      todaysRevenueAgg,
      activeSellers,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      cancelledOrders,
      returnedOrders,
      outOfStockProducts,
      lowStockProducts,
      totalCoupons,
      activeCoupons,
    ] = await Promise.all([
      Order.aggregate([
        { $match: { status: "delivered", createdAt: { $gte: startOfToday } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      User.countDocuments({ role: "seller", sellerStatus: "approved", accountStatus: "active" }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "processing" }),
      Order.countDocuments({ status: "delivered" }),
      Order.countDocuments({ status: "cancelled" }),
      Order.countDocuments({ status: "returned" }),
      Product.countDocuments({ stock: 0 }),
      Product.countDocuments({
        stock: { $gt: 0, $lte: DEFAULT_LOW_STOCK_THRESHOLD },
      }),
      Coupon.countDocuments(),
      Coupon.countDocuments({
        isActive: true,
        $or: [{ expiresAt: null }, { expiresAt: { $gte: new Date() } }],
      }),
    ]);

    const todaysRevenue = todaysRevenueAgg[0]?.total || 0;

    return {
      success: true,
      extendedOverview: {
        todaysRevenue,
        activeSellers,
        pendingOrders,
        processingOrders,
        deliveredOrders,
        cancelledOrders,
        returnedOrders,
        outOfStockProducts,
        lowStockProducts,
        totalCoupons,
        activeCoupons,
        commissionRate: COMMISSION_RATE,
      },
    };
  }

  // =========================
  // Product Category Distribution (Pie Chart)
  // =========================
  async getCategoryDistribution() {
    const rows = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return {
      success: true,
      categoryDistribution: rows.map((r) => ({ category: r._id || "Uncategorized", count: r.count })),
    };
  }

  // =========================
  // Top Selling Categories (by delivered revenue)
  // =========================
  async getTopCategories() {
    const rows = await Order.aggregate([
      { $match: { status: "delivered" } },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: { $ifNull: ["$productInfo.category", "Uncategorized"] },
          revenue: { $sum: "$totalAmount" },
          unitsSold: { $sum: "$quantity" },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, category: "$_id", revenue: 1, unitsSold: 1 } },
    ]);

    return { success: true, topCategories: rows };
  }

  // =========================
  // Daily Orders Chart (last 14 days)
  // =========================
  async getDailyOrders() {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const rows = await Order.aggregate([
      { $match: { createdAt: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: {
            y: { $year: "$createdAt" },
            m: { $month: "$createdAt" },
            d: { $dayOfMonth: "$createdAt" },
          },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
    ]);

    const result = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const match = rows.find(
        (r) => r._id.y === d.getFullYear() && r._id.m === d.getMonth() + 1 && r._id.d === d.getDate()
      );

      result.push({
        date: d.toISOString().slice(0, 10),
        orders: match?.orders || 0,
      });
    }

    return { success: true, dailyOrders: result };
  }
}

export default new AdminStatsService();
