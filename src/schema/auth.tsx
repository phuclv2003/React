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


export const RegisterSchema = yup.object().shape({
  mail_address: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập đúng email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
  account_name: yup
    .string()
    .required("Không được để"),
  birthday: yup.date().required("Không được để"),
  tel: yup
    .string()
    .required("Không được để"),
  user_type: yup
    .string()
    .required("Không được để"),
});

export type TLogin = yup.InferType<typeof LoginSchema>;
export type TRegister = yup.InferType<typeof RegisterSchema>;
