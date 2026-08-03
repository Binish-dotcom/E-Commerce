import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "../features/admin/adminApi";
import { reviewApi } from "../features/reviews/reviewApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, reviewApi.middleware),
});
