import orderService from "../services/order.service.js";

// ==========================
// Buy Now
// ==========================
export const buyNow = async (req, res, next) => {
  try {
    const result = await orderService.buyNow(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Checkout current cart
// ==========================
export const checkoutCart = async (req, res, next) => {
  try {
    const result = await orderService.checkoutCart(req.user.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Orders received by the logged-in seller
// ==========================
export const getSellerOrders = async (req, res, next) => {
  try {
    const result = await orderService.getSellerOrders(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Orders placed by the logged-in buyer
// ==========================
export const getBuyerOrders = async (req, res, next) => {
  try {
    const result = await orderService.getBuyerOrders(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
