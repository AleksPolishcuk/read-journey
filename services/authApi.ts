import { api } from "./api";

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  _id?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/users/signin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/users/current",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    refreshToken: builder.query<{ token: string; refreshToken: string }, void>({
      query: () => ({
        url: "/users/current/refresh",
        method: "GET",
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/signout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenQuery,
} = authApi;
