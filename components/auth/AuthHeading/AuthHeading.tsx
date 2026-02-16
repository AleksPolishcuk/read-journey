import React from "react";
import styles from "./AuthHeading.module.css";

export function AuthHeading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <svg width="48" height="18">
          <use href="/sprite.svg#icon-Logo_small" />
        </svg>
      </div>

      <h1 className={styles.title}>
        Expand your mind,
        <br />
        reading <span className={styles.muted}>a book</span>
      </h1>
    </div>
  );
}
