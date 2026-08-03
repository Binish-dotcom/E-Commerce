import userService from "../services/user.service.js";

// ==========================
// Get logged-in user's profile
// ==========================
export const getMe = async (req, res, next) => {
  try {
    const result = await userService.getMe(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Update the logged-in user's personal profile. Email is intentionally not editable.
export const updateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.user.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Setup / Update Seller Store Profile
// ==========================
export const setupStoreProfile = async (req, res, next) => {
  try {
    const result = await userService.setupStoreProfile(req.user.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Delete Account (self)
// ==========================
export const deleteAccount = async (req, res, next) => {
  try {
    const result = await userService.deleteAccount(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// CART
// ==========================
export const getCart = async (req, res, next) => {
  try {
    const result = await userService.getCart(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const result = await userService.addToCart(req.user.id, req.params.productId, quantity || 1);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCartQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const result = await userService.updateCartQuantity(req.user.id, req.params.productId, quantity);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const result = await userService.removeFromCart(req.user.id, req.params.productId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// WISHLIST
// ==========================
export const getWishlist = async (req, res, next) => {
  try {
    const result = await userService.getWishlist(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const result = await userService.toggleWishlist(req.user.id, req.params.productId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
