import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  toggleLikeReview,
  getProductReviews,
  getRatingSummary,
  canReview,
} from "../controllers/review.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createReviewSchema, updateReviewSchema } from "../schemas/review.schema.js";

const router = express.Router();

// ---- Public: anyone can read a product's reviews and rating summary ----
router.get("/product/:productId", getProductReviews);
router.get("/product/:productId/summary", getRatingSummary);

// ---- Protected: requires login ----
router.get("/product/:productId/can-review", authMiddleware, canReview);
router.post("/", authMiddleware, validate(createReviewSchema), createReview);
router.put("/:id", authMiddleware, validate(updateReviewSchema), updateReview);
router.delete("/:id", authMiddleware, deleteReview);
router.post("/:id/like", authMiddleware, toggleLikeReview);

export default router;
