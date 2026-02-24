"use client";

import Image from "next/image";
import styles from "./BookCard.module.css";
import type { RecommendedBook } from "@/services/booksApi";

const SIZES_RECOMMENDED_GRID =
  "(max-width: 374px) 50vw, (max-width: 767px) 160px, (max-width: 1439px) 180px, 190px";

const SIZES_RECOMMENDED_STRIP =
  "(max-width: 374px) 30vw, (max-width: 767px) 90px, (max-width: 1439px) 110px, 120px";

export function BookCard({
  book,
  onOpen,
  variant = "grid",
}: {
  book: RecommendedBook;
  onOpen: (id: string) => void;
  variant?: "grid" | "strip";
}) {
  const isStrip = variant === "strip";

  return (
    <article className={`${styles.card} ${isStrip ? styles.strip : ""}`}>
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
            width={isStrip ? 120 : 138}
            height={isStrip ? 107 : 208}
            sizes={isStrip ? SIZES_RECOMMENDED_STRIP : SIZES_RECOMMENDED_GRID}
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
