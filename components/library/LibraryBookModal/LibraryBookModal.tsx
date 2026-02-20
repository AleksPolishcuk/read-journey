"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "./LibraryBookModal.module.css";
import { useGetBookByIdQuery } from "@/services/booksApi";

export function LibraryBookModal({
  bookId,
  onClose,
}: {
  bookId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onStartReading = () => {
    router.push(`/reading?bookId=${encodeURIComponent(bookId)}`);
    onClose();
    toast("Start reading");
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
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

        {isLoading ? <p className={styles.state}>Loading...</p> : null}
        {isError ? <p className={styles.state}>Failed to load book</p> : null}

        {data ? (
          <>
            <div className={styles.media}>
              {data.imageUrl ? (
                <img
                  className={styles.cover}
                  src={data.imageUrl}
                  alt={data.title}
                />
              ) : (
                <div className={styles.coverStub} />
              )}
            </div>

            <div className={styles.info}>
              <h3 className={styles.title}>{data.title}</h3>
              <p className={styles.author}>{data.author}</p>
              <p className={styles.pages}>{data.totalPages} pages</p>
            </div>

            <button
              className={styles.btn}
              type="button"
              onClick={onStartReading}
            >
              Start reading
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
