import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8080/api",
    baseUrl: "http://192.168.1.118:8080/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = productApi;
