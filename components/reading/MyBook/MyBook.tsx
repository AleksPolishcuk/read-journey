"use client";

import Image from "next/image";
import styles from "./MyBook.module.css";
import type { UserBook, ReadingProgress } from "@/services/booksApi";

function formatLeft(t?: { hours: number; minutes: number; seconds: number }) {
  if (!t) return "";
  const h = t.hours ?? 0;
  const m = t.minutes ?? 0;
  return `${h} hours and ${m} minutes left`;
}

const SIZES_MYBOOK = "(max-width: 767px) 146px, 160px";

export function MyBook({
  book,
  isActive,
}: {
  book: UserBook;
  isActive: boolean;
  activeEntry?: ReadingProgress;
}) {
  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <h2 className={styles.title}>My reading</h2>
        {book.timeLeftToRead ? (
          <span className={styles.left}>{formatLeft(book.timeLeftToRead)}</span>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.media}>
          {book.imageUrl ? (
            <Image
              className={styles.cover}
              src={book.imageUrl}
              alt={book.title}
              width={146}
              height={220}
              sizes={SIZES_MYBOOK}
            />
          ) : (
            <div className={styles.stub} aria-hidden="true" />
          )}
        </div>

        <p className={styles.name}>{book.title}</p>
        <p className={styles.author}>{book.author}</p>

        <div className={styles.indicatorWrap} aria-hidden="true">
          <div
            className={`${styles.indicator} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.inner} />
          </div>
        </div>
      </div>
    </section>
  );
}
