
const BASE_URL = "http://localhost:5000/api/orders";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const buyNowAPI = async (orderData) => {
  const response = await fetch(`${BASE_URL}/buy-now`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to place order");
  return data;
};

export const checkoutCartAPI = async (checkoutData) => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(checkoutData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to checkout");
  return data;
};

export const getSellerOrdersAPI = async () => {
  const response = await fetch(`${BASE_URL}/seller-orders`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
  return data;
};

export const getBuyerOrdersAPI = async () => {
  const response = await fetch(`${BASE_URL}/my-orders`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
  return data;
};
