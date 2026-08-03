import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Reuses the same backend base URL convention as the rest of the app.
const BASE_URL = "http://localhost:5000/api/admin";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Overview",
    "ExtendedOverview",
    "PendingSellers",
    "PendingProducts",
    "BuyersTable",
    "SellersTable",
    "OrdersTable",
    "Notifications",
    "ActivityLogs",
  ],
  endpoints: (builder) => ({
    // ===== Original analytics (unchanged) =====
    getOverview: builder.query({
      query: () => "/analytics/overview",
      transformResponse: (res) => res.overview,
      providesTags: ["Overview"],
    }),
    getSalesReport: builder.query({
      query: () => "/analytics/sales-report",
      transformResponse: (res) => res.salesReport,
    }),
    getRevenue: builder.query({
      query: () => "/analytics/revenue",
      transformResponse: (res) => res.revenue,
    }),
    getLatestOrders: builder.query({
      query: () => "/analytics/latest-orders",
      transformResponse: (res) => res.orders,
    }),
    getTopSellers: builder.query({
      query: () => "/analytics/top-sellers",
      transformResponse: (res) => res.topSellers,
    }),
    getTopProducts: builder.query({
      query: () => "/analytics/top-products",
      transformResponse: (res) => res.topProducts,
    }),
    getPendingSellers: builder.query({
      query: () => "/analytics/pending-sellers",
      transformResponse: (res) => res.pendingSellers,
      providesTags: ["PendingSellers"],
    }),
    getPendingProducts: builder.query({
      query: () => "/analytics/pending-products",
      transformResponse: (res) => res.pendingProducts,
      providesTags: ["PendingProducts"],
    }),
    getRecentActivity: builder.query({
      query: () => "/analytics/recent-activity",
      transformResponse: (res) => res.recentActivity,
    }),

    // ===== Extended stats / charts =====
    getExtendedOverview: builder.query({
      query: () => "/stats/overview",
      transformResponse: (res) => res.extendedOverview,
      providesTags: ["ExtendedOverview"],
    }),
    getCategoryDistribution: builder.query({
      query: () => "/stats/category-distribution",
      transformResponse: (res) => res.categoryDistribution,
    }),
    getTopCategories: builder.query({
      query: () => "/stats/top-categories",
      transformResponse: (res) => res.topCategories,
    }),
    getDailyOrders: builder.query({
      query: () => "/stats/daily-orders",
      transformResponse: (res) => res.dailyOrders,
    }),

    // ===== Paginated tables =====
    getBuyersTable: builder.query({
      query: ({ page = 1, limit = 10, sort = "-createdAt" } = {}) =>
        `/tables/buyers?page=${page}&limit=${limit}&sort=${sort}`,
      providesTags: ["BuyersTable"],
    }),
    getSellersTable: builder.query({
      query: ({ page = 1, limit = 10, sort = "-createdAt", status = "" } = {}) =>
        `/tables/sellers?page=${page}&limit=${limit}&sort=${sort}${status ? `&status=${status}` : ""}`,
      providesTags: ["SellersTable"],
    }),
    getOrdersTable: builder.query({
      query: ({ page = 1, limit = 10, sort = "-createdAt", status = "", paymentStatus = "", range = "", q = "" } = {}) =>
        `/tables/orders?page=${page}&limit=${limit}&sort=${sort}&status=${status}&paymentStatus=${paymentStatus}&range=${range}&q=${q}`,
      providesTags: ["OrdersTable"],
    }),

    // ===== Search =====
    globalSearch: builder.query({
      query: (q) => `/search?q=${encodeURIComponent(q)}`,
      transformResponse: (res) => res.results,
    }),

    // ===== Notifications =====
    getNotifications: builder.query({
      query: ({ page = 1, limit = 20, unreadOnly = false } = {}) =>
        `/notifications?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`,
      providesTags: ["Notifications"],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),
    markAllNotificationsRead: builder.mutation({
      query: () => ({ url: `/notifications/read-all`, method: "PATCH" }),
      invalidatesTags: ["Notifications"],
    }),

    // ===== Activity Logs / Audit Trail =====
    getActivityLogs: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => `/activity-logs?page=${page}&limit=${limit}`,
      providesTags: ["ActivityLogs"],
    }),

    // ===== Quick Actions (optimistic where it's safe/cheap) =====
    approveSeller: builder.mutation({
      query: (id) => ({ url: `/sellers/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["PendingSellers", "SellersTable", "Overview", "ExtendedOverview"],
    }),
    rejectSeller: builder.mutation({
      query: (id) => ({ url: `/sellers/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["PendingSellers", "SellersTable", "Overview", "ExtendedOverview"],
    }),
    suspendSeller: builder.mutation({
      query: (id) => ({ url: `/sellers/${id}/suspend`, method: "PATCH" }),
      invalidatesTags: ["SellersTable", "ExtendedOverview"],
    }),
    activateSeller: builder.mutation({
      query: (id) => ({ url: `/sellers/${id}/activate`, method: "PATCH" }),
      invalidatesTags: ["SellersTable", "ExtendedOverview"],
    }),
    approveProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["PendingProducts", "Overview", "ExtendedOverview"],
    }),
    rejectProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["PendingProducts", "Overview", "ExtendedOverview"],
    }),
    deactivateProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}/deactivate`, method: "PATCH" }),
      invalidatesTags: ["PendingProducts", "ExtendedOverview"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["PendingProducts", "Overview", "ExtendedOverview"],
    }),
    generateReport: builder.mutation({
      query: (body = {}) => ({ url: `/reports/generate`, method: "POST", body }),
    }),
    sendAnnouncement: builder.mutation({
      query: (body) => ({ url: `/announcements`, method: "POST", body }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetSalesReportQuery,
  useGetRevenueQuery,
  useGetLatestOrdersQuery,
  useGetTopSellersQuery,
  useGetTopProductsQuery,
  useGetPendingSellersQuery,
  useGetPendingProductsQuery,
  useGetRecentActivityQuery,
  useGetExtendedOverviewQuery,
  useGetCategoryDistributionQuery,
  useGetTopCategoriesQuery,
  useGetDailyOrdersQuery,
  useGetBuyersTableQuery,
  useGetSellersTableQuery,
  useGetOrdersTableQuery,
  useLazyGlobalSearchQuery,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetActivityLogsQuery,
  useApproveSellerMutation,
  useRejectSellerMutation,
  useSuspendSellerMutation,
  useActivateSellerMutation,
  useApproveProductMutation,
  useRejectProductMutation,
  useDeactivateProductMutation,
  useDeleteProductMutation,
  useGenerateReportMutation,
  useSendAnnouncementMutation,
} = adminApi;
