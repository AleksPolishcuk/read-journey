"use client";

import { useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./BookModal.module.css";
import {
  useAddFromRecommendedMutation,
  useGetBookByIdQuery,
} from "@/services/booksApi";
import { useModal } from "@/lib/hooks/useModal";

const SIZES_MODAL = "(max-width: 767px) 140px, 160px";

export function BookModal({
  bookId,
  onClose,
}: {
  bookId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [addBook, { isLoading: isAdding }] = useAddFromRecommendedMutation();

  useModal(onClose);

  const handleBackdropKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") onClose();
    },
    [onClose],
  );

  const onAdd = async () => {
    try {
      await addBook(bookId).unwrap();
      toast.success("Added to library");
      onClose();
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; error?: string };
      const msg = err?.data?.message ?? err?.error ?? "Add to library failed";
      toast.error(msg);
    }
  };

  const cover = data?.imageUrl ?? "";

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
              {cover ? (
                <Image
                  className={styles.cover}
                  src={cover}
                  alt={data.title}
                  width={140}
                  height={214}
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
              onClick={onAdd}
              disabled={isAdding}
            >
              Add to library
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
