import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/index";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token = state.auth.token;

    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
