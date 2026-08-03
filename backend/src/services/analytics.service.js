import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// Platform keeps a flat 10% commission on every delivered order.
// Kept as a single constant so it's easy to change from one place.
const COMMISSION_RATE = 0.1;

class AnalyticsService {
  // =========================
  // Dashboard Overview — every headline stat in one call
  // =========================
  async getOverview() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalBuyers,
      totalSellers,
      totalProducts,
      pendingProducts,
      pendingSellers,
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      dailyOrders,
      revenueAgg,
      monthlySalesAgg,
    ] = await Promise.all([
      User.countDocuments({ role: { $in: ["buyer", "seller"] } }),
      User.countDocuments({ role: "buyer" }),
      User.countDocuments({ role: "seller" }),
      Product.countDocuments(),
      Product.countDocuments({ approvalStatus: "pending" }),
      User.countDocuments({ role: "seller", sellerStatus: "pending" }),
      Order.countDocuments(),
      Order.countDocuments({ status: "delivered" }),
      Order.countDocuments({ status: "cancelled" }),
      Order.countDocuments({ createdAt: { $gte: startOfToday } }),
      Order.aggregate([
        { $match: { status: "delivered" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([
        { $match: { status: "delivered", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;
    const monthlySales = monthlySalesAgg[0]?.total || 0;

    return {
      success: true,
      overview: {
        totalUsers,
        totalBuyers,
        totalSellers,
        totalProducts,
        pendingProducts,
        pendingSellerRequests: pendingSellers,
        totalOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        platformCommission: Math.round(totalRevenue * COMMISSION_RATE),
        monthlySales,
        dailyOrders,
      },
    };
  }

  // =========================
  // Monthly Sales — Line Chart (last 6 months)
  // =========================
  async getSalesReport() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const rows = await Order.aggregate([
      { $match: { status: "delivered", createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          sales: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Fill in every one of the last 6 months, even ones with zero sales,
    // so the line chart never has gaps.
    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);

      const match = rows.find(
        (r) => r._id.year === d.getFullYear() && r._id.month === d.getMonth() + 1
      );

      result.push({
        month: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        sales: match?.sales || 0,
        orders: match?.orders || 0,
      });
    }

    return { success: true, salesReport: result };
  }

  // =========================
  // Revenue — total + growth (Area Chart) + orders-by-status (Pie Chart)
  // =========================
  async getRevenue() {
    const [totalAgg, byStatus, salesReport] = await Promise.all([
      Order.aggregate([
        { $match: { status: "delivered" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      this.getSalesReport(),
    ]);

    const totalRevenue = totalAgg[0]?.total || 0;

    // Revenue growth area-chart reuses the same monthly buckets as sales report
    const revenueGrowth = salesReport.salesReport.map((m) => ({
      month: m.month,
      revenue: Math.round(m.sales * (1 - 0.1)), // seller payout side
      commission: Math.round(m.sales * 0.1),      // platform side
    }));

    const ordersByStatus = byStatus.map((s) => ({
      status: s._id,
      count: s.count,
    }));

    return {
      success: true,
      revenue: {
        totalRevenue,
        platformCommission: Math.round(totalRevenue * COMMISSION_RATE),
        revenueGrowth,
        ordersByStatus,
      },
    };
  }

  // =========================
  // Recent Orders (latest 10)
  // =========================
  async getLatestOrders() {
    const orders = await Order.find()
      .populate("buyer", "firstName lastName email")
      .populate("seller", "firstName lastName storeProfile.storeName")
      .sort({ createdAt: -1 })
      .limit(10);

    return { success: true, orders };
  }

  // =========================
  // Top Sellers — by delivered revenue
  // =========================
  async getTopSellers() {
    const rows = await Order.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: "$seller",
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          _id: 0,
          sellerId: "$_id",
          revenue: 1,
          orders: 1,
          name: {
            $ifNull: [
              "$seller.storeProfile.storeName",
              { $concat: ["$seller.firstName", " ", "$seller.lastName"] },
            ],
          },
          email: "$seller.email",
        },
      },
    ]);

    return { success: true, topSellers: rows };
  }

  // =========================
  // Top Selling Products — by delivered quantity
  // =========================
  async getTopProducts() {
    const rows = await Order.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: "$product",
          unitsSold: { $sum: "$quantity" },
          revenue: { $sum: "$totalAmount" },
          title: { $first: "$productTitle" },
          image: { $first: "$productImage" },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 5 },
    ]);

    return { success: true, topProducts: rows };
  }

  // =========================
  // Pending Sellers (approval queue)
  // =========================
  async getPendingSellers() {
    const sellers = await User.find({ role: "seller", sellerStatus: "pending" })
      .select("-password -otp -otpExpiry")
      .sort({ createdAt: -1 });

    return { success: true, pendingSellers: sellers };
  }

  // =========================
  // Pending Products (approval queue)
  // =========================
  async getPendingProducts() {
    const products = await Product.find({ approvalStatus: "pending" })
      .populate("seller", "firstName lastName storeProfile.storeName")
      .sort({ createdAt: -1 });

    return { success: true, pendingProducts: products };
  }

  // =========================
  // Extra: Recent activity strip — latest users, latest sellers, low stock
  // =========================
  async getRecentActivity() {
    const [latestUsers, latestSellers, lowStockProducts] = await Promise.all([
      User.find({ role: "buyer" })
        .select("firstName lastName email createdAt")
        .sort({ createdAt: -1 })
        .limit(5),
      User.find({ role: "seller" })
        .select("firstName lastName email storeProfile.storeName sellerStatus createdAt")
        .sort({ createdAt: -1 })
        .limit(5),
      Product.find({ stock: { $lte: 5 }, isActive: true })
        .select("title stock price imageUrl seller")
        .populate("seller", "storeProfile.storeName")
        .sort({ stock: 1 })
        .limit(5),
    ]);

    return {
      success: true,
      recentActivity: { latestUsers, latestSellers, lowStockProducts },
    };
  }
}

export default new AnalyticsService();
