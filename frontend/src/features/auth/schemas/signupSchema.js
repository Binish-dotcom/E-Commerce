import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters"),

    lastName: z
      .string()
      .trim()
      .min(3, "Last name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .email("Enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required"),

    phone: z
      .string()
      .trim()
      .regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),

    role: z.enum(["buyer", "seller"], {
      message: "Select role",
    }),

    storeName: z.string().trim().optional().or(z.literal("")),

    address: z
      .string()
      .trim()
      .min(5, "Address is required"),

    city: z
      .string()
      .trim()
      .min(2, "City is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine(
    (data) => data.role !== "seller" || Boolean(data.storeName?.trim()),
    {
      path: ["storeName"],
      message: "Shop / Business Name is required for sellers",
    }
  );
