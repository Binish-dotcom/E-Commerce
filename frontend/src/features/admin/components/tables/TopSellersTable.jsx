import TableShell from "./TableShell";

const TopSellersTable = ({ sellers = [] }) => {
  const rows = sellers.map((seller) => (
    <tr key={seller.sellerId} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">{seller.name}</td>
      <td className="py-2.5 pr-4 text-slate-500">{seller.email}</td>
      <td className="py-2.5 pr-4 text-slate-500">{seller.orders}</td>
      <td className="py-2.5 font-bold text-[#178f95]">Rs. {seller.revenue}</td>
    </tr>
  ));

  return (
    <TableShell
      title="Top Sellers"
      columns={["Seller", "Email", "Orders", "Revenue"]}
      rows={rows}
    />
  );
};

export default TopSellersTable;
