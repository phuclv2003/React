import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
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
      getAllProducts: builder.query<any, any>({
        query: (data) => {
          return {
            url: `product/?page_size=${data.page_size}&page=${data.page}&sort_by=${data.sort_by}`,
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
    };
  },
});

export const {
  useGetAllProductsQuery
} = productsApi;
export const productsReducer = productsApi.reducer;
export default productsApi;