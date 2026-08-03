import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createProductSchema), createProduct);
router.get("/", authMiddleware, getAllProducts);
router.get("/get-products", authMiddleware, getMyProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, validate(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;