import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Product title must be at least 2 characters")
    .max(80, "Title is too long"),
  description: z
    .string()
    .max(500, "Keep description under 500 characters")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  discountPrice: z
    .union([z.coerce.number().positive(), z.literal("")])
    .optional(),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
  imageUrl: z
    .string()
    .url("Enter a valid image URL")
    .optional()
    .or(z.literal("")),
});