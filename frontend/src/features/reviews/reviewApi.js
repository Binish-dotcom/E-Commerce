import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/reviews";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Reviews",
    "Summary",
    "CanReview",
    "MyReviews",
    "SellerReviews",
    "AdminReviews",
    "ReportedReviews",
    "ReviewActivityLogs",
  ],
  endpoints: (builder) => ({
    // ---- Public reads ----
    getProductReviews: builder.query({
      query: ({ productId, page = 1, limit = 5, sort = "newest", verifiedOnly, rating, imagesOnly }) => {
        const params = new URLSearchParams({ page, limit, sort });
        if (verifiedOnly) params.set("verifiedOnly", "true");
        if (rating) params.set("rating", rating);
        if (imagesOnly) params.set("imagesOnly", "true");
        return `/product/${productId}?${params.toString()}`;
      },
      providesTags: (result, error, arg) => [{ type: "Reviews", id: arg.productId }],
    }),
    getRatingSummary: builder.query({
      query: (productId) => `/product/${productId}/summary`,
      transformResponse: (res) => res.summary,
      providesTags: (result, error, productId) => [{ type: "Summary", id: productId }],
    }),
    canReview: builder.query({
      query: (productId) => `/product/${productId}/can-review`,
      providesTags: (result, error, productId) => [{ type: "CanReview", id: productId }],
    }),

    // ---- Buyer writes ----
    createReview: builder.mutation({
      query: (body) => ({ url: "/", method: "POST", body }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reviews", id: arg.productId },
        { type: "Summary", id: arg.productId },
        { type: "CanReview", id: arg.productId },
        "MyReviews",
      ],
    }),
    updateReview: builder.mutation({
      query: ({ id, productId, ...body }) => ({ url: `/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reviews", id: arg.productId },
        { type: "Summary", id: arg.productId },
        "MyReviews",
      ],
    }),
    deleteReview: builder.mutation({
      query: ({ id, productId }) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reviews", id: arg.productId },
        { type: "Summary", id: arg.productId },
        { type: "CanReview", id: arg.productId },
        "MyReviews",
      ],
    }),
    toggleLikeReview: builder.mutation({
      query: ({ id, productId }) => ({ url: `/${id}/like`, method: "POST" }),
      invalidatesTags: (result, error, arg) => [{ type: "Reviews", id: arg.productId }],
    }),
    reportReview: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/${id}/report`, method: "POST", body }),
    }),

    // ---- My Reviews (buyer) ----
    getMyReviews: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/mine?page=${page}&limit=${limit}`,
      providesTags: ["MyReviews"],
    }),

    // ---- Seller ----
    getSellerReviews: builder.query({
      query: ({ page = 1, limit = 10, rating = "" } = {}) =>
        `/seller/mine?page=${page}&limit=${limit}&rating=${rating}`,
      providesTags: ["SellerReviews"],
    }),
    sellerReply: builder.mutation({
      query: ({ id, message }) => ({ url: `/${id}/reply`, method: "POST", body: { message } }),
      invalidatesTags: ["SellerReviews"],
    }),

    // ---- Admin moderation ----
    getAllReviewsAdmin: builder.query({
      query: (params = {}) => ({ url: "/admin/all", params }),
      providesTags: ["AdminReviews"],
    }),
    getReportedReviews: builder.query({
      query: (params = {}) => ({ url: "/admin/reported", params }),
      providesTags: ["ReportedReviews"],
    }),
    approveReviewAdmin: builder.mutation({
      query: (id) => ({ url: `/admin/${id}/approve`, method: "PATCH" }),
      invalidatesTags: ["AdminReviews", "ReportedReviews"],
    }),
    rejectReviewAdmin: builder.mutation({
      query: (id) => ({ url: `/admin/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["AdminReviews", "ReportedReviews"],
    }),
    togglePinReviewAdmin: builder.mutation({
      query: (id) => ({ url: `/admin/${id}/pin`, method: "PATCH" }),
      invalidatesTags: ["AdminReviews"],
    }),
    deleteReviewAdmin: builder.mutation({
      query: (id) => ({ url: `/admin/${id}`, method: "DELETE" }),
      invalidatesTags: ["AdminReviews", "ReportedReviews"],
    }),
    suspendBuyerAdmin: builder.mutation({
      query: (buyerId) => ({ url: `/admin/buyers/${buyerId}/suspend`, method: "PATCH" }),
    }),
    getReviewActivityLogs: builder.query({
      query: (params = {}) => ({ url: "/admin/activity-logs", params }),
      providesTags: ["ReviewActivityLogs"],
    }),

    // ---- Admin: review analytics ----
    getReviewOverview: builder.query({
      query: () => "/admin/analytics/overview",
      transformResponse: (res) => res.overview,
    }),
    getMostReviewedProducts: builder.query({
      query: () => "/admin/analytics/most-reviewed",
      transformResponse: (res) => res.mostReviewedProducts,
    }),
    getHighestRatedProducts: builder.query({
      query: () => "/admin/analytics/highest-rated",
      transformResponse: (res) => res.highestRatedProducts,
    }),
    getLowestRatedProducts: builder.query({
      query: () => "/admin/analytics/lowest-rated",
      transformResponse: (res) => res.lowestRatedProducts,
    }),
    getMostActiveBuyers: builder.query({
      query: () => "/admin/analytics/active-buyers",
      transformResponse: (res) => res.mostActiveBuyers,
    }),
    getProductsWithoutReviews: builder.query({
      query: () => "/admin/analytics/no-reviews",
      transformResponse: (res) => res.productsWithoutReviews,
    }),
    getMonthlyReviewTrends: builder.query({
      query: () => "/admin/analytics/monthly-trends",
      transformResponse: (res) => res.monthlyTrends,
    }),
    getReviewDistribution: builder.query({
      query: () => "/admin/analytics/distribution",
      transformResponse: (res) => res.distribution,
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useGetRatingSummaryQuery,
  useCanReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useToggleLikeReviewMutation,
  useReportReviewMutation,
  useGetMyReviewsQuery,
  useGetSellerReviewsQuery,
  useSellerReplyMutation,
  useGetAllReviewsAdminQuery,
  useGetReportedReviewsQuery,
  useApproveReviewAdminMutation,
  useRejectReviewAdminMutation,
  useTogglePinReviewAdminMutation,
  useDeleteReviewAdminMutation,
  useSuspendBuyerAdminMutation,
  useGetReviewActivityLogsQuery,
  useGetReviewOverviewQuery,
  useGetMostReviewedProductsQuery,
  useGetHighestRatedProductsQuery,
  useGetLowestRatedProductsQuery,
  useGetMostActiveBuyersQuery,
  useGetProductsWithoutReviewsQuery,
  useGetMonthlyReviewTrendsQuery,
  useGetReviewDistributionQuery,
} = reviewApi;
