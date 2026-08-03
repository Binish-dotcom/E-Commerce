import toast from "react-hot-toast";
import TableShell from "./TableShell";
import { useApproveSellerMutation, useRejectSellerMutation } from "../../adminApi";

const PendingSellersTable = ({ sellers = [] }) => {
  const [approveSeller, { isLoading: approving }] = useApproveSellerMutation();
  const [rejectSeller, { isLoading: rejecting }] = useRejectSellerMutation();

  const handleApprove = async (id) => {
    try {
      await approveSeller(id).unwrap();
      toast.success("Seller approved");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to approve seller");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSeller(id).unwrap();
      toast.success("Seller rejected");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reject seller");
    }
  };

  const rows = sellers.map((s) => (
    <tr key={s._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">
        {s.storeProfile?.storeName || `${s.firstName} ${s.lastName}`}
      </td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{s.email}</td>
      <td className="py-2.5 flex gap-2">
        <button
          disabled={approving}
          onClick={() => handleApprove(s._id)}
          className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          disabled={rejecting}
          onClick={() => handleReject(s._id)}
          className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
        >
          Reject
        </button>
      </td>
    </tr>
  ));

  return (
    <TableShell title="Pending Seller Requests" columns={["Store / Name", "Email", "Actions"]} rows={rows} emptyText="No pending sellers" />
  );
};

export default PendingSellersTable;
