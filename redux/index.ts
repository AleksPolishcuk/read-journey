import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/auth/authSlice";
import { authApi } from "@/lib/api/authApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const resetApp = () => ({ type: "app/reset" }) as const;

const appReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "app/reset") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
