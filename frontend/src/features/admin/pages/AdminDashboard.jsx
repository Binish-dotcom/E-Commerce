import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetOverviewQuery,
  useGetSalesReportQuery,
  useGetRevenueQuery,
  useGetLatestOrdersQuery,
  useGetTopSellersQuery,
  useGetTopProductsQuery,
  useGetRecentActivityQuery,
  useGetPendingSellersQuery,
  useGetPendingProductsQuery,
  useGetExtendedOverviewQuery,
  useGetCategoryDistributionQuery,
  useGetDailyOrdersQuery,
  useGetTopCategoriesQuery,
  useGetBuyersTableQuery,
  useGetSellersTableQuery,
  useGetOrdersTableQuery,
  useGetActivityLogsQuery,
} from "../adminApi";

import useAdminSocket from "../hooks/useAdminSocket";
import useAdminTheme from "../hooks/useAdminTheme";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { SkeletonCard, SkeletonBlock } from "../components/common/Skeleton";
import QuickActionsBar from "../components/actions/QuickActionsBar";

import StatCard from "../components/cards/StatCard";
import SalesLineChart from "../components/charts/SalesLineChart";
import OrdersPieChart from "../components/charts/OrdersPieChart";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import DailyOrdersChart from "../components/charts/DailyOrdersChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";

