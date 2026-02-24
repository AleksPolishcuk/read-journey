import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import { clearAuth, setCredentials } from "@/redux/features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) return result;

  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh(async (newToken: string) => {
        const retryArgs =
          typeof args === "string"
            ? args
            : {
                ...args,
                headers: {
                  ...(args.headers as Record<string, string> | undefined),
                  Authorization: `Bearer ${newToken}`,
                },
              };
        resolve(await baseQuery(retryArgs, api, extraOptions));
      });
    });
  }

  isRefreshing = true;

  const refreshToken = (api.getState() as RootState).auth.refreshToken;

  if (!refreshToken) {
    api.dispatch(clearAuth());
    isRefreshing = false;
    return result;
  }

  const refreshResult = await baseQuery(
    {
      url: "/users/current/refresh",
      method: "GET",
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
    api,
    extraOptions,
  );

  if (refreshResult.data) {
    const data = refreshResult.data as { token: string; refreshToken: string };
    api.dispatch(
      setCredentials({
        token: data.token,
        refreshToken: data.refreshToken,
      }),
    );

    onRefreshed(data.token);
    isRefreshing = false;

    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(clearAuth());
    onRefreshed("");
    isRefreshing = false;
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Recommend", "Book", "Library"],
  endpoints: () => ({}),
});
