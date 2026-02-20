import React from "react";
import { Container } from "@/components/common/Container/Container";
import { PageShell } from "@/components/common/PageShell/PageShell";
import styles from "./AuthCard.module.css";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <PageShell className={styles.page}>
      <Container>
        <div className={styles.stack}>{children}</div>
      </Container>
    </PageShell>
  );
}
