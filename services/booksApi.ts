import { api } from "./api";

export type RecommendedBook = {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
};

export type GetRecommendQuery = {
  page: number;
  perPage: number;
  title?: string;
  author?: string;
};

export type GetRecommendBooksResponse = {
  results: RecommendedBook[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type BookProgressItem = {
  startPage: number;
  startReading: string; // ISO
  finishPage?: number;
  finishReading?: string; // ISO
  speed?: number;
  status?: "active" | "inactive";
};

// export type UserBook = {
//   _id: string;
//   title: string;
//   author: string;
//   imageUrl: string | null;
//   totalPages: number;
//   status: "unread" | "in-progress" | "done";
//   progress: BookProgressItem[];
//   owner: string;
//   timeLeftToRead?: {
//     hours: number;
//     minutes: number;
//     seconds: number;
//   };
// };

export type AddNewBookRequest = {
  title: string;
  author: string;
  totalPages: number;
};

export type RemoveBookResponse = {
  id: string;
  message: string;
};

export type ReadingProgress = {
  _id?: string; 
  readingId?: string;
  startPage: number;
  startReading: string;
  finishPage?: number;
  finishReading?: string; 
  speed?: number;
  status: "active" | "inactive";
};

export type TimeLeftToRead = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type UserBook = {
  _id: string;
  title: string;
  author: string;
  imageUrl?: string | null;
  totalPages: number;
  status: "unread" | "in-progress" | "done";
  owner?: string;
  progress: ReadingProgress[];
  timeLeftToRead?: TimeLeftToRead;
};

export type StartReadingRequest = { id: string; page: number };
export type FinishReadingRequest = { id: string; page: number };
export type DeleteReadingRequest = { bookId: string; readingId: string };

export const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getRecommended: builder.query<GetRecommendBooksResponse, GetRecommendQuery>(
      {
        query: ({ page, perPage, title, author }) => ({
          url: "/books/recommend",
          method: "GET",
          params: {
            page,
            perPage,
            ...(title ? { title } : {}),
            ...(author ? { author } : {}),
          },
        }),
        providesTags: ["Recommend"],
      },
    ),

    getBookById: builder.query<UserBook, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Book", id }],
    }),

    addFromRecommended: builder.mutation<UserBook, string>({
      query: (id) => ({
        url: `/books/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Library"],
    }),

    addBook: builder.mutation<UserBook, AddNewBookRequest>({
      query: (body) => ({
        url: "/books/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Library"],
    }),

    getOwnBooks: builder.query<UserBook[], void>({
      query: () => ({
        url: "/books/own",
        method: "GET",
      }),
      providesTags: ["Library"],
    }),

    removeBook: builder.mutation<RemoveBookResponse, string>({
      query: (id) => ({
        url: `/books/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Library"],
    }),

    startReading: builder.mutation<UserBook, StartReadingRequest>({
      query: (body) => ({
        url: "/books/reading/start",
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Book", id: arg.id }],
    }),

    finishReading: builder.mutation<UserBook, FinishReadingRequest>({
      query: (body) => ({
        url: "/books/reading/finish",
        method: "POST",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Book", id: arg.id }],
    }),

    deleteReading: builder.mutation<UserBook, DeleteReadingRequest>({
      query: ({ bookId, readingId }) => ({
        url: "/books/reading",
        method: "DELETE",
        params: { bookId, readingId },
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Book", id: arg.bookId }],
    }),
  }),
});

export const {
  useGetRecommendedQuery,
  useGetBookByIdQuery,
  useAddFromRecommendedMutation,
  useAddBookMutation,
  useGetOwnBooksQuery,
  useRemoveBookMutation,
  useStartReadingMutation,
  useFinishReadingMutation,
  useDeleteReadingMutation,
} = booksApi;
