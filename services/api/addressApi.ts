import { Address } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const addressApi = createApi({
  reducerPath: "address",
  tagTypes: ["Address"],
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
    // Get user addresses
    getAddresses: builder.query<Address[], void>({
      query: () => "/users/addresses",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Address" as const, id })),
              { type: "Address", id: "LIST" },
            ]
          : [{ type: "Address", id: "LIST" }],
    }),

    // Add address
    addAddress: builder.mutation<Address, Omit<Address, any>>({
      query: (body) => ({
        url: "/users/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),

    // Update address
    updateAddress: builder.mutation<Address, any>({
      query: ({ id, data }) => ({
        url: `/users/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Address", id }],
    }),

    // Delete address
    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Address", id }],
    }),

    // Set default address
    setDefaultAddress: builder.mutation<Address, string>({
      query: (id) => ({
        url: `/users/addresses/${id}/default`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Address", id: "LIST" }],
    }),
  }),
});

export const {} = addressApi;
