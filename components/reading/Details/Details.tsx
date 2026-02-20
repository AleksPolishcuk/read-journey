// components/reading/Details/Details.tsx
"use client";

import styles from "./Details.module.css";
import { Diary } from "@/components/reading/Diary/Diary";
import { Statistics } from "@/components/reading/Statistics/Statistics";
import type { UserBook } from "@/services/booksApi";

export function Details({
  mode,
  onChangeMode,
  book,
  totalPages,
}: {
  mode: "diary" | "stats";
  onChangeMode: (m: "diary" | "stats") => void;
  book: UserBook;
  totalPages: number;
}) {
  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>
          {mode === "diary" ? "Diary" : "Statistics"}
        </h3>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${mode === "diary" ? styles.active : ""}`}
            onClick={() => onChangeMode("diary")}
            aria-label="Diary"
          >
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-hourglass-01" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${mode === "stats" ? styles.active : ""}`}
            onClick={() => onChangeMode("stats")}
            aria-label="Statistics"
          >
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-pie-chart-02" />
            </svg>
          </button>
        </div>
      </div>

      {mode === "diary" ? (
        <Diary book={book} totalPages={totalPages} />
      ) : (
        <Statistics book={book} totalPages={totalPages} />
      )}
    </section>
  );
}
