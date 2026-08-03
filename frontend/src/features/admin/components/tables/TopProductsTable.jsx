import TableShell from "./TableShell";

const TopProductsTable = ({ products = [] }) => {
  const rows = products.map((product) => (
    <tr key={product._id} className="border-b border-slate-50 last:border-0">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f]">{product.title}</td>
      <td className="py-2.5 pr-4 text-slate-500">{product.unitsSold} units</td>
      <td className="py-2.5 font-bold text-[#178f95]">Rs. {product.revenue}</td>
    </tr>
  ));

  return (
    <TableShell
      title="Top Selling Products"
      columns={["Product", "Units Sold", "Revenue"]}
      rows={rows}
    />
  );
};

export default TopProductsTable;
