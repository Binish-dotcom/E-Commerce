

import authService from "../services/auth.service.js";
import User from "../models/user.model.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTP from "../utils/sendOTP.js";

// ==========================
// Signup
// ==========================
export const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Verify OTP
// ==========================
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await authService.verifyOTP(email, otp);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================
// Login
// ==========================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error('Email is required');
    }
    // Generate new OTP and expiry
    const newOtp = generateOTP();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);
    // Update user
    const user = await User.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { otp: newOtp, otpExpiry },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    // Always print the OTP to the terminal during development
    console.log(`🔑 OTP for ${user.email}: ${user.otp}`);
    // Send OTP email (handled in post-hook, but call directly for immediate feedback)
    try {
      await sendOTP(user.email, user.otp);
    } catch (emailError) {
      console.error('Failed to send OTP email:', emailError.message);
    }
    return res.status(200).json({ success: true, message: 'OTP resent successfully' });
  } catch (error) {
    next(error);
  }
};
