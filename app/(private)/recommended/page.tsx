"use client";

import { useMemo, useState } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";
import { Header } from "@/components/layout/Header/Header";

import styles from "./recommended.module.css";

import {
  FiltersForm,
  type FiltersValues,
} from "@/components/recommended/Filter/FiltersForm";
import { BookCard } from "@/components/recommended/BookCard/BookCard";
import { BookModal } from "@/components/recommended/BookModal/BookModal";
import { useGetRecommendedQuery } from "@/services/booksApi";
import Link from "next/link";

export default function RecommendedPage() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(2);
  const [filters, setFilters] = useState<FiltersValues>({
    title: "",
    author: "",
  });

  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const queryArgs = useMemo(
    () => ({
      page,
      perPage,
      title: filters.title.trim() || undefined,
      author: filters.author.trim() || undefined,
    }),
    [page, perPage, filters],
  );

  const { data, isLoading, isError } = useGetRecommendedQuery(queryArgs);

  const canPrev = page > 1;
  const canNext = data ? page < data.totalPages : false;

  const onApply = (values: FiltersValues) => {
    setFilters(values);
    setPage(1);
  };

  return (
    <AuthGuard>
      <main className={styles.page}>
        <div className={styles.container}>
          <Header />

          {/* DASHBOARD */}
          <section className={styles.dashboardCard}>
            <FiltersForm defaultValues={filters} onApply={onApply} />

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Start your workout</h3>

              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>1</div>
                  <p className={styles.stepText}>
                    <span className={styles.stepTitle}>
                      Create a personal library:
                    </span>{" "}
                    add the books you intend to read to it.
                  </p>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNum}>2</div>
                  <p className={styles.stepText}>
                    <span className={styles.stepTitle}>
                      Create your first workout:
                    </span>{" "}
                    define a goal, choose a period, start training.
                  </p>
                </div>
              </div>

              <div className={styles.myLibraryRow}>
                <span className={styles.myLibraryLink}>My library</span>
                <Link className={styles.myLibraryBtn} href="/library">
                  <svg width="24" height="24">
                    <use href="/sprite.svg#icon-log-in" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* BOOKS */}
          <section className={styles.booksCard}>
            <div className={styles.booksHead}>
              <h2 className={styles.booksTitle}>Recommended</h2>

              <div className={styles.pager}>
                <button
                  className={styles.pagerBtn}
                  type="button"
                  aria-label="prev"
                  disabled={!canPrev}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-bi_chevron-left" />
                  </svg>
                </button>

                <button
                  className={styles.pagerBtn}
                  type="button"
                  aria-label="next"
                  disabled={!canNext}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-bi_chevron-right" />
                  </svg>
                </button>
              </div>
            </div>

            {isLoading ? <p className={styles.state}>Loading...</p> : null}
            {isError ? (
              <p className={styles.state}>Failed to load recommended books</p>
            ) : null}

            <div className={styles.booksGrid}>
              {data?.results.map((b) => (
                <BookCard
                  key={b._id}
                  book={b}
                  onOpen={(id) => setActiveBookId(id)}
                />
              ))}
            </div>
          </section>
        </div>

        {activeBookId ? (
          <BookModal
            bookId={activeBookId}
            onClose={() => setActiveBookId(null)}
          />
        ) : null}
      </main>
    </AuthGuard>
  );
}
