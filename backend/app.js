// import express from "express";
// import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import errorMiddleware from "./middleware/error.middleware.js";

// const app = express();

// // ==========================
// // Middlewares
// // ==========================
// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // ==========================
// // Routes
// // ==========================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// // ==========================
// // Default Route
// // ==========================
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "E-Commerce Authentication API Running Successfully",
//   });
// });

// // ==========================
// // Error Middleware
// // ==========================
// app.use(errorMiddleware);

// export default app;



// import express from "express";
// import cors from "cors";

// import authRoutes from "./src/routes/auth.routes.js";
// import userRoutes from "./src/routes/user.routes.js";
// import productRoutes from "./src/routes/product.routes.js";
// import errorMiddleware from "./src/middleware/error.middleware.js";

// const app = express();

// // ==========================
// // Middlewares
// // ==========================
// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // ==========================
// // Routes
// // ==========================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// // ==========================
// // Default Route
// // ==========================
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "E-Commerce Authentication API Running Successfully",
//   });
// });

// // ==========================
// // Error Middleware
// // ==========================
// app.use(errorMiddleware);

// export default app;










// import express from "express";
// import cors from "cors";

// import authRoutes from "./src/routes/auth.routes.js";
// import userRoutes from "./src/routes/user.routes.js";
// import productRoutes from "./src/routes/product.routes.js";
// import uploadRoutes from "./src/routes/upload.routes.js";
// import errorMiddleware from "./src/middleware/error.middleware.js";

// const app = express();

// // ==========================
// // Middlewares
// // ==========================
// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// // ==========================
// // Routes
// // ==========================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/upload", uploadRoutes);

// // ==========================
// // Default Route
// // ==========================
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "E-Commerce Authentication API Running Successfully",
//   });
// });

// // ==========================
// // Error Middleware
// // ==========================
// app.use(errorMiddleware);

// export default app;







import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import adminExtraRoutes from "./src/routes/adminExtra.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import reviewExtraRoutes from "./src/routes/reviewExtra.routes.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

// ==========================
// Middlewares
// ==========================
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
// Extended Admin Dashboard & Analytics module (quick actions, search,
// filters, notifications, activity logs) — additive, mounted on the
// same /api/admin prefix as the existing analytics routes above.
app.use("/api/admin", adminExtraRoutes);
app.use("/api/reviews", reviewRoutes);
// Extended Reviews & Ratings module (report, seller reply, my-reviews,
// seller inbox, admin moderation, review analytics) — additive, mounted
// on the same /api/reviews prefix as the existing review routes above.
app.use("/api/reviews", reviewExtraRoutes);

// ==========================
// Default Route
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Authentication API Running Successfully",
  });
});

// ==========================
// Error Middleware
// ==========================
app.use(errorMiddleware);

export default app;