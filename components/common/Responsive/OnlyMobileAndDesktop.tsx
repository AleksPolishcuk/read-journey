"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  tabletMin?: number;

  desktopMin?: number;
};
export function OnlyMobileAndDesktop({
  children,
  tabletMin = 768,
  desktopMin = 1440,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia(`(max-width: ${tabletMin - 1}px)`);
    const mqDesktop = window.matchMedia(`(min-width: ${desktopMin}px)`);

    const update = () => setShow(mqMobile.matches || mqDesktop.matches);
    update();

    mqMobile.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);

    return () => {
      mqMobile.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, [tabletMin, desktopMin]);

  if (!show) return null;
  return <>{children}</>;
}
