import React from "react";
import styles from "./AuthCard.module.css";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.stack}>{children}</div>
    </main>
  );
}
