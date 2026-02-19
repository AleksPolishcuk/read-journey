"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./UserNav.module.css";

export function UserNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
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
        className={`${styles.link} ${
          pathname === "/library" ? styles.active : ""
        }`}
        href="/library"
        onClick={onNavigate}
      >
        My library
      </Link>
    </nav>
  );
}
