"use client";

import { useEffect } from "react";
import styles from "./BookReadModal.module.css";

export function BookReadModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        <div className={styles.icon} aria-hidden="true">
          📚
        </div>
        <h3 className={styles.title}>The book is read</h3>
        <p className={styles.text}>
          You finished the book. The reading progress has been saved.
        </p>
      </div>
    </div>
  );
}
