import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Snapshots so the order still displays correctly even if the
    // product is later edited or deleted by the seller.
    productTitle: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    contactName: {
      type: String,
      required: true,
    },

    contactPhone: {
      type: String,
      required: true,
    },

    paymentType: {
      type: String,
      enum: ["cod", "card", "easypaisa", "jazzcash"],
      default: "cod",
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
      default: "pending",
    },

    // Admin dashboard needs payment status separate from order status
    // (e.g. a "delivered" COD order may still be "pending" payment).
    // Defaults to "pending" so existing orders keep working unchanged.
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
