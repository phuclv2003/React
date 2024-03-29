import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Refresh,
  RegisterRequest,
  TLogin,
  TRegister,
  TResLoginSchema,
  ValidateEmail,
  ValidateEmailRequest,
} from "../schema/auth";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1/oauth/`,
  }),
  endpoints(builder) {
    return {
      login: builder.mutation<TResLoginSchema, Partial<TLogin>>({
        query: (user) => {
          return {
            url: "login",
            method: "POST",
            body: user,
          };
        },
      }),
      register: builder.mutation<RegisterRequest, Partial<TRegister>>({
        query: (user) => {
          return {
            url: "register",
            method: "POST",
            body: user,
          };
        },
      }),
      validateEmail: builder.mutation<
        ValidateEmailRequest,
        Partial<ValidateEmail>
      >({
        query: (email) => {
          return {
            url: "validate_email",
            method: "POST",
            body: email,
          };
        },
      }),
      refresh: builder.mutation<RegisterRequest, Partial<Refresh>>({
        query: (token) => {
          return {
            url: "refresh",
            method: "POST",
            body: token,
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useValidateEmailMutation,
  useRefreshMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
