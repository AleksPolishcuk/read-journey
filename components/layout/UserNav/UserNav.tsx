"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./UserNav.module.css";

export function UserNav({
  onNavigate,
  variant = "stack",
}: {
  onNavigate?: () => void;
  variant?: "stack" | "inline";
}) {
  const pathname = usePathname();

  return (
    <nav
      className={`${styles.nav} ${variant === "inline" ? styles.inline : ""}`}
    >
      <Link
        className={`${styles.link} ${
          pathname === "/recommended" ? styles.active : ""
        }`}
        href="/recommended"
        onClick={onNavigate}
      >
        Home
      </Link>

      <Link
        className={`${styles.link} ${pathname === "/library" ? styles.active : ""}`}
        href="/library"
        onClick={onNavigate}
      >
        My library
      </Link>
    </nav>
  );
}
