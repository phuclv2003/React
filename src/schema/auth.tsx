import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  mail_address: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập đúng email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
});

export const ResLoginSchema = yup.object().shape({
  access_token: yup
    .string().required(),
  refresh_token: yup
    .string().required(),
  token_type: yup
    .string().required(),
});

export const RegisterSchema = yup.object().shape({
  mail_address: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập đúng email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
  account_name: yup.string().required("Không được để"),
  birthday: yup.string().required("Không được để"),
  tel: yup.string().required("Không được để"),
  user_type: yup.string().required("Không được để"),
});

export type TLogin = yup.InferType<typeof LoginSchema>;
export type TResLoginSchema = yup.InferType<typeof ResLoginSchema>;

export type TRegister = yup.InferType<typeof RegisterSchema>;

const registerRequestSchema = yup.object({
  access_token: yup.string().required(),
  refresh_token: yup.string().required(),
  token_type: yup.string().required(),
});

export type RegisterRequest = yup.InferType<typeof registerRequestSchema>;

const validate_emailSchema = yup.object({
  mail_address: yup.string().required(),
});

export type ValidateEmail = yup.InferType<typeof validate_emailSchema>;

const validate_emailRequestSchema = yup.object({
  detail: yup.string().required(),
  status: yup.number().required(),
});

export type ValidateEmailRequest = yup.InferType<
  typeof validate_emailRequestSchema
>;
