import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: {
      type: String,
      enum: ["spam", "fake", "offensive", "irrelevant", "other"],
      required: true,
    },
    note: { type: String, trim: true, maxlength: 300 },
  },
  { timestamps: true }
);

const sellerReplySchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, maxlength: 500 },
    repliedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Denormalized from the product at creation time so reviews can be
    // queried/filtered directly by seller (seller's review inbox,
    // seller rating analytics) without populating through product.
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    pros: [{ type: String, trim: true, maxlength: 200 }],
    cons: [{ type: String, trim: true, maxlength: 200 }],

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // Optional short review videos (Cloudinary URLs), capped small on
    // the frontend/validation layer to keep storage costs sane.
    videos: [
      {
        type: String,
        trim: true,
      },
    ],

    // When true, the buyer's name is hidden on the public review card
    // (their identity is still stored — this only affects display).
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    // Every review created through this API is automatically a verified
    // purchase (we only allow reviewing products the buyer has actually
    // received an order for), but the flag is stored explicitly so it's
    // easy to display and query without re-deriving it every time.
    verifiedPurchase: {
      type: Boolean,
      default: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Admin moderation. Existing reviews default to "approved" so
    // nothing that was already visible disappears when this field
    // was introduced.
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    reports: [reportSchema],

    // Set automatically by the nightly spam-detection cron job —
    // surfaced to admins as a moderation flag, doesn't hide the review.
    isFlaggedSpam: {
      type: Boolean,
      default: false,
    },

    sellerReply: sellerReplySchema,
  },
  {
    timestamps: true,
  }
);

// One review per buyer per product
reviewSchema.index({ product: 1, buyer: 1 }, { unique: true });
reviewSchema.index({ seller: 1, status: 1 });
reviewSchema.index({ status: 1, isFlaggedSpam: 1 });
reviewSchema.index({ isPinned: -1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
