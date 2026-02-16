import React from "react";
import styles from "./AuthPanel.module.css";

export function AuthPanel({ children }: { children: React.ReactNode }) {
  return <section className={styles.card}>{children}</section>;
}
