"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";
import { PageShell } from "@/components/common/PageShell/PageShell";
import { Container } from "@/components/common/Container/Container";

import styles from "./library.module.css";

import { AddBookForm } from "@/components/library/AddBookForm/AddBookForm";
import { CreateBookSuccessModal } from "@/components/library/BookAddModal/BookAddModal";
import { MyLibraryBooks } from "@/components/library/MyLibraryBooks/MyLibraryBooks";
import { LibraryBookModal } from "@/components/library/LibraryBookModal/LibraryBookModal";
import { BookCard } from "@/components/recommended/BookCard/BookCard";
import { BookModal } from "@/components/recommended/BookModal/BookModal";
import {
  useGetRecommendedQuery,
  type RecommendedBook,
} from "@/services/booksApi";

const SIZES_REC_STRIP =
  "(max-width: 374px) 30vw, (max-width: 767px) 90px, (max-width: 1439px) 110px, 120px";

export default function LibraryPage() {
  const { data: recData } = useGetRecommendedQuery({ page: 1, perPage: 3 });

  const recommended = useMemo<RecommendedBook[]>(
    () => recData?.results ?? [],
    [recData],
  );

  const [createdOpen, setCreatedOpen] = useState(false);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeRecommendedId, setActiveRecommendedId] = useState<string | null>(
    null,
  );

  const onCreated = () => setCreatedOpen(true);

  return (
    <AuthGuard>
      <PageShell className={styles.page}>
        <Container>
          <div className={styles.stack}>
            {/* LEFT: dashboard */}
            <section className={styles.dashboardCard}>
              <div className={styles.dashboardGrid}>
                <div className={styles.formCol}>
                  <AddBookForm onCreated={onCreated} />
                </div>

                <div className={styles.recCol}>
                  <div className={styles.recCard}>
                    <div className={styles.recHead}>
                      <p className={styles.recTitle}>Recommended books</p>
                    </div>

                    <div className={styles.recStrip}>
                      {recommended.slice(0, 3).map((b) => (
                        <BookCard
                          key={b._id}
                          book={b}
                          variant="strip"
                          onOpen={(id) => setActiveRecommendedId(id)}
                        />
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
                </div>
              </div>
            </section>

            <MyLibraryBooks onOpenBook={(id) => setActiveBookId(id)} />
          </div>
        </Container>

        {createdOpen ? (
          <CreateBookSuccessModal onClose={() => setCreatedOpen(false)} />
        ) : null}

        {activeBookId ? (
          <LibraryBookModal
            bookId={activeBookId}
            onClose={() => setActiveBookId(null)}
          />
        ) : null}

        {activeRecommendedId ? (
          <BookModal
            bookId={activeRecommendedId}
            onClose={() => setActiveRecommendedId(null)}
          />
        ) : null}
      </PageShell>
    </AuthGuard>
  );
}
