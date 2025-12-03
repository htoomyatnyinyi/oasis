import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { Order, PaymentIntent } from "../types";
import { Order } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["Order", "Cart"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation<Order, any>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),

    // Get user orders
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    // Get order by ID
    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Create payment intent
    createPaymentIntent: builder.mutation<any, any>({
      //< PaymentIntent,
      // {
      //   orderId: string;
      // }>
      query: (body) => ({
        url: "/orders/payment-intent",
        method: "POST",
        body,
      }),
    }),

    // Cancel order
    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Track order
    trackOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}/track`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  // useCreateOrderMutation,
  // useGetOrdersQuery,
  // useGetOrderByIdQuery,
  // useCreatePaymentIntentMutation,
  // useCancelOrderMutation,
  // useTrackOrderQuery,
} = orderApi;
