import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  name?: string;
  email?: string;
};

export type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: typeof window === "undefined" ? null : localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user?: User | null }>,
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
