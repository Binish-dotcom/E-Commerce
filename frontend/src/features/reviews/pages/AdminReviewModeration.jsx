import { useState } from "react";
import {
  useGetAllReviewsAdminQuery,
  useGetReportedReviewsQuery,
  useGetReviewActivityLogsQuery,
} from "../reviewApi";
import ReviewModerationTable from "../components/admin/ReviewModerationTable";
import ReviewActivityLogTable from "../components/admin/ReviewActivityLogTable";
import ReviewAnalyticsPanel from "../components/admin/ReviewAnalyticsPanel";
import { Card, Pagination } from "../../../shared/components";

const TABS = [
  { key: "all", label: "All Reviews" },
  { key: "reported", label: "Reported Reviews" },
  { key: "activity", label: "Activity Log" },
  { key: "analytics", label: "Analytics" },
];

// Admin's full moderation console for the Reviews & Ratings module:
// browse/search/filter every review, handle reported reviews, view the
// audit trail, and see review analytics — all in one page.
const AdminReviewModeration = () => {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", rating: "", verifiedOnly: "", imagesOnly: "", q: "", from: "", to: "" });

  const { data: allReviews, isLoading: loadingAll } = useGetAllReviewsAdminQuery(
    { page, limit: 15, ...filters },
    { skip: tab !== "all" }
  );
  const { data: reportedReviews, isLoading: loadingReported } = useGetReportedReviewsQuery(
    { page, limit: 15 },
    { skip: tab !== "reported" }
  );
  const { data: activityLogs, isLoading: loadingLogs } = useGetReviewActivityLogsQuery(
    { page, limit: 20 },
    { skip: tab !== "activity" }
  );

  const updateFilter = (key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fbfdfc] px-5 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-extrabold text-[#17233f] dark:text-slate-100">Review Moderation</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Approve, reject, pin, or remove reviews — and keep an eye on reported content.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setPage(1); }}
              className={`h-10 rounded-full px-4 text-sm font-bold transition ${
                tab === t.key
                  ? "bg-[#178f95] text-white"
                  : "border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "all" && (
          <Card className="mt-6 p-5 dark:border-slate-700/60 dark:bg-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={filters.q}
                onChange={(e) => updateFilter("q", e.target.value)}
                placeholder="Search reviews..."
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <select
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={filters.rating}
                onChange={(e) => updateFilter("rating", e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">All Ratings</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star</option>
                ))}
              </select>
              <button
                onClick={() => updateFilter("verifiedOnly", filters.verifiedOnly ? "" : "true")}
                className={`h-10 rounded-xl border px-3 text-sm font-semibold ${filters.verifiedOnly ? "border-[#178f95] bg-[#178f95]/10 text-[#178f95]" : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                ✓ Verified Only
              </button>
              <button
                onClick={() => updateFilter("imagesOnly", filters.imagesOnly ? "" : "true")}
                className={`h-10 rounded-xl border px-3 text-sm font-semibold ${filters.imagesOnly ? "border-[#178f95] bg-[#178f95]/10 text-[#178f95]" : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}
              >
                🖼 Images Only
              </button>
              <input type="date" value={filters.from} onChange={(e) => updateFilter("from", e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
              <input type="date" value={filters.to} onChange={(e) => updateFilter("to", e.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
            </div>

            <div className="mt-5">
              {loadingAll ? (
                <p className="py-8 text-center text-sm text-slate-400">Loading reviews...</p>
              ) : (
                <ReviewModerationTable reviews={allReviews?.reviews || []} />
              )}
            </div>

            {allReviews?.pagination && allReviews.pagination.totalPages > 1 && (
              <Pagination currentPage={allReviews.pagination.page} totalPages={allReviews.pagination.totalPages} onPageChange={setPage} />
            )}
          </Card>
        )}

        {tab === "reported" && (
          <Card className="mt-6 p-5 dark:border-slate-700/60 dark:bg-slate-800">
            {loadingReported ? (
              <p className="py-8 text-center text-sm text-slate-400">Loading reported reviews...</p>
            ) : (
              <ReviewModerationTable reviews={reportedReviews?.reviews || []} />
            )}
            {reportedReviews?.pagination && reportedReviews.pagination.totalPages > 1 && (
              <Pagination currentPage={reportedReviews.pagination.page} totalPages={reportedReviews.pagination.totalPages} onPageChange={setPage} />
            )}
          </Card>
        )}

        {tab === "activity" && (
          <Card className="mt-6 p-5 dark:border-slate-700/60 dark:bg-slate-800">
            {loadingLogs ? (
              <p className="py-8 text-center text-sm text-slate-400">Loading activity log...</p>
            ) : (
              <ReviewActivityLogTable logs={activityLogs?.logs || []} />
            )}
            {activityLogs?.pagination && activityLogs.pagination.totalPages > 1 && (
              <Pagination currentPage={activityLogs.pagination.page} totalPages={activityLogs.pagination.totalPages} onPageChange={setPage} />
            )}
          </Card>
        )}

        {tab === "analytics" && (
          <div className="mt-6">
            <ReviewAnalyticsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewModeration;
