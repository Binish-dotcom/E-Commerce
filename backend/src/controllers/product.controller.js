import productService from "../services/product.service.js";

// ==========================
// Create Product
// ==========================
export const createProduct = async (req, res, next) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Only sellers can add products",
      });
    }

    const result = await productService.createProduct(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get a single product by ID (product detail page)
// ==========================
export const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get all products from every seller (buyer browsing, paginated)
// ==========================
export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await productService.getAllProducts({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Get logged-in seller's products
// ==========================
export const getMyProducts = async (req, res, next) => {
  try {
    const result = await productService.getMyProducts(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update Product
// ==========================
export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(
      req.user.id,
      req.params.id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete Product
// ==========================
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(
      req.user.id,
      req.params.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};