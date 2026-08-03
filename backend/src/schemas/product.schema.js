import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().trim().min(2, "Product title must be at least 2 characters").max(80, "Title is too long"),
  description: z.string().trim().max(500, "Keep description under 500 characters").optional().or(z.literal("")),
  category: z.string().trim().min(1, "Please select a category"),
  price: z.coerce.number({ invalid_type_error: "Price must be a number" }).positive("Price must be greater than 0"),
  discountPrice: z
    .union([z.coerce.number().positive("Discount price must be greater than 0"), z.literal(""), z.null()])
    .optional(),
  stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }).int("Stock must be a whole number").min(0, "Stock cannot be negative"),
  imageUrl: z.string().trim().url("Enter a valid image URL").optional().or(z.literal("")),
});

// Same rules, but every field is optional since this is used for PUT/edit
export const updateProductSchema = createProductSchema.partial();