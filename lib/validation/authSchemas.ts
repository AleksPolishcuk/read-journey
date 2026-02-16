import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must contain at least 7 characters.")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must contain at least 2 characters.")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must contain at least 7 characters.")
    .required("Password is required"),
});
