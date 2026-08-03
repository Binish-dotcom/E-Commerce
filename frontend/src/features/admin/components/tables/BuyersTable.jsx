import TableShell from "./TableShell";
import Pagination from "../../../../shared/components/Pagination";

const BuyersTable = ({ result, page, onPageChange }) => {
  const buyers = result?.buyers || [];
  const pagination = result?.pagination;

  const rows = buyers.map((b) => (
    <tr key={b._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">{b.name}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{b.orders}</td>
      <td className="py-2.5 pr-4 font-bold text-[#178f95]">Rs. {b.spent}</td>
      <td className="py-2.5 pr-4 text-slate-400">
        {b.lastLogin ? new Date(b.lastLogin).toLocaleDateString() : "Never"}
      </td>
      <td className="py-2.5">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
            b.status === "suspended" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {b.status}
        </span>
      </td>
    </tr>
  ));

  return (
    <div id="buyers">
      <TableShell title="Recent Buyers" columns={["Buyer", "Orders", "Spent", "Last Login", "Status"]} rows={rows} />
      {pagination && (
        <Pagination
          currentPage={page}
          totalPages={pagination.pages}
          onPageChange={onPageChange}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default BuyersTable;
