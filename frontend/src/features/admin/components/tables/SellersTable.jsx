import toast from "react-hot-toast";
import TableShell from "./TableShell";
import Pagination from "../../../../shared/components/Pagination";
import { useSuspendSellerMutation, useActivateSellerMutation } from "../../adminApi";

const SellersTable = ({ result, page, onPageChange }) => {
  const sellers = result?.sellers || [];
  const pagination = result?.pagination;
  const [suspendSeller] = useSuspendSellerMutation();
  const [activateSeller] = useActivateSellerMutation();

  const toggleStatus = async (s) => {
    try {
      if (s.accountStatus === "suspended") {
        await activateSeller(s._id).unwrap();
        toast.success("Seller reactivated");
      } else {
        await suspendSeller(s._id).unwrap();
        toast.success("Seller suspended");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const rows = sellers.map((s) => (
    <tr key={s._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">{s.sellerName}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.storeName}</td>
      <td className="py-2.5 pr-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
            s.accountStatus === "suspended"
              ? "bg-red-50 text-red-600"
              : s.sellerStatus === "pending"
              ? "bg-amber-50 text-amber-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {s.accountStatus === "suspended" ? "suspended" : s.sellerStatus}
        </span>
      </td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.totalProducts}</td>
      <td className="py-2.5 pr-4 font-bold text-[#178f95]">Rs. {s.revenue}</td>
      <td className="py-2.5">
        <button
          onClick={() => toggleStatus(s)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            s.accountStatus === "suspended"
              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {s.accountStatus === "suspended" ? "Reactivate" : "Suspend"}
        </button>
      </td>
    </tr>
  ));

  return (
    <div id="sellers">
      <TableShell
        title="Recent Sellers"
        columns={["Seller Name", "Store Name", "Status", "Total Products", "Revenue", "Action"]}
        rows={rows}
      />
      {pagination && (
        <Pagination currentPage={page} totalPages={pagination.pages} onPageChange={onPageChange} className="mt-4" />
      )}
    </div>
  );
};

export default SellersTable;
