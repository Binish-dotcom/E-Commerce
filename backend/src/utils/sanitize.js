// Lightweight XSS-safe sanitizer for user-generated review text.
// Strips HTML tags entirely (reviews are plain text, not rich text),
// then trims. Cheap and dependency-free — good enough for text-only
// fields; images/videos are validated separately by URL + mimetype.
export const stripHtml = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "").trim();
};

export const sanitizeArray = (arr) =>
  Array.isArray(arr) ? arr.map(stripHtml).filter(Boolean) : arr;

export default stripHtml;
