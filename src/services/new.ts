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
    };
  },
});

export const { useGetNewsQuery, useGetNewsByIdQuery } = NewsApi;
export const NewsReducer = NewsApi.reducer;
export default NewsApi;
