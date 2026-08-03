import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class UserService {
  // =========================
  // Get logged-in user's profile
  // =========================
  async getMe(userId) {
    const user = await User.findById(userId).select("-password -otp -otpExpiry");

    if (!user) {
      throw createError("User not found", 404);
    }

    return {
      success: true,
      user,
    };
  }

  // =========================
  // Update personal profile (email and role stay immutable)
  // =========================
  async updateProfile(userId, profileData) {
    const user = await User.findById(userId);

    if (!user) {
      throw createError("User not found", 404);
    }

    const { firstName, lastName, phone, address, city } = profileData;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.address = address;
    user.city = city;

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
      user: await User.findById(userId).select("-password -otp -otpExpiry"),
    };
  }

  // =========================
  // Setup / Update Seller Store Profile
  // =========================
  async setupStoreProfile(userId, storeData) {
    const {
      storeName,
      storeDescription,
      storeCategory,
      businessType,
      storeAddress,
      storeCity,
      ntnNumber,
    } = storeData;

    const user = await User.findById(userId);

    if (!user) {
      throw createError("User not found", 404);
    }

    if (user.role !== "seller") {
      throw createError("Only sellers can set up a store profile", 403);
    }

    if (!storeName || !storeCategory || !businessType || !storeAddress || !storeCity) {
      throw createError("Please fill in all required store details", 400);
    }

    user.storeProfile = {
      storeName,
      storeDescription: storeDescription || "",
      storeCategory,
      businessType,
      storeAddress,
      storeCity,
      ntnNumber: ntnNumber || "",
      storeLogo: user.storeProfile?.storeLogo || "",
    };
    user.isStoreSetup = true;

    await user.save();

    return {
      success: true,
      message: "Store profile saved successfully",
      user: await User.findById(userId).select("-password -otp -otpExpiry"),
    };
  }

  // =========================
  // Delete Account
  // If the user is a seller, cascade-delete all of their products too.
  // =========================
  async deleteAccount(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw createError("User not found", 404);
    }

    if (user.role === "seller") {
      await Product.deleteMany({ seller: userId });
    }

    await User.findByIdAndDelete(userId);

    return {
      success: true,
      message: "Account deleted successfully",
    };
  }

  // =========================
  // CART
  // =========================
  async getCart(userId) {
    const user = await User.findById(userId).populate("cart.product");

    if (!user) {
      throw createError("User not found", 404);
    }

    // Filter out cart entries whose product may have been deleted
    const cart = user.cart.filter((item) => item.product);

    return { success: true, cart };
  }

  async addToCart(userId, productId, quantity = 1) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError("Product not found", 404);
    }

    const user = await User.findById(userId);
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return this.getCart(userId);
  }

  async updateCartQuantity(userId, productId, quantity) {
    if (quantity < 1) {
      throw createError("Quantity must be at least 1", 400);
    }

    const user = await User.findById(userId);
    const item = user.cart.find((item) => item.product.toString() === productId);

    if (!item) {
      throw createError("Item not found in cart", 404);
    }

    item.quantity = quantity;
    await user.save();
    return this.getCart(userId);
  }

  async removeFromCart(userId, productId) {
    const user = await User.findById(userId);
    user.cart = user.cart.filter((item) => item.product.toString() !== productId);
    await user.save();
    return this.getCart(userId);
  }

  // =========================
  // WISHLIST
  // =========================
  async getWishlist(userId) {
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      throw createError("User not found", 404);
    }

    const wishlist = user.wishlist.filter(Boolean);

    return { success: true, wishlist };
  }

  async toggleWishlist(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError("Product not found", 404);
    }

    const user = await User.findById(userId);
    const isWishlisted = user.wishlist.some((id) => id.toString() === productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    const result = await this.getWishlist(userId);
    return { ...result, wishlisted: !isWishlisted };
  }
}

export default new UserService();
