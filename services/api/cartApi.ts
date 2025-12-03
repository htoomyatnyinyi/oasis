import { Cart } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cart",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // baseUrl: process.env.API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Get cart
    getCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    // Add item to cart (optimistic update example)
    // addToCart: builder.mutation<Cart, { productId: string; quantity: number }>({
    addToCart: builder.mutation<Cart, any>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        // Optimistic update
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const existingItem = draft.items.find(
              (item: any) => item.productId === productId
            );
            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              draft.items.push({
                id: `temp-${Date.now()}`,
                productId,
                quantity,
                product: { id: productId }, // Placeholder
              });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // Update cart item quantity
    updateCartItem: builder.mutation<Cart, any>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeCartItem: builder.mutation<Cart, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Apply coupon
    applyCoupon: builder.mutation<Cart, string>({
      query: (code) => ({
        url: "/cart/coupon",
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartApi;

/* 
 gemini
import { Cart } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WritableDraft } from "immer/dist/internal"; // Import for better type safety in draft

// Assume Cart type has an 'items' array, where each item has 'productId', 'quantity', etc.
// The Cart type should look something like:
// interface CartItem {
//   id: string;
//   productId: string;
//   quantity: number;
//   product: { id: string; name: string; price: number; ... }; // Example structure
//   // other properties...
// }
// interface Cart {
//   id: string;
//   items: CartItem[];
//   totalPrice: number;
//   // other properties...
// }

export const cartApi = createApi({
  reducerPath: "cart",
  tagTypes: ["Cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // baseUrl: process.env.API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Get cart
    // FIX 1: Explicitly define the return type as Cart
    getCart: builder.query<Cart, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    // Add item to cart (optimistic update example)
    addToCart: builder.mutation<Cart, { productId: string; quantity: number }>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) {
        // Optimistic update
        const patchResult = dispatch(
          // 'getCart' has no argument, so the second parameter is undefined
          cartApi.util.updateQueryData("getCart", undefined, (draft: WritableDraft<Cart>) => {
            // FIX 2: Ensure 'draft' is typed as Cart and items exist
            const existingItem = draft.items.find(
              // FIX 3: Use the correct type for item check (assuming item has productId)
              (item) => item.productId === productId 
            ); 

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              // FIX 4: Add sufficient placeholder properties to the new item 
              // to match the expected structure of CartItem for the UI to render correctly.
              // We'll need to make assumptions about the structure of a CartItem.
              draft.items.push({
                // Placeholder/temp data for optimistic update
                id: `temp-${Date.now()}-${productId}`, 
                productId,
                quantity,
                // Add required placeholder fields from your CartItem structure here:
                product: { 
                  id: productId, 
                  // Add more essential fields like name, price, etc., if needed by your UI
                } as any, // Use 'as any' if you don't want to fully define the placeholder product
                // other required fields (e.g., totalPrice, createdAt)
              });
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // Update cart item quantity
    // FIX 5: Better type the mutation arguments
    updateCartItem: builder.mutation<
      Cart, 
      { itemId: string; quantity: number }
    >({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeCartItem: builder.mutation<Cart, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // Apply coupon
    applyCoupon: builder.mutation<Cart, string>({
      query: (code) => ({
        url: "/cart/coupon",
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation, // Renamed hook from original prompt (was missing)
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartApi;
*/
