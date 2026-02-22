"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";

import styles from "./AddBookForm.module.css";
import { Input } from "@/components/common/Input/Input";
import { useAddBookMutation } from "@/services/booksApi";

type Values = {
  title: string;
  author: string;
  totalPages: number;
};

const schema = Yup.object({
  title: Yup.string()
    .min(2, "Title must contain at least 2 characters.")
    .required("Title is required"),
  author: Yup.string()
    .min(2, "Author must contain at least 2 characters.")
    .required("Author is required"),
  totalPages: Yup.number()
    .typeError("Pages must be a number")
    .min(1, "Pages must be at least 1")
    .required("Pages is required"),
});

export function AddBookForm({ onCreated }: { onCreated: () => void }) {
  const [addBook, { isLoading }] = useAddBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", author: "", totalPages: 0 },
  });

  const onSubmit = async (data: Values) => {
    try {
      await addBook({
        title: data.title.trim(),
        author: data.author.trim(),
        totalPages: Number(data.totalPages),
      }).unwrap();

      reset();
      onCreated();
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Add book failed";
      toast.error(msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.label}>Create your library:</p>

      <Input
        label="Book title"
        type="text"
        placeholder="Enter text"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="The author"
        type="text"
        placeholder="Enter text"
        error={errors.author?.message}
        {...register("author")}
      />

      <Input
        label="Number of pages"
        type="text"
        placeholder="0"
        error={errors.totalPages?.message}
        {...register("totalPages")}
      />

      <button className={styles.submit} type="submit" disabled={isLoading}>
        Add book
      </button>
    </form>
  );
}
