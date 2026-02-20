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

function minutesBetween(aIso: string, bIso?: string) {
  if (!bIso) return 0;
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  return Math.max(0, Math.round((b - a) / 60000));
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
    const readingId = p._id ?? p.readingId ?? p.startReading;
    try {
      await del({ bookId: book._id, readingId }).unwrap();
      toast.success("Deleted");
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Delete failed";
      toast.error(msg);
    }
  };

  if (!entries.length) {
    return <p className={styles.empty}>No reading entries yet</p>;
  }

  return (
    <ul className={styles.list}>
      {entries.map((p) => {
        const finish = p.finishPage ?? 0;
        const percent = totalPages
          ? Math.min(100, (finish / totalPages) * 100)
          : 0;
        const mins = minutesBetween(p.startReading, p.finishReading);
        const pagesRead = Math.max(0, (p.finishPage ?? 0) - p.startPage);

        return (
          <li
            key={p._id ?? p.readingId ?? p.startReading}
            className={styles.item}
          >
            <div className={styles.left}>
              <div className={styles.rowTop}>
                <span className={styles.date}>
                  {formatDate(p.startReading)}
                </span>
                <span className={styles.pagesRight}>{pagesRead} pages</span>
              </div>

              <div className={styles.rowMid}>
                <span className={styles.percent}>{percent.toFixed(1)}%</span>
                <span className={styles.mins}>{mins} minutes</span>
              </div>

              <div className={styles.rowBot}>
                <span className={styles.speed}>
                  {typeof p.speed === "number"
                    ? `${p.speed} pages per hour`
                    : ""}
                </span>

                <button
                  type="button"
                  className={styles.trash}
                  onClick={() => onDelete(p)}
                  disabled={isLoading}
                  aria-label="Delete reading entry"
                >
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-trash-2" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.barWrap} aria-hidden="true">
              <div className={styles.barBg}>
                <div
                  className={styles.barFill}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
