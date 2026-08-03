import TableShell from "./TableShell";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-violet-50 text-violet-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

const RecentOrdersTable = ({ orders = [] }) => {
  const rows = orders.map((order) => (
    <tr key={order._id} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">{order.productTitle}</td>
      <td className="py-2.5 pr-4 text-slate-500">
        {order.buyer?.firstName} {order.buyer?.lastName}
      </td>
      <td className="py-2.5 pr-4 font-bold text-[#178f95]">Rs. {order.totalAmount}</td>
      <td className="py-2.5 pr-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_STYLES[order.status] || "bg-slate-100 text-slate-600"}`}>
          {order.status}
        </span>
      </td>
      <td className="py-2.5 text-slate-400">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
    </tr>
  ));

  return (
    <TableShell
      title="Recent Orders"
      columns={["Product", "Buyer", "Amount", "Status", "Date"]}
      rows={rows}
    />
  );
};

export default RecentOrdersTable;
