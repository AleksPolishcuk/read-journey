"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BreakpointPerPage = {
  mobile: number;
  tablet: number;
  desktop: number;
};

function calcPerPage(cfg: BreakpointPerPage, width: number): number {
  if (width >= 1440) return cfg.desktop;
  if (width >= 768) return cfg.tablet;
  return cfg.mobile;
}

export function useRecommendedPerPage(
  cfg: BreakpointPerPage,
  onBreakpointChange?: () => void,
) {
  const cfgMemo = useMemo(() => cfg, [cfg.mobile, cfg.tablet, cfg.desktop]);

  const [perPage, setPerPage] = useState(() => {
    if (typeof window === "undefined") return cfgMemo.mobile;
    return calcPerPage(cfgMemo, window.innerWidth);
  });

  const lastPerPageRef = useRef(perPage);
  const onChangeRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    onChangeRef.current = onBreakpointChange;
  }, [onBreakpointChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqTablet = window.matchMedia("(min-width: 768px)");
    const mqDesktop = window.matchMedia("(min-width: 1440px)");

    const recompute = () => {
      const next = calcPerPage(cfgMemo, window.innerWidth);
      if (lastPerPageRef.current !== next) {
        lastPerPageRef.current = next;
        setPerPage(next);
        onChangeRef.current?.();
      }
    };

    recompute();

    mqTablet.addEventListener("change", recompute);
    mqDesktop.addEventListener("change", recompute);

    return () => {
      mqTablet.removeEventListener("change", recompute);
      mqDesktop.removeEventListener("change", recompute);
    };
  }, [cfgMemo]);

  return perPage;
}
