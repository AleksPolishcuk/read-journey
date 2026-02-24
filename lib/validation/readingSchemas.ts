import * as Yup from "yup";

export const createReadingSchema = (maxPages: number) =>
  Yup.object({
    page: Yup.number()
      .transform((value, originalValue) => {
        if (
          originalValue === "" ||
          originalValue === null ||
          originalValue === undefined
        ) {
          return NaN;
        }
        return Number(originalValue);
      })
      .typeError("Page must be a number")
      .integer("Page must be an integer")
      .min(1, "Min page is 1")
      .max(maxPages, `Max page is ${maxPages}`)
      .required("Page is required"),
  });
