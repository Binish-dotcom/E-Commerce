const ReviewActivityLogTable = ({ logs = [] }) => {
  if (logs.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">No review activity recorded yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400 dark:border-slate-700">
            <th className="pb-2 pr-4">User</th>
            <th className="pb-2 pr-4">Action</th>
            <th className="pb-2 pr-4">Review</th>
            <th className="pb-2 pr-4">IP Address</th>
            <th className="pb-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
              <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">
                {log.user ? `${log.user.firstName} ${log.user.lastName}` : "—"}
              </td>
              <td className="py-2.5 pr-4 capitalize text-slate-500 dark:text-slate-400">{log.action?.replace(/_/g, " ")}</td>
              <td className="max-w-[200px] truncate py-2.5 pr-4 text-slate-500 dark:text-slate-400">{log.review?.title || "—"}</td>
              <td className="py-2.5 pr-4 font-mono text-xs text-slate-400">{log.ipAddress || "—"}</td>
              <td className="py-2.5 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewActivityLogTable;
