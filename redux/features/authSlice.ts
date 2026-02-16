import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "@/services/authApi";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },

    clearAuth(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },

    hydrateAuth(state) {
      if (typeof window === "undefined") return;

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
    },
  },
});

export const { setCredentials, clearAuth, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
