import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyReviewsQuery } from "../reviewApi";
import ReviewCard from "../components/ReviewCard";
import { Card, Pagination } from "../../../shared/components";

// Buyer-facing "My Reviews" — every review the logged-in buyer has
// written, with the same edit/delete controls as on the product page.
const MyReviews = () => {
  const [page, setPage] = useState(1);
  const currentUserId = localStorage.getItem("userId");
  const { data, isLoading } = useGetMyReviewsQuery({ page, limit: 10 });

  const reviews = data?.reviews || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-[#fbfdfc] px-5 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-[#17233f] dark:text-slate-100">My Reviews</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Everything you've reviewed, in one place.
        </p>

        <div className="mt-6 space-y-4">
          {isLoading && <p className="text-sm text-slate-400">Loading your reviews...</p>}

          {!isLoading && reviews.length === 0 && (
            <Card className="p-8 text-center dark:border-slate-700/60 dark:bg-slate-800">
              <p className="text-sm text-slate-400">You haven't written any reviews yet.</p>
            </Card>
          )}

          {reviews.map((review) => (
            <div key={review._id}>
              <Link
                to={`/product/${review.product?._id}`}
                className="mb-1 inline-block text-xs font-bold text-[#178f95] hover:underline"
              >
                {review.product?.title}
              </Link>
              <ReviewCard review={review} productId={review.product?._id} currentUserId={currentUserId} />
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

export default MyReviews;
