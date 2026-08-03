import TableShell from "./TableShell";

export const LatestUsersTable = ({ users = [] }) => {
  const rows = users.map((u) => (
    <tr key={u._id} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">{u.firstName} {u.lastName}</td>
      <td className="py-2.5 pr-4 text-slate-500">{u.email}</td>
      <td className="py-2.5 text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
    </tr>
  ));

  return (
    <TableShell title="Latest Registered Users" columns={["Name", "Email", "Joined"]} rows={rows} />
  );
};

export const LatestSellersTable = ({ sellers = [] }) => {
  const rows = sellers.map((s) => (
    <tr key={s._id} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">
        {s.storeProfile?.storeName || `${s.firstName} ${s.lastName}`}
      </td>
      <td className="py-2.5 pr-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
          s.sellerStatus === "pending" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
        }`}>
          {s.sellerStatus}
        </span>
      </td>
      <td className="py-2.5 text-slate-400">{new Date(s.createdAt).toLocaleDateString()}</td>
    </tr>
  ));

  return (
    <TableShell title="Latest Sellers" columns={["Store / Name", "Status", "Joined"]} rows={rows} />
  );
};

export const LowStockTable = ({ products = [] }) => {
  const rows = products.map((p) => (
    <tr key={p._id} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">{p.title}</td>
      <td className="py-2.5 pr-4 text-slate-500">{p.seller?.storeProfile?.storeName || "-"}</td>
      <td className="py-2.5 font-bold text-red-500">{p.stock} left</td>
    </tr>
  ));

  return (
    <TableShell title="Low Stock Products" columns={["Product", "Seller", "Stock"]} rows={rows} />
  );
};
