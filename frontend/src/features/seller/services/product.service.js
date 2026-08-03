import {
  createProductAPI,
  getMyProductsAPI,
  getProductByIdAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../../../api/product.api";

class ProductService {
  createProduct(productData) {
    return createProductAPI(productData);
  }

  getMyProducts() {
    return getMyProductsAPI();
  }

  getProductById(productId) {
    return getProductByIdAPI(productId);
  }

  updateProduct(productId, productData) {
    return updateProductAPI(productId, productData);
  }

  deleteProduct(productId) {
    return deleteProductAPI(productId);
  }
}

export default new ProductService();
