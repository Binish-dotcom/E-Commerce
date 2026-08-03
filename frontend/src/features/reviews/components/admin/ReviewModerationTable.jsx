import toast from "react-hot-toast";
import {
  useApproveReviewAdminMutation,
  useRejectReviewAdminMutation,
  useTogglePinReviewAdminMutation,
  useDeleteReviewAdminMutation,
  useSuspendBuyerAdminMutation,
} from "../../reviewApi";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

// Admin review moderation table — approve/reject/pin/delete a review,
// and suspend the buyer behind repeated fake reviews.
const ReviewModerationTable = ({ reviews = [] }) => {
  const [approveReview] = useApproveReviewAdminMutation();
  const [rejectReview] = useRejectReviewAdminMutation();
  const [togglePin] = useTogglePinReviewAdminMutation();
  const [deleteReview] = useDeleteReviewAdminMutation();
  const [suspendBuyer] = useSuspendBuyerAdminMutation();

  const act = async (fn, arg, successMsg) => {
    try {
      await fn(arg).unwrap();
      toast.success(successMsg);
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Permanently delete this review?")) return;
    act(deleteReview, id, "Review deleted");
  };

  const handleSuspend = (buyerId) => {
    if (!window.confirm("Suspend this buyer's account?")) return;
    act(suspendBuyer, buyerId, "Buyer suspended");
  };

  if (reviews.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">No reviews match these filters.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400 dark:border-slate-700">
            <th className="pb-2 pr-4">Review</th>
            <th className="pb-2 pr-4">Product</th>
            <th className="pb-2 pr-4">Buyer</th>
            <th className="pb-2 pr-4">Rating</th>
            <th className="pb-2 pr-4">Status</th>
            <th className="pb-2 pr-4">Reports</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
              <td className="max-w-[220px] truncate py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">
                {r.isPinned && "📌 "}
                {r.title}
              </td>
              <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{r.product?.title}</td>
              <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">
                {r.buyer?.firstName} {r.buyer?.lastName}
              </td>
              <td className="py-2.5 pr-4 font-bold text-amber-500">{r.rating} ★</td>
              <td className="py-2.5 pr-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_STYLES[r.status] || "bg-slate-100 text-slate-600"}`}>
                  {r.status}
                </span>
                {r.isFlaggedSpam && (
                  <span className="ml-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">Spam?</span>
                )}
              </td>
              <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{r.reports?.length || 0}</td>
              <td className="py-2.5">
                <div className="flex flex-wrap gap-2">
                  {r.status !== "approved" && (
                    <button onClick={() => act(approveReview, r._id, "Review approved")} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
                      Approve
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button onClick={() => act(rejectReview, r._id, "Review rejected")} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100">
                      Reject
                    </button>
                  )}
                  <button onClick={() => act(togglePin, r._id, r.isPinned ? "Review unpinned" : "Review pinned")} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200">
                    {r.isPinned ? "Unpin" : "Pin"}
                  </button>
                  <button onClick={() => handleDelete(r._id)} className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-100">
                    Delete
                  </button>
                  <button onClick={() => handleSuspend(r.buyer?._id)} className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 hover:bg-red-200">
                    Suspend Buyer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewModerationTable;
