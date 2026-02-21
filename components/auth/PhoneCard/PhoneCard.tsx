"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PhoneCard.module.css";

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(w: number): Viewport {
  if (w >= 1440) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

export function PhonePreview() {
  const [vp, setVp] = useState<Viewport | null>(null);

  useEffect(() => {
    const onResize = () => setVp(getViewport(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // щоб не було гідраційних глічів — рендеримо після mount
  if (!vp) return null;

  // ✅ tablet: PhonePreview НЕ рендериться
  if (vp === "tablet") return null;

  // ✅ mobile/desktop: різні картинки (і @2x)
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
          // важливо для правильного підбору зображення під viewport
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
