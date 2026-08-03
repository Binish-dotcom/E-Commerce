import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.coerce
    .number({ invalid_type_error: "Please select a rating" })
    .int()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5 stars"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(1000, "Keep it under 1000 characters"),
  isAnonymous: z.boolean().optional(),
});
