import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  rating: z.coerce
    .number({ invalid_type_error: "Rating must be a number" })
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1 star")
    .max(5, "Rating cannot be more than 5 stars"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Keep description under 1000 characters"),
  pros: z.array(z.string().trim().max(200)).max(10, "Maximum 10 pros").optional(),
  cons: z.array(z.string().trim().max(200)).max(10, "Maximum 10 cons").optional(),
  images: z.array(z.string().url("Each image must be a valid URL")).max(5, "Maximum 5 images allowed").optional(),
  videos: z.array(z.string().url("Each video must be a valid URL")).max(2, "Maximum 2 videos allowed").optional(),
  isAnonymous: z.boolean().optional(),
});

// Same rules but every field optional (used for PATCH/edit), productId excluded
// since you can't move a review to a different product.
export const updateReviewSchema = createReviewSchema.omit({ productId: true }).partial();

export const reportReviewSchema = z.object({
  reason: z.enum(["spam", "fake", "offensive", "irrelevant", "other"], {
    errorMap: () => ({ message: "Please select a valid report reason" }),
  }),
  note: z.string().trim().max(300, "Keep the note under 300 characters").optional(),
});

export const sellerReplySchema = z.object({
  message: z.string().trim().min(2, "Reply is too short").max(500, "Keep the reply under 500 characters"),
});
