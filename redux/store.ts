// app/store.js
import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlice";
import { apiSlice } from "./slice/apiSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer from the API slice
    [apiSlice.reducerPath]: apiSlice.reducer,
    // ... other reducers
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional: Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
