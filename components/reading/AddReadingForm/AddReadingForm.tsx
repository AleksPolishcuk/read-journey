"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AddReadingForm.module.css";
import { Input } from "@/components/common/Input/Input";
import { createReadingSchema } from "@/lib/validation/readingSchemas";

type FormValues = {
  page: number;
};

export function AddReadingForm({
  maxPages,
  isActive,
  isSubmitting,
  onSubmitPage,
}: {
  maxPages: number;
  isActive: boolean;
  isSubmitting: boolean;
  onSubmitPage: (page: number) => Promise<void> | void;
}) {
  const schema = useMemo(() => createReadingSchema(maxPages), [maxPages]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),

    defaultValues: { page: "" as unknown as number },
  });

  const onSubmit = async (values: FormValues) => {
    await onSubmitPage(Number(values.page));
    reset({ page: "" as unknown as number });
  };

  return (
    <div className={styles.block}>
      <p className={styles.labelTop}>
        {isActive ? "Stop page:" : "Start page:"}
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Page number"
          type="text"
          inputMode="numeric"
          placeholder="0"
          error={errors.page?.message}
          {...register("page")}
        />
        <button className={styles.btn} type="submit" disabled={isSubmitting}>
          {isActive ? "To stop" : "To start"}
        </button>
      </form>
    </div>
  );
}
