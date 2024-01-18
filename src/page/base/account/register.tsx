import { message } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Link, useLocation } from "react-router-dom";
import { RegisterSchema, TRegister } from "../../../schema/auth";
import {
  useRegisterMutation,
  useValidateEmailMutation,
} from "../../../services/auth";

const Register = () => {
  const location = useLocation();

  const [registerForm] = useRegisterMutation();
  const [validateEmail] = useValidateEmailMutation();

  const formik = useFormik<TRegister>({
    initialValues: {
      mail_address: location.state?.mail_address ?? "",
      password: location.state?.password ?? "",
      account_name: "",
      birthday: "",
      tel: "",
      user_type: "user",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values: any) => {
      try {
        const resValidate = await validateEmail({
          mail_address: values.mail_address,
        });
        if ("data" in resValidate) {
          const accountNew = {
            ...values,
            birthday: dayjs(values.birthday).format("YYYY-MM-DDTHH:mm:ssZ"),
          };
          const res = await registerForm(accountNew);
          if ("data" in res) {
            message.success("Đăng ký thành công");
            await localStorage.setItem("token", res.data.access_token);
            await localStorage.setItem("tokenRefresh", res.data.refresh_token);
          }
        } else {
          message.error("Email address already exists");
        }
      } catch (error) {
        message.error("Lỗi");
      }
    },
  });

  return (
    <>
      <div className="bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản mới
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên tài khoản
                </label>
                <div className="mt-1">
                  <input
                    id="account_name"
                    name="account_name"
                    onChange={formik.handleChange}
                    value={formik.values.account_name}
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập tên tài khoản của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ngày sinh
                </label>
                <div className="mt-1">
                  <input
                    id="birthday"
                    name="birthday"
                    onChange={formik.handleChange}
                    type="date"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <div className="mt-1">
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    onChange={formik.handleChange}
                    value={formik.values.tel}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ email
                </label>
                <div className="mt-1">
                  <input
                    id="mail_address"
                    name="mail_address"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.mail_address}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Đăng ký
                </button>
              </div>
            </form>
            <div className="text-center mt-2 text-gray-500">
              Bạn đã có tài khoản?{" "}
              <Link to={"/login"} className="text-[#2167dd]">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
