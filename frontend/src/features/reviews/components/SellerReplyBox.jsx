import { useState } from "react";
import toast from "react-hot-toast";
import { useSellerReplyMutation } from "../reviewApi";

// Shown on a review card when the logged-in user is the seller of that
// product — lets them post (or view) their reply to the review.
const SellerReplyBox = ({ review, isSellerOwner }) => {
  const [replying, setReplying] = useState(false);
  const [message, setMessage] = useState("");
  const [sellerReply, { isLoading }] = useSellerReplyMutation();

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      await sellerReply({ id: review._id, message }).unwrap();
      toast.success("Reply posted");
      setReplying(false);
      setMessage("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to post reply");
    }
  };

  if (review.sellerReply?.message) {
    return (
      <div className="mt-3 rounded-xl border border-[#178f95]/20 bg-[#f6fbfb] p-3 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs font-bold text-[#178f95]">Seller Response</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{review.sellerReply.message}</p>
      </div>
    );
  }

  if (!isSellerOwner) return null;

  return (
    <div className="mt-3">
      {!replying ? (
        <button
          type="button"
          onClick={() => setReplying(true)}
          className="text-xs font-bold text-[#178f95] hover:underline"
        >
          Reply to this review
        </button>
      ) : (
        <div className="mt-2 rounded-xl border border-slate-200/70 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a response to this review..."
            rows={2}
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-8 rounded-lg bg-[#178f95] px-3 text-xs font-bold text-white disabled:opacity-60"
            >
              {isLoading ? "Posting..." : "Post Reply"}
            </button>
            <button onClick={() => setReplying(false)} className="h-8 rounded-lg px-3 text-xs font-bold text-slate-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerReplyBox;
