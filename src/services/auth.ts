import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLogin } from "../schema/auth";


const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl:  `http://localhost:8000/api/v1/oauth/`,
  }),
  endpoints(builder) {
    return {
      login: builder.mutation<TLogin, Partial<TLogin>>({
        query: (user) => {
          return {
            url: "login",
            method: "POST",
            body: user,
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
