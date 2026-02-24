"use client";

import { useCallback } from "react";
import Image from "next/image";
import styles from "./BookAddModal.module.css";
import { useModal } from "@/lib/hooks/useModal";

const SIZES_GOOD = "(max-width: 767px) 54px, 54px";

export function CreateBookSuccessModal({ onClose }: { onClose: () => void }) {
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
        aria-label="Book added successfully"
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg width="22" height="22" aria-hidden="true">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        <div className={styles.icon} aria-hidden="true">
          <Image
            src="/images/good@2x.png"
            alt=""
            width={54}
            height={54}
            sizes={SIZES_GOOD}
            priority
          />
        </div>

        <h3 className={styles.title}>Good job</h3>
        <p className={styles.text}>
          The book was added to your library. You can start reading anytime.
        </p>
      </div>
    </div>
  );
}
