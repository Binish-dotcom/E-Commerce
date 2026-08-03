import { z } from "zod";

export const storeSchema = z.object({
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(60, "Store name is too long"),
  storeDescription: z
    .string()
    .max(300, "Keep description under 300 characters")
    .optional()
    .or(z.literal("")),
  storeCategory: z.string().min(1, "Please select a category"),
  businessType: z.enum(["individual", "partnership", "company"], {
    errorMap: () => ({ message: "Please select a business type" }),
  }),
  storeAddress: z.string().min(5, "Please enter a valid store address"),
  storeCity: z.string().min(2, "Please enter a valid city"),
  ntnNumber: z.string().optional().or(z.literal("")),
});