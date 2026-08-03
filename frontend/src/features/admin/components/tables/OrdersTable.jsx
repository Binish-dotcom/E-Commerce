import TableShell from "./TableShell";
import Pagination from "../../../../shared/components/Pagination";
import DateRangeFilter from "../common/DateRangeFilter";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-violet-50 text-violet-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  returned: "bg-slate-100 text-slate-600",
};

const PAYMENT_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  paid: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
  refunded: "bg-slate-100 text-slate-600",
};

// Full Orders management table — search, status filter, payment-status
// filter, and date-range filter (weekly/monthly/yearly/custom), all
// wired straight into the paginated /tables/orders endpoint.
const OrdersTable = ({
  result,
  page,
  onPageChange,
  filters,
  onFilterChange,
}) => {
  const orders = result?.orders || [];
  const pagination = result?.pagination;

  const rows = orders.map((order) => (
    <tr key={order._id} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-mono text-xs text-slate-400">{order._id.slice(-8)}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">
        {order.buyer?.firstName} {order.buyer?.lastName}
      </td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">
        {order.seller?.storeProfile?.storeName || order.seller?.firstName}
      </td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{order.quantity}x {order.productTitle}</td>
      <td className="py-2.5 pr-4 font-bold text-[#178f95]">Rs. {order.totalAmount}</td>
      <td className="py-2.5 pr-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${PAYMENT_STYLES[order.paymentStatus] || "bg-slate-100 text-slate-600"}`}>
          {order.paymentStatus}
        </span>
      </td>
      <td className="py-2.5 pr-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_STYLES[order.status] || "bg-slate-100 text-slate-600"}`}>
          {order.status}
        </span>
      </td>
      <td className="py-2.5 text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
    </tr>
  ));

  return (
    <div id="orders" className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">All Orders</h3>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={filters.q}
            onChange={(e) => onFilterChange("q", e.target.value)}
            placeholder="Search orders..."
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">All Status</option>
            {["pending", "processing", "shipped", "delivered", "cancelled", "returned"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <DateRangeFilter
            value={filters.range}
            onChange={(v) => onFilterChange("range", v)}
            customFrom={filters.from}
            customTo={filters.to}
            onCustomChange={(key, v) => onFilterChange(key, v)}
          />
        </div>
      </div>

      <div className="mt-4">
        <TableShell
          title=""
          columns={["Order ID", "Buyer", "Seller", "Items", "Total", "Payment", "Status", "Created At"]}
          rows={rows}
        />
      </div>

      {pagination && (
        <Pagination currentPage={page} totalPages={pagination.pages} onPageChange={onPageChange} className="mt-4" />
      )}
    </div>
  );
};

export default OrdersTable;
