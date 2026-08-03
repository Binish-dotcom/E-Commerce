import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

// Aggregation-heavy analytics for the Reviews & Ratings module —
// used by the admin dashboard's review analytics tab.
class ReviewAnalyticsService {
  async getOverview() {
    const [totalReviews, avgAgg, statusCounts, reportedCount, flaggedCount] = await Promise.all([
      Review.countDocuments(),
      Review.aggregate([{ $group: { _id: null, avg: { $avg: "$rating" } } }]),
      Review.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Review.countDocuments({ "reports.0": { $exists: true } }),
      Review.countDocuments({ isFlaggedSpam: true }),
    ]);

    const statusMap = { pending: 0, approved: 0, rejected: 0 };
    statusCounts.forEach((s) => { statusMap[s._id] = s.count; });

    return {
      success: true,
      overview: {
        totalReviews,
        averageRating: Number((avgAgg[0]?.avg || 0).toFixed(2)),
        pendingReviews: statusMap.pending,
        approvedReviews: statusMap.approved,
        rejectedReviews: statusMap.rejected,
        reportedReviews: reportedCount,
        flaggedSpamReviews: flaggedCount,
      },
    };
  }

  async getMostReviewedProducts(limit = 10) {
    const rows = await Review.aggregate([
      { $group: { _id: "$product", reviewCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } },
      { $sort: { reviewCount: -1 } },
      { $limit: limit },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          reviewCount: 1,
          avgRating: { $round: ["$avgRating", 1] },
        },
      },
    ]);
    return { success: true, mostReviewedProducts: rows };
  }

  async getHighestRatedProducts(limit = 10) {
    const rows = await Review.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$product", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
      { $match: { reviewCount: { $gte: 3 } } }, // avoid a single 5-star review topping the chart
      { $sort: { avgRating: -1 } },
      { $limit: limit },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          avgRating: { $round: ["$avgRating", 1] },
          reviewCount: 1,
        },
      },
    ]);
    return { success: true, highestRatedProducts: rows };
  }

  async getLowestRatedProducts(limit = 10) {
    const rows = await Review.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$product", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } },
      { $match: { reviewCount: { $gte: 3 } } },
      { $sort: { avgRating: 1 } },
      { $limit: limit },
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          avgRating: { $round: ["$avgRating", 1] },
          reviewCount: 1,
        },
      },
    ]);
    return { success: true, lowestRatedProducts: rows };
  }

  async getMostActiveBuyers(limit = 10) {
    const rows = await Review.aggregate([
      { $group: { _id: "$buyer", reviewCount: { $sum: 1 } } },
      { $sort: { reviewCount: -1 } },
      { $limit: limit },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "buyer" } },
      { $unwind: "$buyer" },
      {
        $project: {
          _id: 0,
          buyerId: "$_id",
          name: { $concat: ["$buyer.firstName", " ", "$buyer.lastName"] },
          reviewCount: 1,
        },
      },
    ]);
    return { success: true, mostActiveBuyers: rows };
  }

  async getProductsWithoutReviews(limit = 20) {
    const rows = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews",
        },
      },
      { $match: { reviews: { $size: 0 } } },
      { $limit: limit },
      { $project: { _id: 1, title: 1, seller: 1, createdAt: 1 } },
    ]);
    return { success: true, productsWithoutReviews: rows };
  }

  // Monthly review volume + average rating trend (last 6 months)
  async getMonthlyTrends() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const rows = await Review.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
          count: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1 } },
    ]);

    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const match = rows.find((r) => r._id.y === d.getFullYear() && r._id.m === d.getMonth() + 1);
      result.push({
        month: d.toLocaleString("en-US", { month: "short", year: "numeric" }),
        count: match?.count || 0,
        avgRating: match ? Number(match.avgRating.toFixed(1)) : 0,
      });
    }

    return { success: true, monthlyTrends: result };
  }

  // Overall 1-5 star distribution across the whole platform
  async getReviewDistribution() {
    const rows = await Review.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    rows.forEach((r) => { distribution[r._id] = r.count; });
    return { success: true, distribution };
  }
}

export default new ReviewAnalyticsService();
