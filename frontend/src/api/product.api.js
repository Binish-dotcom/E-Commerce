// const BASE_URL = "http://localhost:5000/api/products";

// const authHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

// export const createProductAPI = async (productData) => {
//   const response = await fetch(BASE_URL, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify(productData),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to add product");
//   }
//   return data;
// };

// export const getAllProductsAPI = async (page = 1, limit = 9) => {
//   const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
//     method: "GET",
//     headers: authHeaders(),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to fetch products");
//   }
//   return data;
// };

// export const getMyProductsAPI = async () => {
//   const response = await fetch(`${BASE_URL}/get-products`, {
//     method: "GET",
//     headers: authHeaders(),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to fetch products");
//   }
//   return data;
// };

// export const deleteProductAPI = async (productId) => {
//   const response = await fetch(`${BASE_URL}/${productId}`, {
//     method: "DELETE",
//     headers: authHeaders(),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to delete product");
//   }
//   return data;
// };


const BASE_URL = "http://localhost:5000/api/products";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createProductAPI = async (productData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add product");
  }
  return data;
};

export const getAllProductsAPI = async (page = 1, limit = 9) => {
  const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }
  return data;
};

export const getMyProductsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-products`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }
  return data;
};

export const getProductByIdAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product");
  }
  return data;
};

export const updateProductAPI = async (productId, productData) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
};

export const deleteProductAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }
  return data;
};
