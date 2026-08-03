import express from "express";
import {
  getMe,
  updateProfile,
  setupStoreProfile,
  deleteAccount,
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getWishlist,
  toggleWishlist,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { profileSchema, storeProfileSchema, cartQuantitySchema, addToCartSchema } from "../schemas/user.schema.js";

const router = express.Router();

// Profile
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, validate(profileSchema), updateProfile);
router.post("/store-profile", authMiddleware, validate(storeProfileSchema), setupStoreProfile);
router.delete("/me", authMiddleware, deleteAccount);

// Cart
router.get("/cart", authMiddleware, getCart);
router.post("/cart/:productId", authMiddleware, validate(addToCartSchema), addToCart);
router.put("/cart/:productId", authMiddleware, validate(cartQuantitySchema), updateCartQuantity);
router.delete("/cart/:productId", authMiddleware, removeFromCart);

// Wishlist
router.get("/wishlist", authMiddleware, getWishlist);
router.post("/wishlist/:productId", authMiddleware, toggleWishlist);

export default router;
