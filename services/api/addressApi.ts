import { Address } from "@/types";
import { apiSlice } from "./apiSlice";

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => "/addresses",
      transformResponse: (response: { data: Address[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Address" as const, id })),
              { type: "Address", id: "LIST" },
            ]
          : [{ type: "Address", id: "LIST" }],
    }),

    addAddress: builder.mutation<Address, Omit<Address, any>>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Address }) => response.data,
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),

    updateAddress: builder.mutation<Address, any>({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: { data: Address }) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: "Address", id }],
    }),

    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Address", id }],
    }),

    setDefaultAddress: builder.mutation<Address, string>({
      query: (id) => ({
        url: `/addresses/${id}/default`,
        method: "PUT",
      }),
      transformResponse: (response: { data: Address }) => response.data,
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
