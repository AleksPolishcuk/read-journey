"use client";

import { useMemo } from "react";
import toast from "react-hot-toast";
import styles from "./Diary.module.css";
import type { UserBook, ReadingProgress } from "@/services/booksApi";
import { useDeleteReadingMutation } from "@/services/booksApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function minutesBetween(startIso: string, finishIso?: string): number {
  const start = new Date(startIso).getTime();
  const end = finishIso ? new Date(finishIso).getTime() : Date.now();
  return Math.max(0, Math.round((end - start) / 60_000));
}

export function Diary({
  book,
  totalPages,
}: {
  book: UserBook;
  totalPages: number;
}) {
  const [del, { isLoading }] = useDeleteReadingMutation();

  const entries = useMemo(() => {
    const list = book.progress ?? [];
    return list
      .filter(
        (p) => p.status === "inactive" && typeof p.finishPage === "number",
      )
      .slice()
      .reverse();
  }, [book.progress]);

  const onDelete = async (p: ReadingProgress) => {
    const readingId = p._id;
    if (!readingId) {
      toast.error("Reading entry id is missing");
      return;
    }
    try {
      await del({ bookId: book._id, readingId }).unwrap();
      toast.success("Deleted");
    } catch (e: unknown) {
      const err = e as { data?: { message?: string }; error?: string };
      const msg = err?.data?.message ?? err?.error ?? "Delete failed";
      toast.error(msg);
    }
  };

  if (!entries.length) {
    return <p className={styles.empty}>No reading entries yet</p>;
  }

  return (
    <ul className={styles.list}>
      {entries.map((p, idx) => {
        const finish = p.finishPage ?? 0;
        const percent = totalPages
          ? Math.min(100, (finish / totalPages) * 100)
          : 0;
        const mins = minutesBetween(p.startReading, p.finishReading);
        const pagesRead = Math.max(0, (p.finishPage ?? 0) - p.startPage);
        const isLast = idx === entries.length - 1;

        return (
          <li
            key={p._id ?? `${p.startReading}-${p.startPage}`}
            className={styles.item}
          >
            <div className={styles.tl} aria-hidden="true">
              <div className={styles.square} />
              <div
                className={`${styles.line} ${isLast ? styles.lineLast : ""}`}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.rowTop}>
                <span className={styles.date}>
                  {formatDate(p.startReading)}
                </span>
                <span className={styles.pagesRight}>{pagesRead} pages</span>
              </div>
              <div className={styles.rowMid}>
                <div className={styles.percentBlock}>
                  <span className={styles.percent}>{percent.toFixed(1)}%</span>
                  <span className={styles.mins}>{mins} minutes</span>
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.rightTop}>
                <div className={styles.schedule} aria-hidden="true" />
                <button
                  type="button"
                  className={styles.trash}
                  onClick={() => onDelete(p)}
                  disabled={isLoading || !p._id}
                  aria-label="Delete reading entry"
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use href="/sprite.svg#icon-trash-2" />
                  </svg>
                </button>
              </div>
              <div className={styles.speed}>
                {typeof p.speed === "number" ? `${p.speed} pages per hour` : ""}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
