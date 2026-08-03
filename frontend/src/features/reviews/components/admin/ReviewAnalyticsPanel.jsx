import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  useGetReviewOverviewQuery,
  useGetMostReviewedProductsQuery,
  useGetHighestRatedProductsQuery,
  useGetLowestRatedProductsQuery,
  useGetMostActiveBuyersQuery,
  useGetProductsWithoutReviewsQuery,
  useGetMonthlyReviewTrendsQuery,
  useGetReviewDistributionQuery,
} from "../../reviewApi";

const COLORS = ["#178f95", "#c99b63", "#8b5cf6", "#f59e0b", "#22c55e"];

const StatBlock = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-2 text-2xl font-black text-[#17233f] dark:text-slate-100">{value}</p>
  </div>
);

const MiniList = ({ title, items = [], render }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
    <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">{title}</h3>
    <ul className="mt-3 space-y-2">
      {items.length === 0 && <li className="text-xs text-slate-400">No data yet</li>}
      {items.map((item, i) => (
        <li key={i} className="flex items-center justify-between text-sm">
          {render(item)}
        </li>
      ))}
    </ul>
  </div>
);

// Full Review Analytics dashboard — average rating, most/least reviewed
// and rated products, most active buyers, products with zero reviews,
// monthly trend line, and the platform-wide star distribution.
const ReviewAnalyticsPanel = () => {
  const { data: overview } = useGetReviewOverviewQuery();
  const { data: mostReviewed = [] } = useGetMostReviewedProductsQuery();
  const { data: highestRated = [] } = useGetHighestRatedProductsQuery();
  const { data: lowestRated = [] } = useGetLowestRatedProductsQuery();
  const { data: activeBuyers = [] } = useGetMostActiveBuyersQuery();
  const { data: noReviews = [] } = useGetProductsWithoutReviewsQuery();
  const { data: monthlyTrends = [] } = useGetMonthlyReviewTrendsQuery();
  const { data: distribution } = useGetReviewDistributionQuery();

  const distributionData = distribution
    ? [5, 4, 3, 2, 1].map((star) => ({ star: `${star}★`, count: distribution[star] || 0 }))
    : [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatBlock label="Total Reviews" value={overview?.totalReviews ?? "—"} />
        <StatBlock label="Average Rating" value={overview?.averageRating ?? "—"} />
        <StatBlock label="Pending" value={overview?.pendingReviews ?? "—"} />
        <StatBlock label="Approved" value={overview?.approvedReviews ?? "—"} />
        <StatBlock label="Reported" value={overview?.reportedReviews ?? "—"} />
        <StatBlock label="Flagged Spam" value={overview?.flaggedSpamReviews ?? "—"} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
          <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">Monthly Review Trends</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="Reviews" stroke="#178f95" strokeWidth={2} />
                <Line type="monotone" dataKey="avgRating" name="Avg Rating" stroke="#c99b63" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
          <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">Review Distribution</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} dataKey="count" nameKey="star" cx="50%" cy="50%" outerRadius={80} label={(e) => e.star}>
                  {distributionData.map((entry, i) => (
                    <Cell key={entry.star} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <MiniList
          title="Most Reviewed Products"
          items={mostReviewed}
          render={(p) => (
            <>
              <span className="font-semibold text-[#17233f] dark:text-slate-100">{p.title}</span>
              <span className="font-bold text-[#178f95]">{p.reviewCount} reviews</span>
            </>
          )}
        />
        <MiniList
          title="Most Active Buyers"
          items={activeBuyers}
          render={(b) => (
            <>
              <span className="font-semibold text-[#17233f] dark:text-slate-100">{b.name}</span>
              <span className="font-bold text-[#178f95]">{b.reviewCount} reviews</span>
            </>
          )}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <MiniList
          title="Highest Rated Products"
          items={highestRated}
          render={(p) => (
            <>
              <span className="font-semibold text-[#17233f] dark:text-slate-100">{p.title}</span>
              <span className="font-bold text-emerald-600">{p.avgRating} ★</span>
            </>
          )}
        />
        <MiniList
          title="Lowest Rated Products"
          items={lowestRated}
          render={(p) => (
            <>
              <span className="font-semibold text-[#17233f] dark:text-slate-100">{p.title}</span>
              <span className="font-bold text-red-500">{p.avgRating} ★</span>
            </>
          )}
        />
        <MiniList
          title="Products Without Reviews"
          items={noReviews}
          render={(p) => <span className="font-semibold text-[#17233f] dark:text-slate-100">{p.title}</span>}
        />
      </div>
    </div>
  );
};

export default ReviewAnalyticsPanel;
