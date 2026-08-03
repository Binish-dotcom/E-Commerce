import { z } from "zod";

export const otpSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email"),

  otp: z
    .string()
    .length(6, "OTP must be 6 characters")
    .regex(/^[a-zA-Z0-9]{6}$/, "OTP must contain only letters and numbers"),
});