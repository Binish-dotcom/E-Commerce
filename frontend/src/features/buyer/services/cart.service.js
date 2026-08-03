import {
  getCartAPI,
  addToCartAPI,
  updateCartQuantityAPI,
  removeFromCartAPI,
  getWishlistAPI,
  toggleWishlistAPI,
} from "../../../api/user.api";

class CartService {
  getCart() {
    return getCartAPI();
  }

  addToCart(productId, quantity = 1) {
    return addToCartAPI(productId, quantity);
  }

  updateCartQuantity(productId, quantity) {
    return updateCartQuantityAPI(productId, quantity);
  }

  removeFromCart(productId) {
    return removeFromCartAPI(productId);
  }

  getWishlist() {
    return getWishlistAPI();
  }

  toggleWishlist(productId) {
    return toggleWishlistAPI(productId);
  }
}

export default new CartService();
