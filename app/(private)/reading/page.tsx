// app/reading/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";
import { Header } from "@/components/layout/Header/Header";

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

export default function ReadingPage() {
  const sp = useSearchParams();
  const bookId = sp.get("bookId") ?? "";

  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  });

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
      <main className={styles.page}>
        <div className={styles.container}>
          <Header />

          <section className={styles.dashboardCard}>
            {isLoading ? <p className={styles.state}>Loading...</p> : null}
            {isError ? (
              <p className={styles.state}>Failed to load book</p>
            ) : null}

            {book ? (
              <>
                <AddReadingForm
                  maxPages={maxPages}
                  isActive={isActive}
                  isSubmitting={isStarting || isFinishing}
                  onSubmitPage={onSubmitPage}
                />

                <Details
                  mode={mode}
                  onChangeMode={setMode}
                  book={book}
                  totalPages={book.totalPages}
                />
              </>
            ) : null}
          </section>

          {book ? (
            <MyBook book={book} isActive={isActive} activeEntry={activeEntry} />
          ) : null}
        </div>

        {readModalOpen ? (
          <BookReadModal onClose={() => setReadModalOpen(false)} />
        ) : null}
      </main>
    </AuthGuard>
  );
}
