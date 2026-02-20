import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`${styles.page} ${className ?? ""}`}>{children}</main>
  );
}
