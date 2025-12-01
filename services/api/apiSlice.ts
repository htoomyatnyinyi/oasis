import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  // The base name for the slice in the Redux store
  reducerPath: "api",
  // Configure the base URL for your API
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  // Define your API endpoints here
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts", // The specific path relative to baseUrl
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
    // ... other endpoints like mutations (POST, PUT, DELETE)
  }),
});

// Export hooks for usage in functional components
// RTK Query automatically generates these based on endpoint names
export const { useGetPostsQuery, useGetPostByIdQuery } = apiSlice;
