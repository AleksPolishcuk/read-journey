"use client";

import styles from "./BookCard.module.css";
import type { RecommendedBook } from "@/services/booksApi";

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
      >
        {book.imageUrl ? (
          <img
            className={styles.coverImg}
            src={book.imageUrl}
            alt={book.title}
          />
        ) : (
          <div className={styles.coverStub} />
        )}
      </button>

      <p className={styles.title}>{book.title}</p>
      <p className={styles.author}>{book.author}</p>
    </article>
  );
}
