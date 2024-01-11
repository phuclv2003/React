import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "Orders",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1/orders/`,
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
      getOrder: builder.query<any, any>({
        query: (order) => ({
          url: ``,
          method: "GET",
          params: order,
        }),
        providesTags: ["Orders"],
      }),
      getOrderById: builder.query<any, number>({
        query: (id) => ({
          url: `${id}`,
          method: "GET",
        }),
        providesTags: ["Orders"],
      }),
      addOrder: builder.mutation<any, any>({
        query: (order) => ({
          url: ``,
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["Orders"],
      }),
      postPayMent: builder.mutation<any, any>({
        query: (order) => ({
          url: `payment`,
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["Orders"],
      }),
      paymentReturn: builder.query<any, any>({
        query: (data) => ({
          url: `payment_return`,
          method: "GET",
          params: data,
        }),
        providesTags: ["Orders"],
      })
    };
  },
});

export const {
  useGetOrderQuery,
  useAddOrderMutation,
  usePostPayMentMutation,
  usePaymentReturnQuery,
  useGetOrderByIdQuery
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
