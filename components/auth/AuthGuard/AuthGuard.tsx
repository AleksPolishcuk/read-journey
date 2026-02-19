"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateAuth } from "@/redux/features/authSlice";
import { selectIsAuth, selectIsHydrated } from "@/redux/features/selectors";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const isHydrated = useAppSelector(selectIsHydrated);

  useEffect(() => {
    if (!isHydrated) dispatch(hydrateAuth());
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuth) router.replace("/login");
  }, [isHydrated, isAuth, router]);

  if (!isHydrated) return null;
  if (!isAuth) return null;

  return <>{children}</>;
}
