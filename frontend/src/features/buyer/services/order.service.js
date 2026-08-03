import { buyNowAPI, checkoutCartAPI, getBuyerOrdersAPI } from "../../../api/order.api";

class BuyerOrderService {
  buyNow(orderData) {
    return buyNowAPI(orderData);
  }

  checkoutCart(checkoutData) {
    return checkoutCartAPI(checkoutData);
  }

  getMyOrders() {
    return getBuyerOrdersAPI();
  }
}

export default new BuyerOrderService();
