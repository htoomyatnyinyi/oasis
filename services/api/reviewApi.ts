import { Review } from "@/types";
import { apiSlice } from "./apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<Review[], string>({
      query: (productId) => `/products/${productId}/reviews`,
      transformResponse: (response: { data: Review[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Review" as const, id })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),

    addReview: builder.mutation<Review, any>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Review }) => response.data,
      invalidatesTags: (result, error, { productId }) => [
        { type: "Review" as const, id: "LIST" },
        { type: "Product" as const, id: productId },
      ],
    }),

    updateReview: builder.mutation<Review, any>({
      query: ({ id, ...body }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: { data: Review }) => response.data,
      invalidatesTags: (result, error, { id, productId }) => [
        { type: "Review" as const, id },
        { type: "Review" as const, id: "LIST" },
        { type: "Product" as const, id: productId },
      ],
    }),

    deleteReview: builder.mutation<void, { id: string; productId: string }>({
      query: ({ id }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id, productId }) => [
        { type: "Review" as const, id },
        { type: "Review" as const, id: "LIST" },
        { type: "Product" as const, id: productId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
