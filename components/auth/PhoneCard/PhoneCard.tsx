"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PhoneCard.module.css";

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(tabletMin: number, desktopMin: number): Viewport {
  if (window.matchMedia(`(min-width: ${desktopMin}px)`).matches)
    return "desktop";
  if (window.matchMedia(`(min-width: ${tabletMin}px)`).matches) return "tablet";
  return "mobile";
}

export function PhonePreview({
  tabletMin = 768,
  desktopMin = 1440,
}: {
  tabletMin?: number;
  desktopMin?: number;
}) {
  const [vp, setVp] = useState<Viewport | null>(null);

  useEffect(() => {
    const mqTablet = window.matchMedia(`(min-width: ${tabletMin}px)`);
    const mqDesktop = window.matchMedia(`(min-width: ${desktopMin}px)`);

    const update = () => setVp(getViewport(tabletMin, desktopMin));

    update();

    mqTablet.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);

    return () => {
      mqTablet.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, [tabletMin, desktopMin]);

  if (!vp) return null;

  if (vp === "tablet") return null;

  const isDesktop = vp === "desktop";
  const src = isDesktop
    ? "/images/iPhone 15 desktop@2x.png"
    : "/images/iPhone 15 phone@2x.png";
  const width = isDesktop ? 600 : 225;
  const height = isDesktop ? 736 : 315;

  return (
    <section className={styles.card}>
      <div className={styles.media}>
        <Image
          src={src}
          alt="App preview"
          width={width}
          height={height}
          className={styles.img}
          sizes={
            isDesktop
              ? "(min-width: 1440px) 600px, 0px"
              : "(max-width: 767px) 225px, 0px"
          }
          priority
        />
      </div>
    </section>
  );
}
