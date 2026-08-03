const RatingBreakdown = ({ distribution = {}, totalReviews = 0 }) => {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
      <div className="space-y-2.5">
        {stars.map((star) => {
          const count = distribution[star] || 0;
          const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-10 shrink-0 font-semibold text-slate-500">{star} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right text-xs font-bold text-slate-400">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingBreakdown;
