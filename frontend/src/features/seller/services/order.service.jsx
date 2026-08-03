import { getSellerOrdersAPI } from "../../../api/order.api";

class SellerOrderService {
  getSellerOrders() {
    return getSellerOrdersAPI();
  }
}

export default new SellerOrderService();
