// Runs AFTER authMiddleware (which sets req.user from the JWT).
// Blocks the request unless the authenticated user's role is "admin".
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: admin only",
    });
  }

  next();
};

export default adminMiddleware;
