"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import {
  hydrateAuth,
  clearAuth,
  setCredentials,
  setUser,
} from "@/redux/features/authSlice";
import { selectIsAuth, selectIsHydrated } from "@/redux/features/selectors";
import { useGetCurrentUserQuery } from "@/services/authApi";
import type { User } from "@/redux/features/authSlice";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const isHydrated = useAppSelector(selectIsHydrated);

  useEffect(() => {
    if (!isHydrated) dispatch(hydrateAuth());
  }, [dispatch, isHydrated]);

  const {
    data: currentUser,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    skip: !isHydrated || !isAuth,
  });

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuth) router.replace("/");
  }, [isHydrated, isAuth, router]);

  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.token || currentUser.refreshToken) {
      dispatch(setCredentials(currentUser));
    }

    const user: User = {
      _id: currentUser._id ?? "",
      name: currentUser.name ?? "",
      email: currentUser.email ?? "",
    };
    dispatch(setUser(user));
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (!isError) return;
    const status = (error as { status?: number })?.status;
    if (status === 401 || status === 403) {
      dispatch(clearAuth());
      router.replace("/");
    }
  }, [dispatch, isError, error, router]);

  if (!isHydrated) return null;
  if (!isAuth) return null;

  return <>{children}</>;
}
