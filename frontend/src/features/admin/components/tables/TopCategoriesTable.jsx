import TableShell from "./TableShell";

const TopCategoriesTable = ({ categories = [] }) => {
  const rows = categories.map((c) => (
    <tr key={c.category} className="border-b border-slate-50 last:border-0 dark:border-slate-700/40">
      <td className="py-2.5 pr-4 font-semibold text-[#17233f] dark:text-slate-100">{c.category}</td>
      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400">{c.unitsSold} sold</td>
      <td className="py-2.5 font-bold text-[#178f95]">Rs. {c.revenue}</td>
    </tr>
  ));

  return <TableShell title="Top Selling Categories" columns={["Category", "Units Sold", "Revenue"]} rows={rows} />;
};

export default TopCategoriesTable;
