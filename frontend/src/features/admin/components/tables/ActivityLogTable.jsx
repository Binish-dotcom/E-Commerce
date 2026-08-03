import TableShell from "./TableShell";

const ActivityLogTable = ({ logs = [] }) => {
  const rows = logs.map((log) => (
    <tr key={log._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">
        {log.admin ? `${log.admin.firstName} ${log.admin.lastName}` : "System"}
      </td>
      <td className="py-2.5 pr-4 capitalize text-slate-500 dark:text-slate-400">{log.action?.replace(/_/g, " ")}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{log.targetType || "—"}</td>
      <td className="py-2.5 pr-4 font-mono text-xs text-slate-400">{log.ipAddress || "—"}</td>
      <td className="py-2.5 text-slate-400">{new Date(log.createdAt).toLocaleString()}</td>
    </tr>
  ));

  return (
    <div id="activity">
      <TableShell
        title="Activity Log & Audit Trail"
        columns={["Admin", "Action", "Target", "IP Address", "Timestamp"]}
        rows={rows}
        emptyText="No admin activity recorded yet"
      />
    </div>
  );
};

export default ActivityLogTable;
