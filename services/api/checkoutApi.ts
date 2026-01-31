import { apiSlice } from "./apiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckoutSummary: builder.query<any, void>({
      query: () => "/checkout/summary",
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Cart", "Address"],
    }),

    calculateTotals: builder.mutation<any, any>({
      query: (body) => ({
        url: "/checkout/calculate-totals",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),

    getShippingMethods: builder.query<any, { addressId?: string }>({
      query: ({ addressId }) => ({
        url: "/checkout/shipping-methods",
        params: { addressId },
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),

    checkoutCreateOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/checkout/create-order",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ["Order", "Cart"],
    }),

    validateCoupon: builder.mutation<any, { code: string }>({
      query: (body) => ({
        url: "/checkout/validate-coupon",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCheckoutSummaryQuery,
  useCalculateTotalsMutation,
  useGetShippingMethodsQuery,
  useCheckoutCreateOrderMutation,
  useValidateCouponMutation,
} = checkoutApi;
