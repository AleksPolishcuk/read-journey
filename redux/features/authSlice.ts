import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/services/authApi";

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

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  const parts = document.cookie.split(";").map((p) => p.trim());
  const found = parts.find((p) => p.startsWith(`${name}=`));
  if (!found) return null;
  const raw = found.slice(name.length + 1);
  try {
    return normalizeToken(decodeURIComponent(raw));
  } catch {
    return normalizeToken(raw);
  }
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

        if (accessToken) setCookie("accessToken", accessToken);
        else clearCookie("accessToken");

        if (refreshToken) setCookie("refreshToken", refreshToken);
        else clearCookie("refreshToken");
      }
    },

    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload ?? null;
    },

    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isHydrated = true;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        clearCookie("accessToken");
        clearCookie("refreshToken");
      }
    },

    hydrateAuth(state) {
      if (typeof window !== "undefined") {
        const lsAccess = normalizeToken(localStorage.getItem("accessToken"));
        const lsRefresh = normalizeToken(localStorage.getItem("refreshToken"));

        const ckAccess = readCookie("accessToken");
        const ckRefresh = readCookie("refreshToken");

        state.accessToken = lsAccess ?? ckAccess;
        state.refreshToken = lsRefresh ?? ckRefresh;
      }

      state.isHydrated = true;
    },
  },
});

export const { setCredentials, setUser, clearAuth, hydrateAuth } =
  authSlice.actions;

export default authSlice.reducer;
