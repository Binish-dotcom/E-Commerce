import { useState } from "react";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import ReportReviewButton from "./ReportReviewButton";
import SellerReplyBox from "./SellerReplyBox";
import { Button } from "../../../shared/components";
import { useDeleteReviewMutation, useToggleLikeReviewMutation } from "../reviewApi";

const ReviewCard = ({ review, productId, currentUserId, currentUserRole }) => {
  const [editing, setEditing] = useState(false);
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();
  const [toggleLike] = useToggleLikeReviewMutation();

  const isOwner = currentUserId && review.buyer?._id === currentUserId;
  const hasLiked = currentUserId && review.likes?.includes(currentUserId);
  const isSellerOwner = currentUserRole === "seller" && currentUserId && String(review.seller) === String(currentUserId);

  const handleDelete = async () => {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview({ id: review._id, productId });
  };

  if (editing) {
    return (
      <div className="rounded-2xl border border-slate-200/70 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-800">
        <ReviewForm
          productId={productId}
          existingReview={review}
          onDone={() => setEditing(false)}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-800">
      {review.isPinned && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:bg-amber-500/10">
          📌 Pinned by Admin
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#17233f] dark:text-slate-100">
              {review.isAnonymous ? "Anonymous Buyer" : `${review.buyer?.firstName || ""} ${review.buyer?.lastName || ""}`}
            </span>
            {review.verifiedPurchase && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">
                ✓ Verified Purchase
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <StarRating value={review.rating} readOnly size="text-sm" />
            <span className="text-xs font-semibold text-slate-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs font-bold text-[#178f95] hover:underline"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <h4 className="mt-3 font-extrabold text-[#17233f] dark:text-slate-100">{review.title}</h4>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{review.description}</p>

      {(review.pros?.length > 0 || review.cons?.length > 0) && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {review.pros?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-emerald-600">Pros</p>
              <ul className="mt-1 space-y-0.5">
                {review.pros.map((p) => (
                  <li key={p} className="text-xs text-slate-500 dark:text-slate-400">+ {p}</li>
                ))}
              </ul>
            </div>
          )}
          {review.cons?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-red-500">Cons</p>
              <ul className="mt-1 space-y-0.5">
                {review.cons.map((c) => (
                  <li key={c} className="text-xs text-slate-500 dark:text-slate-400">− {c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {review.images?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.images.map((img) => (
            <img key={img} src={img} alt="Review" className="h-16 w-16 rounded-lg object-cover" />
          ))}
        </div>
      )}

      {review.videos?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {review.videos.map((v) => (
            <a key={v} href={v} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#178f95] hover:underline">
              ▶ Watch video
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => toggleLike({ id: review._id, productId })}
          disabled={!currentUserId}
          className={`inline-flex items-center gap-1.5 text-xs font-bold ${
            hasLiked ? "text-[#178f95]" : "text-slate-400 hover:text-[#178f95]"
          }`}
        >
          👍 Helpful{review.likes?.length ? ` (${review.likes.length})` : ""}
        </button>

        {currentUserId && !isOwner && <ReportReviewButton reviewId={review._id} />}
      </div>

      <SellerReplyBox review={review} isSellerOwner={isSellerOwner} />
    </div>
  );
};

export default ReviewCard;
