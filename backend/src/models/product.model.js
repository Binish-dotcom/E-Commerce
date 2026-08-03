import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Configurable per-product low-stock threshold. Defaults to 5 to
    // match the platform-wide default used across the admin dashboard.
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },

    // Denormalized rating cache, kept in sync by the review module's
    // nightly recalculation cron job (and updated live whenever a
    // review is approved/deleted where practical). The source of truth
    // for on-demand rating queries remains the Review aggregation in
    // review.service.js — these two fields exist purely so product
    // list/search views can sort/display ratings without an extra
    // aggregation per product.
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Admin moderation. Existing products default to "approved" so the
    // current create/list flow keeps working exactly as before.
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;