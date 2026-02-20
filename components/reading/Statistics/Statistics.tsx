// components/reading/Statistics/Statistics.tsx
"use client";

import { useMemo } from "react";
import styles from "./Statistics.module.css";
import type { UserBook } from "@/services/booksApi";

function getMaxFinishedPage(book: UserBook) {
  const list = book.progress ?? [];
  let max = 0;
  for (const p of list) {
    if (typeof p.finishPage === "number") max = Math.max(max, p.finishPage);
  }
  // якщо є active — можна теж врахувати як поточну верхню межу (але бек може не давати finishPage)
  return max;
}

export function Statistics({
  book,
  totalPages,
}: {
  book: UserBook;
  totalPages: number;
}) {
  const { percent, pagesRead } = useMemo(() => {
    const maxFinish = getMaxFinishedPage(book);
    const pr = totalPages ? Math.min(100, (maxFinish / totalPages) * 100) : 0;
    return { percent: pr, pagesRead: maxFinish };
  }, [book, totalPages]);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.ring}
        style={{ ["--p" as any]: `${percent}` }}
        aria-label={`Progress ${percent.toFixed(0)}%`}
      >
        <div className={styles.center}>
          <span className={styles.big}>{percent.toFixed(0)}%</span>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.dot} aria-hidden="true" />
        <div className={styles.legendText}>
          <span className={styles.legendPercent}>{percent.toFixed(2)}%</span>
          <span className={styles.legendSub}>{pagesRead} pages read</span>
        </div>
      </div>
    </div>
  );
}
