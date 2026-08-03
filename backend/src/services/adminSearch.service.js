import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// Global + entity-scoped search used by the Admin Dashboard search bar.
class AdminSearchService {
  async searchBuyers(q, limit = 10) {
    const regex = new RegExp(q, "i");
    return User.find({
      role: "buyer",
      $or: [{ firstName: regex }, { lastName: regex }, { email: regex }, { phone: regex }],
    })
      .select("-password -otp -otpExpiry")
      .limit(limit);
  }

  async searchSellers(q, limit = 10) {
    const regex = new RegExp(q, "i");
    return User.find({
      role: "seller",
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { "storeProfile.storeName": regex },
      ],
    })
      .select("-password -otp -otpExpiry")
      .limit(limit);
  }

  async searchProducts(q, limit = 10) {
    const regex = new RegExp(q, "i");
    return Product.find({ $or: [{ title: regex }, { category: regex }, { description: regex }] })
      .populate("seller", "firstName lastName storeProfile.storeName")
      .limit(limit);
  }

  async searchOrders(q, limit = 10) {
    const regex = new RegExp(q, "i");
    const orConditions = [{ productTitle: regex }, { contactName: regex }, { contactPhone: regex }];

    // Allow searching by raw Order ID too, if it looks like a valid ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(q)) {
      orConditions.push({ _id: q });
    }

    return Order.find({ $or: orConditions })
      .populate("buyer", "firstName lastName email")
      .populate("seller", "firstName lastName storeProfile.storeName")
      .limit(limit);
  }

  // =========================
  // Global Search — hits every entity at once, small slice from each
  // =========================
  async globalSearch(q) {
    if (!q || !q.trim()) {
      return { success: true, results: { buyers: [], sellers: [], products: [], orders: [] } };
    }

    const [buyers, sellers, products, orders] = await Promise.all([
      this.searchBuyers(q, 5),
      this.searchSellers(q, 5),
      this.searchProducts(q, 5),
      this.searchOrders(q, 5),
    ]);

    return { success: true, results: { buyers, sellers, products, orders } };
  }
}

export default new AdminSearchService();
