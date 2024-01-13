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
            url: `product`,
            method: "GET",
            params: data,
          };
        },
        providesTags: ["Products"],
      }),
      getProductById: builder.query<any, any>({
        query: (id) => {
          return {
            url: `product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
      uploadImage: builder.mutation<any, any>({
        query: (data) => {
          return {
            url: `product/upload_image`,
            method: "PATCH",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        },
        invalidatesTags: ["Products"],
      }),
      addProduct: builder.mutation<any, any>({
        query: (data) => {
          return {
            url: `product`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Products"],
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
  useAddProductMutation,
} = productsApi;
export const productsReducer = productsApi.reducer;
export default productsApi;
