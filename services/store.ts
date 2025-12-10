import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApi.middleware)
      .concat(productApi.middleware),
});

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { addressApi } from "./api/addressApi";
// import { apiSlice } from "./api/apiSlice";
// import { authApi } from "./api/authApi";
// import { cartApi } from "./api/cartApi";
// import { orderApi } from "./api/orderApi";
// import { productApi } from "./api/productApi";
// import { reviewApi } from "./api/reviewApi";

// export const store = configureStore({
//   reducer: {
//     // Add the generated reducer from the API slice
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [cartApi.reducerPath]: cartApi.reducer,
//     [productApi.reducerPath]: productApi.reducer,
//     [orderApi.reducerPath]: orderApi.reducer,
//     [reviewApi.reducerPath]: reviewApi.reducer,
//     [addressApi.reducerPath]: addressApi.reducer,
//     // ... other reducers
//   },

//   // Adding the api middleware enables caching, invalidation, polling, etc.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(apiSlice.middleware)
//       .concat(authApi.middleware)
//       .concat(cartApi.middleware)
//       .concat(productApi.middleware)
//       .concat(orderApi.middleware)
//       .concat(reviewApi.middleware)
//       .concat(addressApi.middleware),
// });

// setupListeners(store.dispatch);

// // optional: Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
