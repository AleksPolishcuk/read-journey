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

  const size = 168;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.wrap}>
      <div className={styles.ringWrap}>
        <svg width={size} height={size} className={styles.svg}>
          {/* base track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F1F1F"
            strokeWidth={stroke}
            fill="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#30B94D"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        <div className={styles.center}>
          <span className={styles.big}>{percent.toFixed(0)}%</span>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.dot} />
        <div className={styles.legendText}>
          <span className={styles.legendPercent}>{percent.toFixed(2)}%</span>
          <span className={styles.legendSub}>{pagesRead} pages read</span>
        </div>
      </div>
    </div>
  );
}
