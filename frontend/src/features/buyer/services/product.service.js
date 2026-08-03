import { getAllProductsAPI, getProductByIdAPI } from "../../../api/product.api";

class BuyerProductService {
  getAllProducts(page, limit) {
    return getAllProductsAPI(page, limit);
  }

  getProductById(productId) {
    return getProductByIdAPI(productId);
  }
}

export default new BuyerProductService();