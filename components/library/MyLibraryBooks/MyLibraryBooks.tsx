"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import styles from "./MyLibraryBooks.module.css";
import {
  useGetOwnBooksQuery,
  useRemoveBookMutation,
  type UserBook,
} from "@/services/booksApi";

type StatusFilter = "all" | "unread" | "in-progress" | "done";
function truncate13(s: string) {
  const clean = (s ?? "").trim();
  if (clean.length <= 11) return clean;
  return clean.slice(0, 11) + "…";
}

export function MyLibraryBooks({
  onOpenBook,
}: {
  onOpenBook: (id: string) => void;
}) {
  const { data, isLoading, isError } = useGetOwnBooksQuery();
  const [removeBook] = useRemoveBookMutation();

  const [status, setStatus] = useState<StatusFilter>("all");

  const list = useMemo(() => {
    const books = data ?? [];
    if (status === "all") return books;
    return books.filter((b) => b.status === status);
  }, [data, status]);

  const onDelete = async (id: string) => {
    try {
      await removeBook(id).unwrap();
      toast.success("Deleted");
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Delete failed";
      toast.error(msg);
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>My library</h2>

        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          aria-label="Filter books"
        >
          <option value="unread">Unread</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
          <option value="all">All books</option>
        </select>
      </div>

      {isLoading ? <p className={styles.state}>Loading...</p> : null}
      {isError ? <p className={styles.state}>Failed to load library</p> : null}

      {list.length === 0 && !isLoading ? (
        <div className={styles.empty}>
          <div className={styles.emoji} aria-hidden="true">
            📚
          </div>
          <p className={styles.emptyText}>
            To start training, add some of your books or from the{" "}
            <b>recommended</b> ones
          </p>
        </div>
      ) : null}

      <div className={styles.grid}>
        {list.map((b: UserBook) => (
          <article key={b._id} className={styles.item}>
            <button
              type="button"
              className={styles.coverBtn}
              onClick={() => onOpenBook(b._id)}
              aria-label={`Open ${b.title}`}
            >
              {b.imageUrl ? (
                <img className={styles.cover} src={b.imageUrl} alt={b.title} />
              ) : (
                <div className={styles.stub} />
              )}
            </button>

            <div className={styles.metaRow}>
              <div className={styles.meta}>
                <p className={styles.name}>{truncate13(b.title)}</p>
                <p className={styles.author}>{b.author}</p>
              </div>

              <button
                type="button"
                className={styles.delete}
                onClick={() => onDelete(b._id)}
                aria-label="Delete book"
              >
                <svg width="28" height="28">
                  <use href="/sprite.svg#icon-delete_block" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
