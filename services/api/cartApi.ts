import { Cart } from "@/types";
import { apiSlice } from "./apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/cart",
      transformResponse: (response: { data: Cart }) => response.data,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<Cart, { productId: string; quantity: number }>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Cart }) => response.data,
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<
      Cart,
      { itemId: string; quantity: number }
    >({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      transformResponse: (response: { data: Cart }) => response.data,
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation<Cart, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: Cart }) => response.data,
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      transformResponse: (response: { data: Cart }) => response.data,
      invalidatesTags: ["Cart"],
    }),

    applyCoupon: builder.mutation<Cart, string>({
      query: (code) => ({
        url: "/cart/coupon",
        method: "POST",
        body: { code },
      }),
      transformResponse: (response: { data: Cart }) => response.data,
      invalidatesTags: ["Cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartApi;
