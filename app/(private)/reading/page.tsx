"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";
import { PageShell } from "@/components/common/PageShell/PageShell";
import { Container } from "@/components/common/Container/Container";

import styles from "./reading.module.css";

import { AddReadingForm } from "@/components/reading/AddReadingForm/AddReadingForm";
import { Details } from "@/components/reading/Details/Details";
import { MyBook } from "@/components/reading/MyBook/MyBook";
import { BookReadModal } from "@/components/reading/BookReadModal/BookReadModal";

import {
  useGetBookByIdQuery,
  useStartReadingMutation,
  useFinishReadingMutation,
  type ReadingProgress,
} from "@/services/booksApi";

function hasFinishedEntries(progress?: ReadingProgress[]) {
  const list = progress ?? [];
  return list.some(
    (p) => p.status === "inactive" && typeof p.finishPage === "number",
  );
}

export default function ReadingPage() {
  const sp = useSearchParams();
  const bookId = sp.get("bookId") ?? "";

  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId, { skip: !bookId });

  const [startReading, { isLoading: isStarting }] = useStartReadingMutation();
  const [finishReading, { isLoading: isFinishing }] =
    useFinishReadingMutation();

  const [mode, setMode] = useState<"diary" | "stats">("diary");
  const [readModalOpen, setReadModalOpen] = useState(false);

  const activeEntry = useMemo<ReadingProgress | undefined>(() => {
    const list = book?.progress ?? [];
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i].status === "active") return list[i];
    }
    return undefined;
  }, [book]);

  const isActive = Boolean(activeEntry);
  const maxPages = book?.totalPages ?? 1;

  const hasProgress = useMemo(() => {
    if (!book) return false;
    if (isActive) return true;
    return hasFinishedEntries(book.progress);
  }, [book, isActive]);

  const onSubmitPage = async (page: number) => {
    if (!bookId) return;

    try {
      if (!isActive) {
        await startReading({ id: bookId, page }).unwrap();
        toast.success("Reading started");
        return;
      }

      const updated = await finishReading({ id: bookId, page }).unwrap();
      toast.success("Reading saved");

      if (updated.totalPages === page || updated.status === "done") {
        setReadModalOpen(true);
      }
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Request failed";
      toast.error(msg);
    }
  };

  return (
    <AuthGuard>
      <PageShell className={styles.page}>
        <Container>
          <div className={styles.stack}>
            <section className={styles.dashboardCard}>
              {isLoading ? <p className={styles.state}>Loading...</p> : null}
              {isError ? (
                <p className={styles.state}>Failed to load book</p>
              ) : null}

              {book ? (
                <div className={styles.dashboardGrid}>
                  <div className={styles.formCol}>
                    <AddReadingForm
                      maxPages={maxPages}
                      isActive={isActive}
                      isSubmitting={isStarting || isFinishing}
                      onSubmitPage={onSubmitPage}
                    />
                  </div>

                  <div className={styles.detailsCol}>
                    <Details
                      mode={mode}
                      onChangeMode={setMode}
                      book={book}
                      totalPages={book.totalPages}
                      hasProgress={hasProgress}
                    />
                  </div>
                </div>
              ) : null}
            </section>

            {book ? <MyBook book={book} isActive={isActive} /> : null}
          </div>
        </Container>

        {readModalOpen ? (
          <BookReadModal onClose={() => setReadModalOpen(false)} />
        ) : null}
      </PageShell>
    </AuthGuard>
  );
}
