const BASE_URL = "http://localhost:5000/api/users";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getMeAPI = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }
  return data;
};

export const updateProfileAPI = async (profileData) => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }
  return data;
};

export const setupStoreProfileAPI = async (storeData) => {
  const response = await fetch(`${BASE_URL}/store-profile`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(storeData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to save store profile");
  }
  return data;
};

export const deleteAccountAPI = async () => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete account");
  }
  return data;
};

// ===== Cart =====

export const getCartAPI = async () => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch cart");
  return data;
};

export const addToCartAPI = async (productId, quantity = 1) => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add to cart");
  return data;
};

export const updateCartQuantityAPI = async (productId, quantity) => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update cart");
  return data;
};

export const removeFromCartAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to remove from cart");
  return data;
};

// ===== Wishlist =====

export const getWishlistAPI = async () => {
  const response = await fetch(`${BASE_URL}/wishlist`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch wishlist");
  return data;
};

export const toggleWishlistAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "POST",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update wishlist");
  return data;
};
