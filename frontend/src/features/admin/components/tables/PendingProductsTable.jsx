import toast from "react-hot-toast";
import TableShell from "./TableShell";
import { useApproveProductMutation, useRejectProductMutation, useDeleteProductMutation } from "../../adminApi";

const PendingProductsTable = ({ products = [] }) => {
  const [approveProduct, { isLoading: approving }] = useApproveProductMutation();
  const [rejectProduct, { isLoading: rejecting }] = useRejectProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const act = async (fn, id, successMsg) => {
    try {
      await fn(id).unwrap();
      toast.success(successMsg);
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const rows = products.map((p) => (
    <tr key={p._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">{p.title}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">
        {p.seller?.storeProfile?.storeName || `${p.seller?.firstName || ""} ${p.seller?.lastName || ""}`}
      </td>
      <td className="py-2.5 pr-4 font-bold text-[#178f95]">Rs. {p.price}</td>
      <td className="py-2.5 flex flex-wrap gap-2">
        <button
          disabled={approving}
          onClick={() => act(approveProduct, p._id, "Product approved")}
          className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          disabled={rejecting}
          onClick={() => act(rejectProduct, p._id, "Product rejected")}
          className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
        >
          Reject
        </button>
        <button
          disabled={deleting}
          onClick={() => act(deleteProduct, p._id, "Product deleted")}
          className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <TableShell
      title="Pending Products"
      columns={["Product", "Seller", "Price", "Actions"]}
      rows={rows}
      emptyText="No pending products"
    />
  );
};

export default PendingProductsTable;
