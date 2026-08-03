import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Reduces stock for a product, never going below 0
const reduceStock = async (product, quantity) => {
  product.stock = Math.max(0, product.stock - quantity);
  await product.save();
};

// Real-time admin dashboard update on every new order, plus a
// "large order" notification when it crosses the platform threshold.
// Wrapped so a socket/notification hiccup never blocks a purchase.
const notifyNewOrder = async (order) => {
  try {
    const { emitToAdmins } = await import("../sockets/index.js");
    const { SOCKET_EVENTS, NOTIFICATION_TYPES, LARGE_ORDER_THRESHOLD } = await import(
      "../utils/constants.js"
    );

    emitToAdmins(SOCKET_EVENTS.NEW_ORDER, {
      id: order._id,
      productTitle: order.productTitle,
      totalAmount: order.totalAmount,
      status: order.status,
    });

    if (order.totalAmount >= LARGE_ORDER_THRESHOLD) {
      const Notification = (await import("../models/notification.model.js")).default;
      await Notification.create({
        type: NOTIFICATION_TYPES.LARGE_ORDER,
        title: "Large Order Placed",
        message: `A large order of Rs. ${order.totalAmount} was placed for "${order.productTitle}".`,
        relatedId: order._id,
        relatedModel: "Order",
      });
    }
  } catch (error) {
    console.error("Order notify failed:", error.message);
  }
};

class OrderService {
  // =========================
  // Buy Now — single product, immediate order
  // =========================
  async buyNow(buyerId, data) {
    const { productId, quantity, shippingAddress, contactName, contactPhone, paymentType } = data;

    const product = await Product.findById(productId);
    if (!product) {
      throw createError("Product not found", 404);
    }

    if (product.stock < quantity) {
      throw createError(`Only ${product.stock} item(s) left in stock`, 400);
    }

    const unitPrice = product.discountPrice || product.price;
    const totalAmount = unitPrice * quantity;

    const order = await Order.create({
      buyer: buyerId,
      seller: product.seller,
      product: product._id,
      productTitle: product.title,
      productImage: product.imageUrl,
      quantity,
      unitPrice,
      totalAmount,
      shippingAddress,
      contactName,
      contactPhone,
      paymentType,
    });

    await reduceStock(product, quantity);
    await notifyNewOrder(order);

    return {
      success: true,
      message: "Order placed successfully",
      order,
    };
  }

  // =========================
  // Checkout — every item currently in the buyer's cart
  // Creates one Order document per cart item (each may belong to a
  // different seller), then empties the cart.
  // =========================
  async checkoutCart(buyerId, data) {
    const { shippingAddress, contactName, contactPhone, paymentType } = data;

    const user = await User.findById(buyerId).populate("cart.product");
    if (!user) {
      throw createError("User not found", 404);
    }

    const cartItems = user.cart.filter((item) => item.product);

    if (cartItems.length === 0) {
      throw createError("Your cart is empty", 400);
    }

    // Make sure every item still has enough stock before creating any orders
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw createError(
          `"${item.product.title}" only has ${item.product.stock} item(s) left in stock`,
          400
        );
      }
    }

    const orders = [];

    for (const item of cartItems) {
      const unitPrice = item.product.discountPrice || item.product.price;
      const totalAmount = unitPrice * item.quantity;

      const order = await Order.create({
        buyer: buyerId,
        seller: item.product.seller,
        product: item.product._id,
        productTitle: item.product.title,
        productImage: item.product.imageUrl,
        quantity: item.quantity,
        unitPrice,
        totalAmount,
        shippingAddress,
        contactName,
        contactPhone,
        paymentType,
      });

      orders.push(order);
      await reduceStock(item.product, item.quantity);
      await notifyNewOrder(order);
    }

    // Empty the cart now that every item has been turned into an order
    user.cart = [];
    await user.save();

    return {
      success: true,
      message: "Order placed successfully",
      orders,
    };
  }

  // =========================
  // Orders received by a seller (for their dashboard)
  // =========================
  async getSellerOrders(sellerId) {
    const orders = await Order.find({ seller: sellerId })
      .populate("buyer", "firstName lastName email phone")
      .sort({ createdAt: -1 });

    return { success: true, orders };
  }

  // =========================
  // Orders placed by a buyer (order history)
  // =========================
  async getBuyerOrders(buyerId) {
    const orders = await Order.find({ buyer: buyerId }).sort({ createdAt: -1 });

    return { success: true, orders };
  }
}

export default new OrderService();
