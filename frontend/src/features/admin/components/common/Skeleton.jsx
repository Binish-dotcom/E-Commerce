// Lightweight loading skeleton blocks used across the Admin Dashboard
// while RTK Query requests are in flight.
export const SkeletonCard = () => (
  <div className="h-[104px] animate-pulse rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
    <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-4 h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
  </div>
);

export const SkeletonBlock = ({ height = "h-64" }) => (
  <div
    className={`${height} animate-pulse rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800`}
  >
    <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-6 h-[70%] w-full rounded bg-slate-100 dark:bg-slate-700/60" />
  </div>
);

export default SkeletonCard;
