import { Review } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const reviewApi = createApi({
  reducerPath: "review",
  tagTypes: ["Review", "Product"],
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
    // Get product reviews
    getProductReviews: builder.query<Review[], string>({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Review" as const, id })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),

    // Add review
    addReview: builder.mutation<Review, any>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      // This invalidates the list of reviews and the specific product data
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review" as const, id: "LIST" },
        { type: "Product" as const, id: productId }, // 'Product' must be in tagTypes
      ],
    }),

    // Update review
    updateReview: builder.mutation<Review, any>({
      query: ({ id, ...body }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body,
      }),
      // FIX: Added 'as const' for better type inference and also invalidate the LIST if needed
      invalidatesTags: (result, error, { id, productId }) => [
        { type: "Review" as const, id },
        { type: "Review" as const, id: "LIST" }, // Review list may change order/content
        { type: "Product" as const, id: productId }, // Invalidate product stats
      ],
    }),

    // Delete review
    deleteReview: builder.mutation<void, { id: string; productId: string }>({
      query: ({ id }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      // FIX: Added 'as const', made the argument an object to carry productId, and invalidate Product tag
      invalidatesTags: (result, error, { id, productId }) => [
        { type: "Review" as const, id },
        { type: "Review" as const, id: "LIST" }, // Review list changes on deletion
        { type: "Product" as const, id: productId }, // Invalidate product stats
      ],
    }),
  }),
});

export const {} = reviewApi;

// import { Review } from "@/types";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const reviewApi = createApi({
//   reducerPath: "review",
//   tagTypes: ["Review"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080/api",
//     prepareHeaders: async (headers) => {
//       const token = await AsyncStorage.getItem("accessToken");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // Get product reviews
//     getProductReviews: builder.query<Review[], string>({
//       query: (productId) => `/products/${productId}/reviews`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: "Review" as const, id })),
//               { type: "Review", id: "LIST" },
//             ]
//           : [{ type: "Review", id: "LIST" }],
//     }),

//     // Add review
//     addReview: builder.mutation<
//       Review,
//       {
//         productId: string;
//         rating: number;
//         comment?: string;
//       }
//     >({
//       query: (body) => ({
//         url: "/reviews",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: (result, error, { productId }) => [
//         { type: "Review" as const, id: "LIST" },
//         { type: "Product" as const, id: productId },
//       ],
//     }),

//     // Update review
//     updateReview: builder.mutation<Review, any>({
//       query: ({ id, ...body }) => ({
//         url: `/reviews/${id}`,
//         method: "PUT",
//         body,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Review", id }],
//     }),

//     // Delete review
//     deleteReview: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/reviews/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Review", id }],
//     }),
//   }),
// });

// export const {
//   useGetProductReviewsQuery,
//   useAddReviewMutation,
//   useUpdateReviewMutation,
//   useDeleteReviewMutation,
// } = reviewApi;
