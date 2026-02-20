"use client";

import { useEffect } from "react";
import styles from "./BookAddModal.module.css";

export function CreateBookSuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg width="22" height="22">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        <div className={styles.icon} aria-hidden="true">
          👍
        </div>
        <h3 className={styles.title}>Good job</h3>
        <p className={styles.text}>
          The book was added to your library. You can start reading anytime.
        </p>
      </div>
    </div>
  );
}
