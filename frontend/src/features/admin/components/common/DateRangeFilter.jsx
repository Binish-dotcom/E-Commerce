const OPTIONS = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "custom", label: "Custom" },
];

// Date range filter (Weekly / Monthly / Yearly / Custom) used on the
// orders table and other filterable analytics views.
const DateRangeFilter = ({ value, onChange, customFrom, customTo, onCustomChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#17233f] outline-none focus:border-[#178f95] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="">All Time</option>
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {value === "custom" && (
        <>
          <input
            type="date"
            value={customFrom}
            onChange={(e) => onCustomChange("from", e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <input
            type="date"
            value={customTo}
            onChange={(e) => onCustomChange("to", e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </>
      )}
    </div>
  );
};

export default DateRangeFilter;
