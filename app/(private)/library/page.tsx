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

import { BookModal } from "@/components/recommended/BookModal/BookModal";
import { useGetRecommendedQuery } from "@/services/booksApi";
import type { RecommendedBook } from "@/services/booksApi";

const SIZES_REC_STRIP =
  "(max-width: 374px) 30vw, (max-width: 767px) 90px, (max-width: 1439px) 110px, 120px";

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
  const [activeRecommendedId, setActiveRecommendedId] = useState<string | null>(
    null,
  );

  const onCreated = () => setCreatedOpen(true);

  return (
    <AuthGuard>
      <PageShell className={styles.page}>
        <Container>
          <div className={styles.stack}>
           
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
                      onClick={() => setActiveRecommendedId(b._id)}
                      aria-label={`Open recommended: ${b.title}`}
                    >
                      <div className={styles.recImgWrap}>
                        <Image
                          className={styles.recImg}
                          src={b.imageUrl}
                          alt={b.title}
                          width={120}
                          height={107}
                          sizes={SIZES_REC_STRIP}
                        />
                      </div>

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
