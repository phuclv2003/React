import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser, TUsers } from "../schema/account";

const accountApi = createApi({
  reducerPath: "account",
  tagTypes: ["Account"],
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
      getProfile: builder.query<TUser, void>({
        query: () => {
          return {
            url: "account",
            method: "GET",
          };
        },
        providesTags: ["Account"],
      }),
      getListProfile: builder.query<TUsers, void>({
        query: () => {
          return {
            url: "account/get_list",
            method: "GET",
          };
        },
        providesTags: ["Account"],
      }),
    };
  },
});

export const { useGetProfileQuery, useGetListProfileQuery } = accountApi;
export const accountReducer = accountApi.reducer;
export default accountApi;
