import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().trim().min(3, "First name must be at least 3 characters"),
  lastName: z.string().trim().min(3, "Last name must be at least 3 characters"),
  phone: z.string().trim().regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),
  address: z.string().trim().min(5, "Address is required"),
  city: z.string().trim().min(2, "City is required"),
});
