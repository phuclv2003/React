import * as yup from "yup";


export const sendMessageSchema = yup.object({
  message: yup.string().required(),
  account_id: yup.number().required(),
});

export type SendMessage = yup.InferType<typeof sendMessageSchema>;

const chatWithAdminResponseSchema = yup.object({
  sent_account_id: yup.number().required(),
  message: yup.number().required(),
  id: yup.number().required(),
  status: yup.string().required(),
  is_delete: yup.boolean().required(),
  account_id: yup.number().required(),
});

export type ChatWithAdminResponse = yup.InferType<
  typeof chatWithAdminResponseSchema
>;