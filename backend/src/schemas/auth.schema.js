import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(3, "First name must be at least 3 characters"),
    lastName: z.string().trim().min(3, "Last name must be at least 3 characters"),
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z
      .string()
      .trim()
      .regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),
    role: z.enum(["buyer", "seller"], {
      errorMap: () => ({ message: "Role must be either buyer or seller" }),
    }),
    address: z.string().trim().min(5, "Address is required"),
    city: z.string().trim().min(2, "City is required"),
    storeName: z.string().trim().optional().or(z.literal("")),
  })
  .refine((data) => data.role !== "seller" || Boolean(data.storeName?.trim()), {
    path: ["storeName"],
    message: "Shop / Business name is required for sellers",
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  otp: z
    .string()
    .length(6, "OTP must be 6 characters")
    .regex(/^[a-zA-Z0-9]{6}$/, "OTP must contain only letters and numbers"),
});

export const resendOtpSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});