import { useState } from "react";
import toast from "react-hot-toast";
import { useGenerateReportMutation, useSendAnnouncementMutation } from "../../adminApi";

// "Generate Report" and "Send Announcement" quick actions.
// Approve/Reject/Suspend/Deactivate/Delete live inline on their
// respective tables (PendingSellersTable, PendingProductsTable,
// SellersTable) since they act on a specific row.
const QuickActionsBar = () => {
  const [generateReport, { isLoading: generating }] = useGenerateReportMutation();
  const [sendAnnouncement, { isLoading: sending }] = useSendAnnouncementMutation();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateReport = async () => {
    try {
      await generateReport({}).unwrap();
      toast.success("Report generated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to generate report");
    }
  };

  const handleSendAnnouncement = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Announcement needs a title and message");
      return;
    }
    try {
      await sendAnnouncement({ title, message }).unwrap();
      toast.success("Announcement sent");
      setTitle("");
      setMessage("");
      setShowAnnouncement(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send announcement");
    }
  };

  return (
    <section className="flex flex-wrap items-center gap-3">
      <button
        onClick={handleGenerateReport}
        disabled={generating}
        className="h-11 rounded-full bg-[#178f95] px-5 text-sm font-bold text-white shadow-md shadow-[#178f95]/25 transition hover:brightness-105 disabled:opacity-60"
      >
        {generating ? "Generating..." : "Generate Report"}
      </button>

      <button
        onClick={() => setShowAnnouncement((s) => !s)}
        className="h-11 rounded-full border border-[#178f95]/25 bg-white px-5 text-sm font-bold text-[#178f95] transition hover:bg-[#f6fbfb] dark:bg-slate-800"
      >
        Send Announcement
      </button>

      {showAnnouncement && (
        <div className="mt-2 w-full rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Announcement message"
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            onClick={handleSendAnnouncement}
            disabled={sending}
            className="mt-2 h-10 rounded-full bg-[#178f95] px-5 text-sm font-bold text-white disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      )}
    </section>
  );
};

export default QuickActionsBar;
