const StatCard = ({ label, value, icon, accent = "#178f95" }) => {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span>
        {icon && (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
            style={{ backgroundColor: `${accent}1A`, color: accent }}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-black text-[#17233f] dark:text-slate-100">{value}</p>
    </div>
  );
};

export default StatCard;
