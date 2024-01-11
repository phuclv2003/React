import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NewsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getNews: builder.query<any, any>({
        query: (data) => {
          return {
            url: `news`,
            method: "GET",
            params: data,
          };
        },
        providesTags: ["News"],
      }),
      getNewsById: builder.query<any, any>({
        query: (id) => {
          return {
            url: `news/${id}`,
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      addNew: builder.mutation<any, any>({
        query: (data) => {
          return {
            url: `news`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["News"],
      }),
    };
  },
});

export const { useGetNewsQuery, useGetNewsByIdQuery, useAddNewMutation } =
  NewsApi;
export const NewsReducer = NewsApi.reducer;
export default NewsApi;
