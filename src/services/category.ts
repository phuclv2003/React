import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryRequest, TCategory } from "../schema/category";

const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1/category/`,
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
      getCategory: builder.query<CategoryRequest, TCategory>({
        query: (cate) => {
          return {
            url: ``,
            method: "GET",
            params: cate,
          };
        },
        providesTags: ["Category"],
      }),
    };
  },
});

export const { useGetCategoryQuery } = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
