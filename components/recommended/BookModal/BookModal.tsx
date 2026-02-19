"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./BookModal.module.css";
import {
  useAddFromRecommendedMutation,
  useGetBookByIdQuery,
} from "@/services/booksApi";

export function BookModal({
  bookId,
  onClose,
}: {
  bookId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [addBook, { isLoading: isAdding }] = useAddFromRecommendedMutation();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onAdd = async () => {
    try {
      await addBook(bookId).unwrap();
      toast.success("Added to library");
      onClose();
    } catch (e: unknown) {
      const msg =
        (typeof (e as Record<string, string | { message: string }>)?.data ===
          "object" &&
          (e as Record<string, { message: string }>)?.data?.message) ||
        (e as Record<string, string>)?.error ||
        "Add to library failed";
      toast.error(msg);
    }
  };

  const cover = data?.imageUrl ?? "";

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
              {cover ? (
                <img className={styles.cover} src={cover} alt={data.title} />
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
