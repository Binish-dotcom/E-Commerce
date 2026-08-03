import express from "express";
import {
  buyNow,
  checkoutCart,
  getSellerOrders,
  getBuyerOrders,
} from "../controllers/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { buyNowSchema, checkoutSchema } from "../schemas/order.schema.js";

const router = express.Router();

router.post("/buy-now", authMiddleware, validate(buyNowSchema), buyNow);
router.post("/checkout", authMiddleware, validate(checkoutSchema), checkoutCart);
router.get("/seller-orders", authMiddleware, getSellerOrders);
router.get("/my-orders", authMiddleware, getBuyerOrders);

export default router;
