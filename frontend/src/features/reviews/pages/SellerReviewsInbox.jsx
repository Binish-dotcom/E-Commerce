import { useState } from "react";
import { useGetSellerReviewsQuery } from "../reviewApi";
import ReviewCard from "../components/ReviewCard";
import { Card, Pagination } from "../../../shared/components";

// Seller-facing review inbox — every review across their products,
// with the reply box available inline on each card.
const SellerReviewsInbox = () => {
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState("");
  const currentUserId = localStorage.getItem("userId");

  const { data, isLoading } = useGetSellerReviewsQuery({ page, limit: 10, rating });
  const reviews = data?.reviews || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-[#fbfdfc] px-5 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#17233f] dark:text-slate-100">Reviews Inbox</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Every review left on your products. Reply directly to build trust with buyers.
            </p>
          </div>
          <select
            value={rating}
            onChange={(e) => { setRating(e.target.value); setPage(1); }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && <p className="text-sm text-slate-400">Loading reviews...</p>}

          {!isLoading && reviews.length === 0 && (
            <Card className="p-8 text-center dark:border-slate-700/60 dark:bg-slate-800">
              <p className="text-sm text-slate-400">No reviews on your products yet.</p>
            </Card>
          )}

          {reviews.map((review) => (
            <div key={review._id}>
              <p className="mb-1 text-xs font-bold text-[#178f95]">{review.product?.title}</p>
              <ReviewCard
                review={review}
                productId={review.product?._id}
                currentUserId={currentUserId}
                currentUserRole="seller"
              />
            </div>
          ))}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default SellerReviewsInbox;
