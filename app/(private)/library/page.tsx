"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";
import { Header } from "@/components/layout/Header/Header";

import styles from "./library.module.css";

import { AddBookForm } from "@/components/library/AddBookForm/AddBookForm";
import { CreateBookSuccessModal } from "@/components/library/BookAddModal/BookAddModal";

import { MyLibraryBooks } from "@/components/library/MyLibraryBooks/MyLibraryBooks";
import { LibraryBookModal } from "@/components/library/LibraryBookModal/LibraryBookModal";

import { useGetRecommendedQuery } from "@/services/booksApi";
import type { RecommendedBook } from "@/services/booksApi";

export default function LibraryPage() {
  const { data: recData } = useGetRecommendedQuery({
    page: 1,
    perPage: 3,
  });

  const recommended = useMemo<RecommendedBook[]>(
    () => recData?.results ?? [],
    [recData],
  );

  const [createdOpen, setCreatedOpen] = useState(false);

  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const onCreated = () => {
    setCreatedOpen(true);
  };

  return (
    <AuthGuard>
      <main className={styles.page}>
        <div className={styles.container}>
          <Header />

          {/* DASHBOARD */}
          <section className={styles.dashboardCard}>
            <AddBookForm onCreated={onCreated} />

            <div className={styles.recCard}>
              <div className={styles.recHead}>
                <p className={styles.recTitle}>Recommended books</p>
              </div>

              <div className={styles.recStrip}>
                {recommended.slice(0, 3).map((b) => (
                  <button
                    key={b._id}
                    type="button"
                    className={styles.recItem}
                    onClick={() => toast(b.title)}
                    aria-label={`Recommended: ${b.title}`}
                  >
                    <img
                      className={styles.recImg}
                      src={b.imageUrl}
                      alt={b.title}
                    />
                    <p className={styles.recName}>{b.title}</p>
                    <p className={styles.recAuthor}>{b.author}</p>
                  </button>
                ))}
              </div>

              <div className={styles.recFooter}>
                <span className={styles.recFooterText}>Home</span>
                <Link
                  className={styles.recLink}
                  href="/recommended"
                  aria-label="Go to Recommended"
                >
                  <svg width="20" height="20">
                    <use href="/sprite.svg#icon-log-in" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* MY LIBRARY */}
          <MyLibraryBooks onOpenBook={(id) => setActiveBookId(id)} />
        </div>

        {createdOpen ? (
          <CreateBookSuccessModal onClose={() => setCreatedOpen(false)} />
        ) : null}

        {activeBookId ? (
          <LibraryBookModal
            bookId={activeBookId}
            onClose={() => setActiveBookId(null)}
          />
        ) : null}
      </main>
    </AuthGuard>
  );
}
