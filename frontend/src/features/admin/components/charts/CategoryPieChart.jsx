import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#178f95", "#c99b63", "#8b5cf6", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6", "#ec4899"];

const CategoryPieChart = ({ data = [] }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800">
    <h3 className="text-sm font-bold text-[#17233f] dark:text-slate-100">Product Category Distribution</h3>
    <div className="mt-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={(e) => e.category}>
            {data.map((entry, i) => (
              <Cell key={entry.category} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default CategoryPieChart;
