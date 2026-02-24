"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./MyLibraryBooks.module.css";
import {
  useGetOwnBooksQuery,
  useRemoveBookMutation,
  type UserBook,
} from "@/services/booksApi";

type StatusFilter = "all" | "unread" | "in-progress" | "done";

function truncateTitle(s: string, max = 11): string {
  const clean = (s ?? "").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max) + "…";
}

const SIZES_LIBRARY_GRID =
  "(max-width: 374px) 50vw, (max-width: 767px) 160px, (max-width: 1439px) 180px, 208px";
const SIZES_EMPTY = "(max-width: 767px) 90px, (max-width: 1439px) 110px, 130px";

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
      toast.success("Book deleted");
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; error?: string };
      const msg = err?.data?.message ?? err?.error ?? "Delete failed";
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
          aria-label="Filter books by status"
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
          <div className={styles.emptyImg}>
            <Image
              src="/images/books@2x.png"
              alt=""
              width={70}
              height={70}
              sizes={SIZES_EMPTY}
              priority={false}
            />
          </div>
          <p className={styles.emptyText}>
            To start training, add{" "}
            <span className={styles.emptySpan}>some of your books</span> or{" "}
            <br />
            from the recommended ones
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
                <Image
                  className={styles.cover}
                  src={b.imageUrl}
                  alt={b.title}
                  width={208}
                  height={208}
                  sizes={SIZES_LIBRARY_GRID}
                />
              ) : (
                <div className={styles.stub} aria-hidden="true" />
              )}
            </button>

            <div className={styles.metaRow}>
              <div className={styles.meta}>
                {/* Fix #23: use truncateTitle with correct length */}
                <p className={styles.name}>{truncateTitle(b.title)}</p>
                <p className={styles.author}>{b.author}</p>
              </div>
              <button
                type="button"
                className={styles.delete}
                onClick={() => onDelete(b._id)}
                aria-label={`Delete ${b.title}`}
              >
                <svg width="28" height="28" aria-hidden="true">
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
