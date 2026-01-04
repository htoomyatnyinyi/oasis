import { Order } from "@/types";
import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, any>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Order }) => response.data,
      invalidatesTags: ["Order", "Cart"],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: { data: Order[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),

    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: { data: Order }) => response.data,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createPaymentIntent: builder.mutation<any, any>({
      query: (body) => ({
        url: "/orders/payment-intent",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),

    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "POST",
      }),
      transformResponse: (response: { data: Order }) => response.data,
      invalidatesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    trackOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}/track`,
      transformResponse: (response: { data: Order }) => response.data,
      providesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreatePaymentIntentMutation,
  useCancelOrderMutation,
  useTrackOrderQuery,
} = orderApi;
