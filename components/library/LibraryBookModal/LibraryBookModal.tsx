"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./LibraryBookModal.module.css";
import { useGetBookByIdQuery } from "@/services/booksApi";
import { useModal } from "@/lib/hooks/useModal";

const SIZES_MODAL = "(max-width: 767px) 160px, 160px";

export function LibraryBookModal({
  bookId,
  onClose,
}: {
  bookId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);

  useModal(onClose);

  const onStartReading = useCallback(() => {
    router.push(`/reading?bookId=${encodeURIComponent(bookId)}`);
    onClose();
    toast.success("Let's start reading!");
  }, [router, bookId, onClose]);

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
        aria-label="Book details"
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

        {isLoading ? <p className={styles.state}>Loading...</p> : null}
        {isError ? <p className={styles.state}>Failed to load book</p> : null}

        {data ? (
          <>
            <div className={styles.media}>
              {data.imageUrl ? (
                <Image
                  className={styles.cover}
                  src={data.imageUrl}
                  alt={data.title}
                  width={160}
                  height={220}
                  sizes={SIZES_MODAL}
                />
              ) : (
                <div className={styles.coverStub} aria-hidden="true" />
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
