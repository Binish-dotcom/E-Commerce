

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import sendOTP from "../utils/sendOTP.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["seller", "buyer", "admin"],
      required: true,
    },

    // Pending seller requests (admin approval workflow).
    // Existing sellers default to "approved" so current behaviour never breaks.
    sellerStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },

    // Admin can suspend a seller (blocks selling) independently of the
    // approval workflow above. Defaults to "active" so nothing existing
    // is ever suspended by accident.
    accountStatus: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },

    // Set on every successful login. Powers the "Last Login" column on
    // the admin Recent Buyers table. Optional/nullable — never required.
    lastLogin: {
      type: Date,
      default: null,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Seller Store Profile
    // Only relevant when role === "seller"
    // ===============================
    storeProfile: {
      storeName: { type: String, trim: true, default: "" },
      storeDescription: { type: String, trim: true, default: "" },
      storeCategory: { type: String, trim: true, default: "" },
      businessType: {
        type: String,
        enum: ["individual", "partnership", "company", ""],
        default: "",
      },
      storeAddress: { type: String, trim: true, default: "" },
      storeCity: { type: String, trim: true, default: "" },
      ntnNumber: { type: String, trim: true, default: "" },
      storeLogo: { type: String, trim: true, default: "" },
    },

    isStoreSetup: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // Buyer: Cart & Wishlist
    // ===============================
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],

    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
  },
  {
    timestamps: true,
  }
);

// ===============================
// PRE HOOK
// Hash Password Before Saving
// ===============================

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// ===============================
// POST HOOK
// Send OTP Email
// ===============================

userSchema.post("save", async function (doc) {
  try {
    if (!doc.isVerified && doc.otp) {
      // Always print the OTP to the terminal during development so testing
      // never has to wait on real email delivery.
      console.log(`🔑 OTP for ${doc.email}: ${doc.otp}`);
      console.log(`Sending OTP email to ${doc.email}...`);
      try {
        await sendOTP(doc.email, doc.otp);
        console.log("OTP email sent successfully");
      } catch (emailError) {
        console.error("Failed to send OTP email via SMTP:", emailError.message);
      }
    }
  } catch (error) {
    throw error;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
