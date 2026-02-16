import type { RootState } from "@/redux/store";

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.accessToken);
