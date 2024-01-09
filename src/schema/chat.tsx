import * as yup from "yup";

export const sendMessageSchema = yup.object({
  message: yup.string().required(),
  account_id: yup.number().required(),
});

export type SendMessage = yup.InferType<typeof sendMessageSchema>;

const chatWithAdminResponseSchema = yup.object({
  sent_account_id: yup.number().required(),
  message: yup.string().required(),
  id: yup.number().required(),
  status: yup.string().required(),
  is_delete: yup.boolean(),
  account_id: yup.number().required(),
});

export type ChatWithAdminResponse = yup.InferType<
  typeof chatWithAdminResponseSchema
>;

const chatSocketSchema = yup.object({
  data: yup.object({
    chat_obj: yup.object({
      sent_account_id: yup.number().required(),
      message: yup.string().required(),
      id: yup.number().required(),
      status: yup.string().required(),
      is_deleted: yup.boolean().required(),
      account_id: yup.number().required(),
    }),
  }),
});

export type ChatSocket = yup.InferType<typeof chatSocketSchema>;

const listChatSchema = yup.object({
  data: yup.array().of(yup.object({
    notes: yup.string().nullable(),
    created_at: yup.string().required(),
    id: yup.number().required(),
    is_deleted: yup.boolean().required(),
    account_name: yup.string().required(),
    birthday: yup.string().required(),
    tel: yup.string().required(),
    mail_address: yup.string().required(),
    upload_file_path: yup.string().nullable(),
    password: yup.string().required(),
    user_type: yup.string().required(),
    is_read: yup.boolean().required(),
    chat_id: yup.number().required()
  },),)
});

export type ListChat = yup.InferType<typeof listChatSchema>;

