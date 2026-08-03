const BASE_URL = "http://localhost:5000/api/upload";

export const uploadImageAPI = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/image`, {
    method: "POST",
    headers: {
      // NOTE: Do NOT set Content-Type manually here.
      // The browser sets it automatically (with the correct boundary)
      // when the body is a FormData object.
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload image");
  }

  return data;
};