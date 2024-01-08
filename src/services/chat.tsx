import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChatWithAdminResponse, SendMessage } from "../schema/chat";

const chatApi = createApi({
  reducerPath: "chat",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1/chat_with_admin/`,
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
      chatWithAdmin: builder.query<ChatWithAdminResponse[], Partial<number>>({
        query: (id) => {
          return {
            url: `${id}`,
            method: "GET",
          };
        },
        providesTags: ["Chat"],
      }),
      sendMessage: builder.mutation<any, Partial<SendMessage>>({
        query: (chat) => {
          return {
            url: "send_message",
            method: "POST",
            body: chat,
          };
        },
        invalidatesTags: ["Chat"],
      }),
    };
  },
});

export const { useChatWithAdminQuery, useSendMessageMutation } = chatApi;
export const chatReducer = chatApi.reducer;
export default chatApi;
