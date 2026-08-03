import rateLimit from "express-rate-limit";

// General limiter for all /api/admin/* routes.
export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests / 15 min per IP — generous for a dashboard that polls
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
});

// Stricter limiter for sensitive write actions (approve/reject/suspend/delete).
export const adminActionRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many admin actions performed. Please slow down.",
  },
});

export default adminRateLimiter;

// ==========================================
// Reviews & Ratings module rate limiters
// ==========================================

// General limiter for all /api/reviews/* extra routes (report, reply,
// my-reviews, seller inbox, admin moderation, analytics).
export const reviewRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
});

// Stricter limiter for write actions that can be abused (reporting,
// replying, approve/reject/pin/delete/suspend) — prevents spam-reporting
// or moderation-flooding.
export const reviewActionRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many actions performed. Please slow down.",
  },
});
