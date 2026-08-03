const TableShell = ({ title, columns, rows, emptyText = "No data yet" }) => {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
      {title && <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">{title}</h3>}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400 dark:border-slate-700">
              {columns.map((col) => (
                <th key={col} className="pb-2 pr-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-sm text-slate-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableShell;
