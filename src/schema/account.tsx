import * as yup from "yup";

export const UserSchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    account_name: yup.string().required(),
    birthday: yup.string().required(),
    tel: yup.string().required(),
    mail_address: yup.string().required(),
    notes: yup.string().required(),
    upload_file_path: yup.string().required(),
    password: yup.string().required(),
    created_at: yup.string().required(),
    is_delete: yup.boolean().required(),
    user_type: yup.string().required(),
  })
  .required();

export type TUser = yup.InferType<typeof UserSchema>;

export const UsersSchema = yup
  .object()
  .shape({
    data: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          account_name: yup.string().required(),
          birthday: yup.string().required(),
          tel: yup.string().required(),
          mail_address: yup.string().required(),
          notes: yup.string().required(),
          upload_file_path: yup.string().required(),
          password: yup.string().required(),
          created_at: yup.string().required(),
          is_delete: yup.boolean().required(),
          user_type: yup.string().required(),
        })
      )
      .required(),
  })
  .required();

export type TUsers = yup.InferType<typeof UsersSchema>;
