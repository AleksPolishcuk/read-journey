"use client";

import Image from "next/image";
import styles from "./BookCard.module.css";
import type { RecommendedBook } from "@/services/booksApi";

const SIZES_RECOMMENDED_GRID =
  "(max-width: 374px) 50vw, (max-width: 767px) 160px, (max-width: 1439px) 180px, 190px";

export function BookCard({
  book,
  onOpen,
}: {
  book: RecommendedBook;
  onOpen: (id: string) => void;
}) {
  return (
    <article className={styles.card}>
      <button
        className={styles.coverBtn}
        type="button"
        onClick={() => onOpen(book._id)}
        aria-label={`Open ${book.title}`}
      >
        {book.imageUrl ? (
          <Image
            className={styles.coverImg}
            src={book.imageUrl}
            alt={book.title}
            width={190}
            height={260}
            sizes={SIZES_RECOMMENDED_GRID}
            priority={false}
          />
        ) : (
          <div className={styles.coverStub} aria-hidden="true" />
        )}
      </button>

      <p className={styles.title}>{book.title}</p>
      <p className={styles.author}>{book.author}</p>
    </article>
  );
}
