import { useState } from "react";
import {
  useGetProductReviewsQuery,
  useGetRatingSummaryQuery,
  useCanReviewQuery,
} from "../reviewApi";
import AverageRatingCard from "./AverageRatingCard";
import RatingBreakdown from "./RatingBreakdown";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { Button, Card, Pagination } from "../../../shared/components";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest Rating" },
  { value: "lowest", label: "Lowest Rating" },
  { value: "helpful", label: "Most Helpful" },
];

const ReviewsSection = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [imagesOnly, setImagesOnly] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const currentUserId = localStorage.getItem("userId"); // set at login, if available

  const { data: summary } = useGetRatingSummaryQuery(productId);
  const { data: reviewsData, isLoading } = useGetProductReviewsQuery({
    productId,
    page,
    limit: 5,
    sort,
    verifiedOnly,
    rating: ratingFilter,
    imagesOnly,
  });
  const { data: eligibility } = useCanReviewQuery(productId, { skip: !isLoggedIn || role !== "buyer" });

  const reviews = reviewsData?.reviews || [];
  const pagination = reviewsData?.pagination;

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const resetAndSet = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <Card className="mt-6 p-6 dark:border-slate-700/60 dark:bg-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold text-[#17233f] dark:text-slate-100">Reviews & Ratings</h3>

        {isLoggedIn && role === "buyer" && eligibility?.canReview && !showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {isLoggedIn && role === "buyer" && eligibility && !eligibility.hasPurchased && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You can review this product after your order is delivered.
        </p>
      )}

      {isLoggedIn && role === "buyer" && eligibility?.alreadyReviewed && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You've already reviewed this product.</p>
      )}

      {showForm && (
        <div className="mt-5 rounded-2xl border border-slate-200/70 bg-[#f6fbfb] p-5 dark:border-slate-700 dark:bg-slate-900">
          <ReviewForm productId={productId} onDone={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Average rating + breakdown */}
      <div className="mt-6 grid gap-5 sm:grid-cols-[220px_1fr]">
        <AverageRatingCard
          averageRating={summary?.averageRating || 0}
          totalReviews={summary?.totalReviews || 0}
        />
        <RatingBreakdown
          distribution={summary?.distribution || {}}
          totalReviews={summary?.totalReviews || 0}
        />
      </div>

      {/* Filters + Sorting */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {pagination?.totalReviews || 0} review{pagination?.totalReviews === 1 ? "" : "s"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={ratingFilter}
            onChange={(e) => resetAndSet(setRatingFilter)(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => resetAndSet(setVerifiedOnly)(!verifiedOnly)}
            className={`h-10 rounded-xl border px-3 text-sm font-semibold ${
              verifiedOnly
                ? "border-[#178f95] bg-[#178f95]/10 text-[#178f95]"
                : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            ✓ Verified Only
          </button>

          <button
            type="button"
            onClick={() => resetAndSet(setImagesOnly)(!imagesOnly)}
            className={`h-10 rounded-xl border px-3 text-sm font-semibold ${
              imagesOnly
                ? "border-[#178f95] bg-[#178f95]/10 text-[#178f95]"
                : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            🖼 Images Only
          </button>

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort by: {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Review list */}
      <div className="mt-4 space-y-4">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-slate-400">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            No reviews match these filters yet.
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              productId={productId}
              currentUserId={currentUserId}
              currentUserRole={role}
            />
          ))
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
      )}
    </Card>
  );
};

export default ReviewsSection;
