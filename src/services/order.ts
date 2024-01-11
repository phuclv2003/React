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
        query: (data) => {
          return {
            url: "",
            method: "GET",
            params: data,
          };
        },
        providesTags: ["Orders"],
      }),
      addOrder: builder.mutation<any, any>({
        query: (order) => ({
          url: ``,
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["Orders"],
      })
    };
  },
});

export const {
  useGetOrderQuery,
  useAddOrderMutation,
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
