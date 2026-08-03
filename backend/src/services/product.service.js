// import Product from "../models/product.model.js";

// const createError = (message, statusCode) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   return error;
// };

// class ProductService {
//   // =========================
//   // Create a new product (seller only)
//   // =========================
//   async createProduct(sellerId, productData) {
//     const {
//       title,
//       description,
//       category,
//       price,
//       discountPrice,
//       stock,
//       imageUrl,
//     } = productData;

//     if (!title || !category || price === undefined || stock === undefined) {
//       throw createError("Please fill in all required product details", 400);
//     }

//     const product = await Product.create({
//       seller: sellerId,
//       title,
//       description: description || "",
//       category,
//       price,
//       discountPrice: discountPrice || null,
//       stock,
//       imageUrl: imageUrl || "",
//     });

//     return {
//       success: true,
//       message: "Product added successfully",
//       product,
//     };
//   }

//   // =========================
//   // Get a single product by ID (buyer-facing product detail page)
//   // =========================
//   async getProductById(productId) {
//     const product = await Product.findById(productId).populate(
//       "seller",
//       "storeProfile.storeName"
//     );

//     if (!product) {
//       throw createError("Product not found", 404);
//     }

//     return { success: true, product };
//   }

//   // =========================
//   // Get all products from all sellers (buyer-facing, paginated)
//   // =========================
//   async getAllProducts({ page = 1, limit = 9 }) {
//     const pageNumber = Math.max(1, parseInt(page, 10) || 1);
//     const limitNumber = Math.max(1, parseInt(limit, 10) || 9);
//     const skip = (pageNumber - 1) * limitNumber;

//     const filter = { isActive: true };

//     const [products, totalProducts] = await Promise.all([
//       Product.find(filter)
//         .populate("seller", "storeProfile.storeName")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limitNumber),
//       Product.countDocuments(filter),
//     ]);

//     return {
//       success: true,
//       products,
//       pagination: {
//         currentPage: pageNumber,
//         totalPages: Math.max(1, Math.ceil(totalProducts / limitNumber)),
//         totalProducts,
//         limit: limitNumber,
//       },
//     };
//   }

//   // =========================
//   // Get all products belonging to a seller
//   // =========================
//   async getMyProducts(sellerId) {
//     const products = await Product.find({ seller: sellerId }).sort({
//       createdAt: -1,
//     });

//     return {
//       success: true,
//       products,
//     };
//   }

//   // =========================
//   // Update a product (only its own seller)
//   // =========================
//   async updateProduct(sellerId, productId, productData) {
//     const product = await Product.findOne({ _id: productId, seller: sellerId });

//     if (!product) {
//       throw createError("Product not found", 404);
//     }

//     const {
//       title,
//       description,
//       category,
//       price,
//       discountPrice,
//       stock,
//       imageUrl,
//       isActive,
//     } = productData;

//     if (title !== undefined) product.title = title;
//     if (description !== undefined) product.description = description;
//     if (category !== undefined) product.category = category;
//     if (price !== undefined) product.price = price;
//     if (discountPrice !== undefined) product.discountPrice = discountPrice;
//     if (stock !== undefined) product.stock = stock;
//     if (imageUrl !== undefined) product.imageUrl = imageUrl;
//     if (isActive !== undefined) product.isActive = isActive;

//     await product.save();

//     return {
//       success: true,
//       message: "Product updated successfully",
//       product,
//     };
//   }

//   // =========================
//   // Delete a product (only its own seller)
//   // =========================
//   async deleteProduct(sellerId, productId) {
//     const product = await Product.findOneAndDelete({
//       _id: productId,
//       seller: sellerId,
//     });

//     if (!product) {
//       throw createError("Product not found", 404);
//     }

//     return {
//       success: true,
//       message: "Product deleted successfully",
//     };
//   }
// }

// export default new ProductService();


import Product from "../models/product.model.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class ProductService {
  // =========================
  // Create a new product (seller only)
  // =========================
  async createProduct(sellerId, productData) {
    const {
      title,
      description,
      category,
      price,
      discountPrice,
      stock,
      imageUrl,
    } = productData;

    if (!title || !category || price === undefined || stock === undefined) {
      throw createError("Please fill in all required product details", 400);
    }

    const product = await Product.create({
      seller: sellerId,
      title,
      description: description || "",
      category,
      price,
      discountPrice: discountPrice || null,
      stock,
      imageUrl: imageUrl || "",
    });

    return {
      success: true,
      message: "Product added successfully",
      product,
    };
  }

  // =========================
  // Get a single product by ID (buyer-facing product detail page)
  // =========================
  async getProductById(productId) {
    const product = await Product.findById(productId).populate(
      "seller",
      "storeProfile.storeName"
    );

    if (!product) {
      throw createError("Product not found", 404);
    }

    return { success: true, product };
  }

  // =========================
  // Get all products from all sellers (buyer-facing, paginated)
  // =========================
  async getAllProducts({ page = 1, limit = 10 }) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = { isActive: true };

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate("seller", "storeProfile.storeName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Product.countDocuments(filter),
    ]);

    return {
      success: true,
      products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.max(1, Math.ceil(totalProducts / limitNumber)),
        totalProducts,
        limit: limitNumber,
      },
    };
  }

  // =========================
  // Get all products belonging to a seller
  // =========================
  async getMyProducts(sellerId) {
    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });

    return {
      success: true,
      products,
    };
  }

  // =========================
  // Update a product (only its own seller)
  // =========================
  async updateProduct(sellerId, productId, productData) {
    const product = await Product.findOne({ _id: productId, seller: sellerId });

    if (!product) {
      throw createError("Product not found", 404);
    }

    const {
      title,
      description,
      category,
      price,
      discountPrice,
      stock,
      imageUrl,
      isActive,
    } = productData;

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    return {
      success: true,
      message: "Product updated successfully",
      product,
    };
  }

  // =========================
  // Delete a product (only its own seller)
  // =========================
  async deleteProduct(sellerId, productId) {
    const product = await Product.findOneAndDelete({
      _id: productId,
      seller: sellerId,
    });

    if (!product) {
      throw createError("Product not found", 404);
    }

    return {
      success: true,
      message: "Product deleted successfully",
    };
  }
}

export default new ProductService();