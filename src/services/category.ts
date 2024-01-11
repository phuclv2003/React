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
      getByIdCategory: builder.query<any, any>({
        query: (id) => {
          return {
            url: `${id}`,
            method: "GET",
          };
        },
        providesTags: ["Category"],
      }),
      addCategory: builder.mutation<any, any>({
        query: (data) => {
          return {
            url: ``,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Category"],
      }),
    };
  },
});

export const {
  useGetCategoryQuery,
  useGetByIdCategoryQuery,
  useAddCategoryMutation,
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
