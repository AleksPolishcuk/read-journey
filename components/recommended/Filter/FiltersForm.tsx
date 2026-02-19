"use client";

import { useForm } from "react-hook-form";
import styles from "./FiltersForm.module.css";

export type FiltersValues = {
  title: string;
  author: string;
};

export function FiltersForm({
  defaultValues,
  onApply,
}: {
  defaultValues: FiltersValues;
  onApply: (values: FiltersValues) => void;
}) {
  const { register, handleSubmit } = useForm<FiltersValues>({
    defaultValues,
  });

  return (
    <form className={styles.filters} onSubmit={handleSubmit(onApply)}>
      <p className={styles.filtersTitle}>Filters:</p>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Book title:</span>
        <input
          className={styles.fieldInput}
          placeholder="Enter text"
          {...register("title")}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>The author:</span>
        <input
          className={styles.fieldInput}
          placeholder="Enter text"
          {...register("author")}
        />
      </label>

      <button className={styles.applyBtn} type="submit">
        To apply
      </button>
    </form>
  );
}
