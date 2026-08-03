import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { resolveDateRange } from "../utils/dateRange.js";

// Paginated, sortable, filterable table data for the Admin Dashboard —
// Recent Buyers, Recent Sellers, and full Orders management table.
class AdminTablesService {
  // =========================
  // Recent Buyers — Orders count, Spent, Last Login, Status
  // =========================
  async getBuyersTable({ page = 1, limit = 10, sort = "-createdAt" } = {}) {
    const skip = (page - 1) * limit;

    const [buyers, total] = await Promise.all([
      User.find({ role: "buyer" })
        .select("firstName lastName email accountStatus lastLogin createdAt")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      User.countDocuments({ role: "buyer" }),
    ]);

    const buyerIds = buyers.map((b) => b._id);
    const spendAgg = await Order.aggregate([
      { $match: { buyer: { $in: buyerIds }, status: "delivered" } },
      { $group: { _id: "$buyer", spent: { $sum: "$totalAmount" }, orders: { $sum: 1 } } },
    ]);
    const spendMap = new Map(spendAgg.map((s) => [String(s._id), s]));

    const rows = buyers.map((b) => {
      const stats = spendMap.get(String(b._id));
      return {
        _id: b._id,
        name: `${b.firstName} ${b.lastName}`,
        email: b.email,
        orders: stats?.orders || 0,
        spent: stats?.spent || 0,
        lastLogin: b.lastLogin,
        status: b.accountStatus,
      };
    });

    return {
      success: true,
      buyers: rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  // =========================
  // Recent Sellers — Store Name, Status, Total Products, Revenue
  // =========================
  async getSellersTable({ page = 1, limit = 10, sort = "-createdAt", status } = {}) {
    const skip = (page - 1) * limit;
    const filter = { role: "seller" };
    if (status) filter.sellerStatus = status;

    const [sellers, total] = await Promise.all([
      User.find(filter)
        .select("firstName lastName email storeProfile sellerStatus accountStatus createdAt")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    const sellerIds = sellers.map((s) => s._id);
    const [revenueAgg, productCounts] = await Promise.all([
      Order.aggregate([
        { $match: { seller: { $in: sellerIds }, status: "delivered" } },
        { $group: { _id: "$seller", revenue: { $sum: "$totalAmount" } } },
      ]),
      Product.aggregate([
        { $match: { seller: { $in: sellerIds } } },
        { $group: { _id: "$seller", count: { $sum: 1 } } },
      ]),
    ]);
    const revenueMap = new Map(revenueAgg.map((r) => [String(r._id), r.revenue]));
    const productMap = new Map(productCounts.map((p) => [String(p._id), p.count]));

    const rows = sellers.map((s) => ({
      _id: s._id,
      sellerName: `${s.firstName} ${s.lastName}`,
      storeName: s.storeProfile?.storeName || "—",
      sellerStatus: s.sellerStatus,
      accountStatus: s.accountStatus,
      totalProducts: productMap.get(String(s._id)) || 0,
      revenue: revenueMap.get(String(s._id)) || 0,
    }));

    return {
      success: true,
      sellers: rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  // =========================
  // Orders table — full pagination/sort/filter/search for order management
  // =========================
  async getOrdersTable({ page = 1, limit = 10, sort = "-createdAt", status, paymentStatus, range, q } = {}) {
    const skip = (page - 1) * limit;
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (range) {
      const { start, end } = resolveDateRange({ range });
      filter.createdAt = { $gte: start, $lte: end };
    }
    if (q) {
      filter.$or = [{ productTitle: new RegExp(q, "i") }, { contactName: new RegExp(q, "i") }];
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("buyer", "firstName lastName email")
        .populate("seller", "firstName lastName storeProfile.storeName")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    return {
      success: true,
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }
}

export default new AdminTablesService();
