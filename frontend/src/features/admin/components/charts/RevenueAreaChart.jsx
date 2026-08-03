import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const RevenueAreaChart = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50">
      <h3 className="text-sm font-bold text-[#17233f]">Revenue Growth</h3>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#178f95" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#178f95" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="commissionColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F9C5A8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#F9C5A8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `Rs. ${v}`} />
            <Legend />
            <Area type="monotone" dataKey="revenue" name="Seller Payout" stroke="#178f95" fill="url(#revenueColor)" />
            <Area type="monotone" dataKey="commission" name="Platform Commission" stroke="#c99b63" fill="url(#commissionColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueAreaChart;
