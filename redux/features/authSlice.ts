import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  name: string;
  email: string;
};

type AnyAuthPayload = {
  token?: string;
  refreshToken?: string;
  accessToken?: string;
  access_token?: string;
  refresh_token?: string;
  user?: User | null;
  name?: string;
  email?: string;
  _id?: string;
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
  const v = value.trim();
  if (!v || v === "undefined" || v === "null") return null;
  return v;
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

function persistTokens(
  accessToken: string | null,
  refreshToken: string | null,
) {
  if (typeof window === "undefined") return;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    setCookie("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
    clearCookie("accessToken");
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
    setCookie("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("refreshToken");
    clearCookie("refreshToken");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AnyAuthPayload>) {
      const p = action.payload;

      const accessToken =
        normalizeToken(p.token) ??
        normalizeToken(p.accessToken) ??
        normalizeToken(p.access_token);

      const refreshToken =
        normalizeToken(p.refreshToken) ?? normalizeToken(p.refresh_token);

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isHydrated = true;

      if (p.user) {
        state.user = p.user;
      } else if (p.name || p.email) {
        state.user = {
          _id: p._id ?? state.user?._id ?? "",
          name: p.name ?? state.user?.name ?? "",
          email: p.email ?? state.user?.email ?? "",
        };
      }

      persistTokens(accessToken, refreshToken);
    },

    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload ?? null;
    },

    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isHydrated = true;
      persistTokens(null, null);
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
