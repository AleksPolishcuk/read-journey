"use client";

import { useCallback } from "react";
import styles from "./BookReadModal.module.css";
import { useModal } from "@/lib/hooks/useModal";

export function BookReadModal({ onClose }: { onClose: () => void }) {
  useModal(onClose);

  const handleBackdropKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") onClose();
    },
    [onClose],
  );

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      onKeyDown={handleBackdropKeyDown}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Book finished"
      >
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22" aria-hidden="true">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        <div className={styles.icon} aria-hidden="true" />
        <h3 className={styles.title}>The book is read</h3>
        <p className={styles.text}>
          It was an exciting journey, where each page revealed new horizons, and
          the characters became inseparable friends.
        </p>
      </div>
    </div>
  );
}
