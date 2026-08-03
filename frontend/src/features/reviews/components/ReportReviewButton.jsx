import { useState } from "react";
import toast from "react-hot-toast";
import { useReportReviewMutation } from "../reviewApi";

const REASONS = [
  { value: "spam", label: "Spam" },
  { value: "fake", label: "Fake review" },
  { value: "offensive", label: "Offensive content" },
  { value: "irrelevant", label: "Not relevant to the product" },
  { value: "other", label: "Other" },
];

const ReportReviewButton = ({ reviewId }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("spam");
  const [note, setNote] = useState("");
  const [reportReview, { isLoading }] = useReportReviewMutation();

  const handleSubmit = async () => {
    try {
      await reportReview({ id: reviewId, reason, note }).unwrap();
      toast.success("Thanks — we'll take a look at this review");
      setOpen(false);
      setNote("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to report review");
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-xs font-bold text-slate-400 hover:text-red-500"
      >
        🚩 Report
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-64 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-lg dark:border-slate-700/60 dark:bg-slate-800">
          <p className="text-xs font-bold text-slate-500">Why are you reporting this review?</p>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {REASONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-8 flex-1 rounded-lg bg-red-500 text-xs font-bold text-white disabled:opacity-60"
            >
              {isLoading ? "Sending..." : "Submit Report"}
            </button>
            <button onClick={() => setOpen(false)} className="h-8 rounded-lg px-3 text-xs font-bold text-slate-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportReviewButton;
