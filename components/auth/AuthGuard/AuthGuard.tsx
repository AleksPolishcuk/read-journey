"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { hydrateAuth, clearAuth, setUser } from "@/redux/features/authSlice";
import { selectIsAuth, selectIsHydrated } from "@/redux/features/selectors";
import { useGetCurrentUserQuery } from "@/services/authApi";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const isHydrated = useAppSelector(selectIsHydrated);

  useEffect(() => {
    if (!isHydrated) dispatch(hydrateAuth());
  }, [dispatch, isHydrated]);

  const me = useGetCurrentUserQuery(undefined, {
    skip: !isHydrated || !isAuth,
  });

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuth) router.replace("/");
  }, [isHydrated, isAuth, router]);

  useEffect(() => {
    if (me.data) dispatch(setUser(me.data));
  }, [dispatch, me.data]);

  useEffect(() => {
    if (!me.isError) return;
    const status = (me.error as any)?.status;
    if (status === 401 || status === 403) {
      dispatch(clearAuth());
      router.replace("/");
    }
  }, [dispatch, me.isError, me.error, router]);

  if (!isHydrated) return null;
  if (!isAuth) return null;

  return <>{children}</>;
}
