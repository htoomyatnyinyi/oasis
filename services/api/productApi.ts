import { PaginationParams, Product, ProductResponse } from "@/types";
import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, PaginationParams>({
      query: ({ page = 1, limit = 10, category, search, sort }) => ({
        url: "/products",
        params: { page, limit, category, search, sort },
      }),
      transformResponse: (response: { data: ProductResponse }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // Get single product
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: { data: Product }) => response.data,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Get featured products
    getFeaturedProducts: builder.query<Product[], number>({
      query: (limit = 8) => `/products/featured?limit=${limit}`,
      transformResponse: (response: { data: Product[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: "FEATURED" },
            ]
          : [{ type: "Product" as const, id: "FEATURED" }],
    }),

    // Get related products
    getRelatedProducts: builder.query<Product[], string>({
      query: (productId) => `/products/${productId}/related`,
      transformResponse: (response: { data: Product[] }) => response.data,
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: `RELATED-${id}` },
            ]
          : [{ type: "Product" as const, id: `RELATED-${id}` }],
    }),

    // Search products
    searchProducts: builder.query<Product[], string>({
      query: (query) => `/products/search?q=${query}`,
      transformResponse: (response: { data: Product[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: "SEARCH" },
            ]
          : [{ type: "Product" as const, id: "SEARCH" }],
    }),

    // Get product categories
    getCategories: builder.query<string[], void>({
      query: () => "/products/categories",
      transformResponse: (response: { data: string[] }) => response.data,
    }),

    // Admin: Create product
    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Product }) => response.data,
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // Admin: Update product
    updateProduct: builder.mutation<Product, any>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { data: Product }) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    // Admin: Delete product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
  useGetRelatedProductsQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
