import { setCredentials } from "../slices/authSlice";
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // data structure usually: { data: { token, user }, ... } or similar
          // Adjust based on actual backend response
          if (data?.data?.token) {
            dispatch(
              setCredentials({ token: data.data.token, user: data.data.user })
            );
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/google",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Refresh token
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    // Get current user
    getCurrentUser: builder.query({
      query: () => "/auth/me",
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
} = authApi;
