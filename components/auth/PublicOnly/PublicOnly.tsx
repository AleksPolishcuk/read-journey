"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { hydrateAuth } from "@/redux/features/authSlice";
import { selectIsAuth, selectIsHydrated } from "@/redux/features/selectors";

export function PublicOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);
  const isHydrated = useAppSelector(selectIsHydrated);

  useEffect(() => {
    if (!isHydrated) dispatch(hydrateAuth());
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuth) router.replace("/recommended");
  }, [isHydrated, isAuth, router]);

  if (!isHydrated) return null;
  if (isAuth) return null;

  return <>{children}</>;
}
