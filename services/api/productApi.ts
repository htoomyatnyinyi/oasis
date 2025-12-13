import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "product",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

// import { Product } from "@/types";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productApi = createApi({
//   reducerPath: "product",
//   tagTypes: ["Product"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080/api",
//     // baseUrl: process.env.API_BASE_URL,
//     // prepareHeaders: async (headers) => {
//     //   const token = await AsyncStorage.getItem("token");
//     //   // console.log(token, "at productApi getproduct");
//     //   if (token) {
//     //     headers.set("Authorization", `Bearer ${token}`);
//     //   }
//     //   return headers;
//     // },
//   }),

//   endpoints: (builder) => ({
//     getProducts: builder.query<any, any>({
//       query: () => ({
//         url: "/products",
//         providesTags: ["Product"],
//       }),

//       // query: ({ page = 1, limit = 10, category, search, sort }) => ({
//       //   url: "/products",
//       //   params: { page, limit, category, search, sort },
//       // }),

//       // // temp comment check
//       // providesTags: (result) =>
//       //   result
//       //     ? [
//       //         ...result.products.map(({ id }) => ({
//       //           type: "Product" as const,
//       //           id,
//       //         })),
//       //         { type: "Product", id: "LIST" },
//       //       ]
//       //     : [{ type: "Product", id: "LIST" }],

//       // extra
//     }),

//     // Get single product
//     getProductById: builder.query<Product, string>({
//       query: (id) => `/products/${id}`,
//       providesTags: (result, error, id) => [{ type: "Product", id }],
//     }),

//     // Get featured products
//     // getFeaturedProducts: builder.query<Product[], number>({
//     //   query: (limit = 8) => `/products/featured?limit=${limit}`,
//     //   providesTags: (result) =>
//     //     result
//     //       ? [
//     //           ...result.map(({ id }) => ({ type: "Product", id })),
//     //           { type: "Product", id: "FEATURED" },
//     //         ]
//     //       : [{ type: "Product", id: "FEATURED" }],
//     // }),

//     getFeaturedProducts: builder.query<Product[], number>({
//       query: (limit = 8) => `/products/featured?limit=${limit}`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: "Product" as const, id })),
//               { type: "Product" as const, id: "FEATURED" },
//             ]
//           : [{ type: "Product" as const, id: "FEATURED" }],
//     }),

//     // Get related productsw
//     getRelatedProducts: builder.query<Product[], string>({
//       query: (productId) => `/products/${productId}/related`,
//       providesTags: (result, error, id) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: "Product" as const, id })),
//               { type: "Product" as const, id: `RELATED-${id}` },
//             ]
//           : [{ type: "Product" as const, id: `RELATED-${id}` }],
//     }),

//     // // Get related products
//     // getRelatedProducts: builder.query<Product[], string>({
//     //   query: (productId) => `/products/${productId}/related`,
//     //   providesTags: (result, error, id) =>
//     //     result
//     //       ? [
//     //           ...result.map(({ id }) => ({ type: "Product", id })),
//     //           { type: "Product", id: `RELATED-${id}` },
//     //         ]
//     //       : [{ type: "Product", id: `RELATED-${id}` }],
//     // }),

//     // Search products
//     searchProducts: builder.query<Product[], string>({
//       query: (query) => `/products/search?q=${query}`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: "Product" as const, id })),
//               { type: "Product" as const, id: "SEARCH" },
//             ]
//           : [{ type: "Product" as const, id: "SEARCH" }],
//     }),

//     // // Search products
//     // searchProducts: builder.query<Product[], string>({
//     //   query: (query) => `/products/search?q=${query}`,
//     //   providesTags: (result) =>
//     //     result
//     //       ? [
//     //           ...result.map(({ id }) => ({ type: "Product", id })),
//     //           { type: "Product", id: "SEARCH" },
//     //         ]
//     //       : [{ type: "Product", id: "SEARCH" }],
//     // }),

//     // Get product categories
//     getCategories: builder.query<string[], void>({
//       query: () => "/products/categories",
//     }),

//     // Admin: Create product
//     createProduct: builder.mutation<Product, FormData>({
//       query: (body) => ({
//         url: "/products",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: [{ type: "Product", id: "LIST" }],
//     }),

//     // Admin: Update product
//     updateProduct: builder.mutation<Product, any>({
//       query: ({ id, data }) => ({
//         url: `/products/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
//     }),

//     // Admin: Delete product
//     deleteProduct: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Product", id }],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useGetFeaturedProductsQuery,
//   useGetRelatedProductsQuery,
//   useSearchProductsQuery,
//   useGetCategoriesQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productApi;
