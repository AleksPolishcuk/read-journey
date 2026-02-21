"use client";

import styles from "./UserBar.module.css";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectUser } from "@/redux/features/selectors";

function getInitial(name?: string | null) {
  const s = (name ?? "").trim();
  return s ? s[0].toUpperCase() : "U";
}

export function UserBar({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const user = useAppSelector(selectUser);
  const name = user?.name ?? "User";

  return (
    <div
      className={`${styles.bar} ${variant === "compact" ? styles.compact : ""}`}
    >
      <div className={styles.avatar} aria-hidden="true">
        {getInitial(name)}
      </div>

      <span className={styles.name} title={name}>
        {name}
      </span>
    </div>
  );
}