import RecentOrdersTable from "../components/tables/RecentOrdersTable";
import TopSellersTable from "../components/tables/TopSellersTable";
import TopProductsTable from "../components/tables/TopProductsTable";
import TopCategoriesTable from "../components/tables/TopCategoriesTable";
import { LatestUsersTable, LatestSellersTable, LowStockTable } from "../components/tables/MiscTables";
import PendingSellersTable from "../components/tables/PendingSellersTable";
import PendingProductsTable from "../components/tables/PendingProductsTable";
import BuyersTable from "../components/tables/BuyersTable";
import SellersTable from "../components/tables/SellersTable";
import OrdersTable from "../components/tables/OrdersTable";
import ActivityLogTable from "../components/tables/ActivityLogTable";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark, toggleTheme } = useAdminTheme();
  useAdminSocket(dispatch);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buyersPage, setBuyersPage] = useState(1);
  const [sellersPage, setSellersPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [orderFilters, setOrderFilters] = useState({ q: "", status: "", range: "", from: "", to: "" });

  const { data: overview, isLoading: overviewLoading, isError: overviewError } = useGetOverviewQuery();
  const { data: extended, isLoading: extendedLoading } = useGetExtendedOverviewQuery();
  const { data: salesReport = [], isLoading: salesLoading } = useGetSalesReportQuery();
  const { data: revenue, isLoading: revenueLoading } = useGetRevenueQuery();
  const { data: latestOrders = [], isLoading: ordersLoading } = useGetLatestOrdersQuery();
  const { data: topSellers = [], isLoading: sellersLoading } = useGetTopSellersQuery();
  const { data: topProducts = [], isLoading: productsLoading } = useGetTopProductsQuery();
  const { data: recentActivity, isLoading: activityLoading } = useGetRecentActivityQuery();
  const { data: pendingSellers = [] } = useGetPendingSellersQuery();
  const { data: pendingProducts = [] } = useGetPendingProductsQuery();
  const { data: categoryDistribution = [] } = useGetCategoryDistributionQuery();
  const { data: dailyOrders = [] } = useGetDailyOrdersQuery();
  const { data: topCategories = [] } = useGetTopCategoriesQuery();
  const { data: buyersResult } = useGetBuyersTableQuery({ page: buyersPage });
  const { data: sellersResult } = useGetSellersTableQuery({ page: sellersPage });
  const { data: ordersResult } = useGetOrdersTableQuery({ page: ordersPage, ...orderFilters });
  const { data: activityLogsResult } = useGetActivityLogsQuery({ page: 1, limit: 15 });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const handleOrderFilterChange = (key, value) => {
    setOrdersPage(1);
    setOrderFilters((prev) => ({ ...prev, [key]: value }));
  };

  const statCards = overview
    ? [
        { label: "Total Revenue", value: `Rs. ${overview.totalRevenue}`, icon: "💰" },
        { label: "Today's Revenue", value: `Rs. ${extended?.todaysRevenue ?? 0}`, icon: "☀️" },
        { label: "Monthly Sales", value: `Rs. ${overview.monthlySales}`, icon: "📈" },
        { label: "Total Buyers", value: overview.totalBuyers, icon: "🛍️" },
        { label: "Total Sellers", value: overview.totalSellers, icon: "🏪" },
        { label: "Active Sellers", value: extended?.activeSellers ?? 0, icon: "✅" },
        { label: "Pending Seller Requests", value: overview.pendingSellerRequests, icon: "📝", accent: "#c99b63" },
        { label: "Total Products", value: overview.totalProducts, icon: "📦" },
        { label: "Pending Products", value: overview.pendingProducts, icon: "⏳", accent: "#c99b63" },
        { label: "Total Orders", value: overview.totalOrders, icon: "🧾" },
        { label: "Pending Orders", value: extended?.pendingOrders ?? 0, icon: "🕓", accent: "#c99b63" },
        { label: "Processing Orders", value: extended?.processingOrders ?? 0, icon: "🔄" },
        { label: "Delivered Orders", value: overview.deliveredOrders, icon: "✅", accent: "#22c55e" },
        { label: "Cancelled Orders", value: overview.cancelledOrders, icon: "❌", accent: "#ef4444" },
        { label: "Returned Orders", value: extended?.returnedOrders ?? 0, icon: "↩️", accent: "#94a3b8" },
        { label: "Platform Commission", value: `Rs. ${overview.platformCommission}`, icon: "🏦" },
        { label: "Total Coupons", value: extended?.totalCoupons ?? 0, icon: "🎟️" },
        { label: "Active Coupons", value: extended?.activeCoupons ?? 0, icon: "🏷️" },
        { label: "Out Of Stock Products", value: extended?.outOfStockProducts ?? 0, icon: "🚫", accent: "#ef4444" },
        { label: "Low Stock Products", value: extended?.lowStockProducts ?? 0, icon: "⚠️", accent: "#f59e0b" },
      ]
    : [];

  return (
    <div className={isDark ? "dark" : ""}>
      <main className="min-h-screen bg-[#fbfdfc] text-[#17233f] dark:bg-slate-950 dark:text-slate-100 lg:flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 px-5 py-6">
          <div className="mx-auto max-w-7xl">
            <Topbar
              onMenuClick={() => setSidebarOpen(true)}
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onLogout={handleLogout}
            />

            {/* Admin Shortcuts + Quick Actions */}
            <section className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="h-11 rounded-full bg-[#178f95] px-5 text-sm font-bold text-white shadow-md shadow-[#178f95]/25 transition hover:brightness-105 flex items-center"
                >
                  Review Pending Products ({overview?.pendingProducts ?? 0})
                </a>
                <a
                  href="#sellers"
                  className="h-11 rounded-full border border-[#178f95]/25 bg-white px-5 text-sm font-bold text-[#178f95] transition hover:bg-[#f6fbfb] dark:bg-slate-800 flex items-center"
                >
                  Review Pending Sellers ({overview?.pendingSellerRequests ?? 0})
                </a>
                <a
                  href="#orders"
                  className="h-11 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 flex items-center"
                >
                  Manage All Orders
                </a>
              </div>
              <QuickActionsBar />
            </section>

            {/* Quick Statistics Cards */}
            <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {(overviewLoading || extendedLoading) &&
                Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
              {overviewError && (
                <p className="col-span-full text-sm font-semibold text-red-500">Failed to load dashboard overview.</p>
              )}
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </section>

            {/* Analytics Charts */}
            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              {salesLoading ? <SkeletonBlock /> : <SalesLineChart data={salesReport} />}
              {revenueLoading ? <SkeletonBlock /> : <OrdersPieChart data={revenue?.ordersByStatus || []} />}
            </section>

            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              {revenueLoading ? <SkeletonBlock /> : <RevenueAreaChart data={revenue?.revenueGrowth || []} />}
              <DailyOrdersChart data={dailyOrders} />
            </section>

            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              <CategoryPieChart data={categoryDistribution} />
              <TopCategoriesTable categories={topCategories} />
            </section>

            {/* Top Sellers / Top Products */}
            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              {sellersLoading ? <SkeletonBlock /> : <TopSellersTable sellers={topSellers} />}
              {productsLoading ? <SkeletonBlock /> : <TopProductsTable products={topProducts} />}
            </section>

            {/* Pending Sellers / Pending Products (actionable) */}
            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              <div id="sellers">
                <PendingSellersTable sellers={pendingSellers} />
              </div>
              <div id="products">
                <PendingProductsTable products={pendingProducts} />
              </div>
            </section>

            {/* Recent Orders (snapshot) */}
            <section className="mt-6">
              {ordersLoading ? <SkeletonBlock /> : <RecentOrdersTable orders={latestOrders} />}
            </section>

            {/* Full Orders Table — search / filter / pagination */}
            <section className="mt-6">
              <OrdersTable
                result={ordersResult}
                page={ordersPage}
                onPageChange={setOrdersPage}
                filters={orderFilters}
                onFilterChange={handleOrderFilterChange}
              />
            </section>

            {/* Recent Buyers / Recent Sellers (paginated) */}
            <section className="mt-6 grid gap-5 lg:grid-cols-2">
              <BuyersTable result={buyersResult} page={buyersPage} onPageChange={setBuyersPage} />
              <SellersTable result={sellersResult} page={sellersPage} onPageChange={setSellersPage} />
            </section>

            {/* Recent Activities */}
            <section className="mt-6 grid gap-5 lg:grid-cols-3">
              {activityLoading ? (
                <p className="col-span-full text-sm font-semibold text-slate-400">Loading recent activity...</p>
              ) : (
                <>
                  <LatestUsersTable users={recentActivity?.latestUsers || []} />
                  <LatestSellersTable sellers={recentActivity?.latestSellers || []} />
                  <LowStockTable products={recentActivity?.lowStockProducts || []} />
                </>
              )}
            </section>

            {/* Activity Log / Audit Trail */}
            <section className="mt-6 mb-10">
              <ActivityLogTable logs={activityLogsResult?.logs || []} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
