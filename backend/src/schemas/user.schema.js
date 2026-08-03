import { z } from "zod";

// Only the fields a user is allowed to change from their profile are listed
// here. Email and role deliberately do not appear in this schema.
export const profileSchema = z
  .object({
    firstName: z.string().trim().min(3, "First name must be at least 3 characters").max(50, "First name is too long"),
    lastName: z.string().trim().min(3, "Last name must be at least 3 characters").max(50, "Last name is too long"),
    phone: z.string().trim().regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),
    address: z.string().trim().min(5, "Address is required").max(200, "Address is too long"),
    city: z.string().trim().min(2, "City is required").max(60, "City is too long"),
  })
  .strict();

export const storeProfileSchema = z.object({
  storeName: z.string().trim().min(2, "Store name must be at least 2 characters").max(60, "Store name is too long"),
  storeDescription: z.string().trim().max(300, "Keep description under 300 characters").optional().or(z.literal("")),
  storeCategory: z.string().trim().min(1, "Please select a category"),
  businessType: z.enum(["individual", "partnership", "company"], {
    errorMap: () => ({ message: "Please select a business type" }),
  }),
  storeAddress: z.string().trim().min(5, "Please enter a valid store address"),
  storeCity: z.string().trim().min(2, "Please enter a valid city"),
  ntnNumber: z.string().trim().optional().or(z.literal("")),
});

export const cartQuantitySchema = z.object({
  quantity: z.coerce.number().int("Quantity must be a whole number").min(1, "Quantity must be at least 1"),
});

// Used on "add to cart" — quantity is optional here (defaults to 1 in the service)
export const addToCartSchema = z.object({
  quantity: z.coerce.number().int("Quantity must be a whole number").min(1, "Quantity must be at least 1").optional(),
});
