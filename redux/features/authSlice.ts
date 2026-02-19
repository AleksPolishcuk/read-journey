import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/services/authApi";

/**
 * Підтримуємо різні назви токенів з backend:
 * - accessToken | access_token | token
 * - refreshToken | refresh_token
 */
type AnyAuthPayload = {
  accessToken?: string;
  access_token?: string;
  token?: string;

  refreshToken?: string;
  refresh_token?: string;

  user?: User | null;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isHydrated: false,
};

function normalizeToken(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value) return null;
  if (value === "undefined") return null;
  if (value === "null") return null;
  return value;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AnyAuthPayload>) {
      const payload = action.payload;

      const accessToken =
        normalizeToken(payload.accessToken) ??
        normalizeToken(payload.access_token) ??
        normalizeToken(payload.token);

      const refreshToken =
        normalizeToken(payload.refreshToken) ??
        normalizeToken(payload.refresh_token);

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = payload.user ?? null;
      state.isHydrated = true;

      if (typeof window !== "undefined") {
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        else localStorage.removeItem("accessToken");

        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        else localStorage.removeItem("refreshToken");
      }
    },

    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isHydrated = true;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },

    hydrateAuth(state) {
      if (typeof window !== "undefined") {
        const accessToken = normalizeToken(localStorage.getItem("accessToken"));
        const refreshToken = normalizeToken(
          localStorage.getItem("refreshToken"),
        );

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }

      state.isHydrated = true;
    },
  },
});

export const { setCredentials, clearAuth, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
