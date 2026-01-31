import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:8080/api";

// const BASE_URL="http://192.168.137.7:8080/api"
const BASE_URL = "http://192.168.1.143:8080/api";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Product",
    "Cart",
    "Order",
    "Category",
    "Review",
    "Address",
  ],
  endpoints: () => ({}),
});
