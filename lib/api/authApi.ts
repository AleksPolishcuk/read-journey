import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/api/baseQuery";

type AuthResponse = {
  token: string;
  user?: { name?: string; email?: string };
};

type RegisterBody = { name: string; email: string; password: string };
type LoginBody = { email: string; password: string };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterBody>({
      query: (body) => ({ url: "/users/signup", method: "POST", body }),
    }),
    login: builder.mutation<AuthResponse, LoginBody>({
      query: (body) => ({ url: "/users/signin", method: "POST", body }),
    }),
    logout: builder.mutation<{ message?: string }, void>({
      query: () => ({ url: "/users/signout", method: "POST" }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
