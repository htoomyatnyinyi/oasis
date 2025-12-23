import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlie";
import { productApi } from "../api/productApi";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(apiSlice.middleware),
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
