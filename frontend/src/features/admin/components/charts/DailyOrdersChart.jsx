import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DailyOrdersChart = ({ data = [] }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
    <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">Daily Orders (Last 14 Days)</h3>
    <div className="mt-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#178f95" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DailyOrdersChart;
