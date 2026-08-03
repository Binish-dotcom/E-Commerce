import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Report from "../models/report.model.js";
import Notification from "../models/notification.model.js";
import { ApiError, NotFoundError, BadRequestError } from "../utils/ApiError.js";
import { emitToAdmins } from "../sockets/index.js";
import { SOCKET_EVENTS } from "../utils/constants.js";
import analyticsService from "./analytics.service.js";
import adminStatsService from "./adminStats.service.js";

// All the "Quick Action" mutations available from the Admin Dashboard:
// Approve/Reject Seller, Suspend Seller, Approve/Delete/Deactivate
// Product, Generate Report, Send Announcement.
class AdminActionsService {
  // =========================
  // Approve Seller
  // =========================
  async approveSeller(sellerId) {
    const seller = await User.findOne({ _id: sellerId, role: "seller" });
    if (!seller) throw new NotFoundError("Seller not found");

    const oldData = { sellerStatus: seller.sellerStatus };
    seller.sellerStatus = "approved";
    await seller.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "seller_approved", sellerId });
    return { success: true, message: "Seller approved successfully", data: seller, oldData };
  }

  // =========================
  // Reject Seller
  // =========================
  async rejectSeller(sellerId) {
    const seller = await User.findOne({ _id: sellerId, role: "seller" });
    if (!seller) throw new NotFoundError("Seller not found");

    const oldData = { sellerStatus: seller.sellerStatus };
    seller.sellerStatus = "rejected";
    await seller.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "seller_rejected", sellerId });
    return { success: true, message: "Seller rejected", data: seller, oldData };
  }

  // =========================
  // Suspend / Reactivate Seller
  // =========================
  async setSellerAccountStatus(sellerId, status) {
    if (!["active", "suspended"].includes(status)) {
      throw new BadRequestError("Invalid account status");
    }

    const seller = await User.findOne({ _id: sellerId, role: "seller" });
    if (!seller) throw new NotFoundError("Seller not found");

    const oldData = { accountStatus: seller.accountStatus };
    seller.accountStatus = status;
    await seller.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "seller_status_changed", sellerId, status });
    return {
      success: true,
      message: status === "suspended" ? "Seller suspended" : "Seller reactivated",
      data: seller,
      oldData,
    };
  }

  // =========================
  // Approve Product
  // =========================
  async approveProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("Product not found");

    const oldData = { approvalStatus: product.approvalStatus };
    product.approvalStatus = "approved";
    product.isActive = true;
    await product.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "product_approved", productId });
    return { success: true, message: "Product approved successfully", data: product, oldData };
  }

  // =========================
  // Reject Product
  // =========================
  async rejectProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("Product not found");

    const oldData = { approvalStatus: product.approvalStatus };
    product.approvalStatus = "rejected";
    product.isActive = false;
    await product.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "product_rejected", productId });
    return { success: true, message: "Product rejected", data: product, oldData };
  }

  // =========================
  // Deactivate Product (soft — hide from marketplace, keep the record)
  // =========================
  async deactivateProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("Product not found");

    const oldData = { isActive: product.isActive };
    product.isActive = false;
    await product.save();

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "product_deactivated", productId });
    return { success: true, message: "Product deactivated", data: product, oldData };
  }

  // =========================
  // Delete Product (hard delete)
  // =========================
  async deleteProduct(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("Product not found");

    const oldData = product.toObject();
    await Product.findByIdAndDelete(productId);

    emitToAdmins(SOCKET_EVENTS.DASHBOARD_REFRESH, { reason: "product_deleted", productId });
    return { success: true, message: "Product deleted permanently", data: { _id: productId }, oldData };
  }

  // =========================
  // Generate Report (manual, on-demand)
  // =========================
  async generateReport(adminId, { periodLabel } = {}) {
    const [overview, extended, salesReport, revenue] = await Promise.all([
      analyticsService.getOverview(),
      adminStatsService.getExtendedOverview(),
      analyticsService.getSalesReport(),
      analyticsService.getRevenue(),
    ]);

    const data = {
      overview: overview.overview,
      extendedOverview: extended.extendedOverview,
      salesReport: salesReport.salesReport,
      revenue: revenue.revenue,
      generatedAt: new Date(),
    };

    const report = await Report.create({
      type: "manual",
      periodLabel: periodLabel || new Date().toISOString().slice(0, 10),
      data,
      generatedBy: adminId,
    });

    return { success: true, message: "Report generated successfully", data: report };
  }

  // =========================
  // Send Announcement (broadcast notification to all admins, live)
  // =========================
  async sendAnnouncement(adminId, { title, message, audience = "admins" }) {
    if (!title || !message) {
      throw new BadRequestError("Announcement title and message are required");
    }

    const notification = await Notification.create({
      type: "announcement",
      title,
      message,
      relatedId: adminId,
      relatedModel: "User",
    });

    emitToAdmins(SOCKET_EVENTS.NEW_NOTIFICATION, notification);

    return {
      success: true,
      message: `Announcement sent to ${audience}`,
      data: notification,
    };
  }
}

export default new AdminActionsService();
