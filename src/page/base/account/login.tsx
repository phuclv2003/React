import { message } from "antd";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, TLogin } from "../../../schema/auth";
import {
  useLoginMutation,
  useValidateEmailMutation,
} from "../../../services/auth";
import Breadcrumb from "../../../components/Breadcrumb";

const Login = () => {
  const [loginForm] = useLoginMutation();
  const navigate = useNavigate();
  const [validateEmail] = useValidateEmailMutation();

  const formik = useFormik<TLogin>({
    initialValues: {
      mail_address: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values: any) => {
      try {
        const resValidate = await validateEmail({
          mail_address: values.mail_address,
        });
        if ("error" in resValidate) {
          const response = await loginForm(values);
          if ("error" in response) {
            message.error("Tài khoản mật khẩu không chính xác");
          } else {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("tokenRefresh", response.data.refresh_token);
            if (response.data.user_type === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }
        } else {
          navigate("/register", {
            state: {
              mail_address: values.mail_address,
              password: values.password,
            },
          });
        }
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });
  return (
    <>
      <div className="container bg-[#edf0f3] mx-auto">
        <Breadcrumb name="Đăng nhập" />
      </div>
      <div className=" bg-[#edf0f3] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập vào tài khoản của bạn
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="mail_address"
                    name="mail_address"
                    onChange={formik.handleChange}
                    value={formik.values.mail_address}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nhập mật khẩu của bạn"
                  />
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Link
                    to="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                      alt=""
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    to="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-6 w-6"
                      src="https://www.svgrepo.com/show/506498/google.svg"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-gray-500">
              Bạn chưa có tài khoản?{" "}
              <Link to={"/register"} className="text-[#2167dd]">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
