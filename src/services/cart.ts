import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOrder } from "../schema/order";

const cartsApi = createApi({
  reducerPath: "Carts",
  tagTypes: ["Carts"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1/cart/`,
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
      getUserListCarts: builder.query<any, TOrder>({
        query: (cart) => {
          return {
            url: "",
            method: "GET",
            params: cart,
          };
        },
        providesTags: ["Carts"],
      }),
      updateQuantityCarts: builder.mutation<any, any>({
        query: (cart) => ({
          url: ``,
          method: "PUT",
          body: cart,
        }),
        invalidatesTags: ["Carts"],
      }),
      addToCarts: builder.mutation<any, any>({
        query: (cart) => ({
          url: ``,
          method: "POST",
          body: cart,
        }),
        invalidatesTags: ["Carts"],
      }),
      removeCartsById: builder.mutation<any, any>({
        query: (cart) => {
          return {
            url: ``,
            method: "DELETE",
            params: cart,
          };
        },
        invalidatesTags: ["Carts"],
      }),
    };
  },
});

export const {
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
  useAddToCartsMutation,
  useRemoveCartsByIdMutation
} = cartsApi;
export const cartsReducer = cartsApi.reducer;
export default cartsApi;
