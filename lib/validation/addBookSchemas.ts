import * as Yup from "yup";

export const addBookSchema = Yup.object({
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
