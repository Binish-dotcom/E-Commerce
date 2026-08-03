 import express from "express";
import {
  signup,
  verifyOTP,
  login,
  resendOTP,
} from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
} from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOTP);
router.post("/login", validate(loginSchema), login);
router.post("/resend-otp", validate(resendOtpSchema), resendOTP);

export default router;