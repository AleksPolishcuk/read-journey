"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BreakpointPerPage = {
  mobile: number;
  tablet: number;
  desktop: number;
};

function calcPerPage(cfg: BreakpointPerPage, width: number) {
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

    const mDesktop = window.matchMedia("(min-width: 1440px)");
    const mTablet = window.matchMedia("(min-width: 768px)");

    const recompute = () => {
      const width = window.innerWidth;
      const next = calcPerPage(cfgMemo, width);

      if (lastPerPageRef.current !== next) {
        lastPerPageRef.current = next;
        setPerPage(next);

        onChangeRef.current?.();
      }
    };

    recompute();

    const onMediaChange = () => recompute();

    mDesktop.addEventListener("change", onMediaChange);
    mTablet.addEventListener("change", onMediaChange);

    window.addEventListener("resize", recompute);

    return () => {
      mDesktop.removeEventListener("change", onMediaChange);
      mTablet.removeEventListener("change", onMediaChange);
      window.removeEventListener("resize", recompute);
    };
  }, [cfgMemo]);

  return perPage;
}
