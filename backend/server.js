import http from "http";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import { initSocket } from "./src/sockets/index.js";
import registerCronJobs from "./src/cron/index.js";
import registerReviewCronJobs from "./src/cron/reviewCron.js";

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Wrap Express in a raw HTTP server so Socket.IO can attach to it.
    const httpServer = http.createServer(app);

    // Real-time admin dashboard updates (new orders, new sellers, etc.)
    initSocket(httpServer);

    // Scheduled jobs: daily/monthly reports, hourly cache refresh,
    // low-stock checks, overdue seller checks, log archiving.
    registerCronJobs();
    // Scheduled jobs for the Reviews & Ratings module: review
    // reminders, weekly/monthly analytics, spam detection, rating
    // recalculation, log archiving, no-review seller nudges.
    registerReviewCronJobs();

    // Start Server
    httpServer.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.log("Server Failed");

    console.log(error.message);

    process.exit(1);
  }
};

startServer();
