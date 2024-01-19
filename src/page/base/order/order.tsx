import { message } from "antd";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/css/common.css";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  useAddOrderMutation,
  usePostPayMentMutation,
} from "../../../services/order";
interface Location {
  Id: string;
  Name: string;
  Districts: {
    Id: string;
    Name: string;
    Wards: {
      Id: string;
      Name: string;
    }[];
  }[];
}

interface FormValues {
  tel: string;
  city: string;
  district: string;
  ward: string;
  detailed_address: string;
}
const Order: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addOrder] = useAddOrderMutation();
  const [postPayMent] = usePostPayMentMutation();
  const [data] = useState<any>(location.state?.data);
  const [cities, setCities] = useState<Location[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<Location["Districts"]>([]);
  const [wards, setWards] = useState<Location["Districts"][0]["Wards"]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [paymentError, setPaymentError] = useState<string>("");
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.tel) {
      errors.tel = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d+$/.test(values.tel)) {
      errors.tel = "Số điện thoại chỉ được chứa số.";
    }

    if (!values.city) {
      errors.city = "Vui lòng chọn tỉnh/thành phố.";
    }

    if (!values.district) {
      errors.district = "Vui lòng chọn quận/huyện.";
    }

    if (!values.ward) {
      errors.ward = "Vui lòng chọn phường/xã.";
    }

    if (!values.detailed_address) {
      errors.detailed_address = "Vui lòng nhập địa chỉ cụ thể.";
    }

    return errors;
  };
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ IP:", error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (!location.state) {
      navigate("/cart");
    }
  }, [data, location.state, navigate]);

  const formik = useFormik<FormValues>({
    initialValues: {
      tel: "",
      city: "",
      district: "",
      ward: "",
      detailed_address: "",
    },
    validate,
    onSubmit: async (values: FormValues) => {
      try {
      } catch (error) {
        console.error("Lỗi", error);
      }
    },
  });
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };
  const subMitAddOrder = async () => {
    const formIsValid = await formik.validateForm();
    if (Object.keys(formIsValid).length === 0) {
      if (!selectedPayment) {
        setPaymentError("Vui lòng chọn phương thức thanh toán.");
        return;
      }
      setPaymentError("");
      let paymentMethod: string | undefined;

      if (selectedPayment === "6") {
        paymentMethod = "CASH";
      } else if (selectedPayment === "7") {
        paymentMethod = "VNPAY";
      }
      const items = data.products.map((product: any) => ({
        product_id: product.id,
        quantity: product.quantity,
      }));
      const receiving_location = `${formik.values.detailed_address}, ${formik.values.ward}, ${formik.values.district}, ${formik.values.city}`;

      const dataReq = {
        receiving_location: receiving_location,
        tel: formik.values.tel,
        payments: paymentMethod,
        total_price: data.totalPrice,
        items: items,
      };
      const res = await addOrder(dataReq);
      if ("data" in res) {
        message.success("Đặt hàng thành công");
        if (paymentMethod === "VNPAY") {
          const resPost = await postPayMent({
            order_id: res.data.id,
            total_price: res.data.total_price,
            bank_code: "NCB",
            ipaddr: ipAddress,
            language: "vn",
            description: `Thanh toán `,
          });
          if ("data" in resPost) {
            window.location.href = resPost.data;
          }
        } else {
          navigate("/profile/listOrderUser")
        }
      }
    } else {
      console.log("Form validation failed:", formIsValid);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    const selectedCityData = cities.find((city) => city.Name === cityId);
    setDistricts(selectedCityData?.Districts || []);
    setSelectedDistrict("");
    setWards([]);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const selectedDistrictData = districts.find(
      (district) => district.Name === districtId
    );
    setWards(selectedDistrictData?.Wards || []);
  };

  return (
    <>
      {data && (
        <div>
          <div className="container mx-auto">
            <Breadcrumb name="Giỏ hàng" />
          </div>
          <div className="container mx-auto">
            <div className="flex">
              <div className="max-w-[66.6667%] basis-[66.6667%]">
                <div>
                  <div className="text-[14px] font-medium text-[#020b27]">
                    Danh sách sản phẩm ({data.products.length})
                  </div>
                  <div className="bg-white py-4 px-2">
                    {data.products.map((item: any) => (
                      <div
                        className="flex mb-2 justify-between items-center"
                        key={item.id}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-[60px] h-[60px] shadow-[0_0_0_1px_#e4e8ed] flex items-center justify-center mr-3 rounded-md">
                            <img
                              className="w-[52px] h-[52px]"
                              src={item.product_image}
                              alt=""
                            />
                          </div>
                          <div className="max-w-[450px]">
                            {item.product_name}
                          </div>
                        </div>
                        <div className="flex gap-2 ">
                          <div className="font-semibold text-[16px]">
                            {new Intl.NumberFormat("vi-VN").format(
                              item.total_price
                            )}
                            <span> đ</span>
                          </div>
                          <div className="ml-3 text-[14px] text-[#728091]">
                            x{item.quantity} {item.unit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between ">
                    <div className="text-[14px] font-medium text-[#020b27]">
                      Hình thức nhận hàng
                    </div>
                    <div className="bg-[#c1d0f6] text-[#1250dc] border-0 text-[14px] text-center py-[6px] px-[40px] rounded-lg">
                      Giao hàng tận nơi
                    </div>
                  </div>
                  <div className="bg-white py-[15px] px-[20px] mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-[24px] h-[24px]">
                        <img
                          src="https://nhathuoclongchau.com.vn/estore-images/pin.png"
                          alt=""
                        />
                      </div>
                      <div>Địa chỉ nhận hàng</div>
                    </div>
                    <form action="" onSubmit={formik.handleSubmit}>
                      <div className="w-full css-wuiu1  rounded-md mt-4 border-[#c1c8d1]">
                        <span className="custom-ant-input-affix-wrapper css-10ed4xt">
                          <input
                            placeholder="Số điện thoại"
                            name="tel"
                            onChange={formik.handleChange}
                            value={formik.values.tel}
                            className="custom-ant-input css-10ed4xt p-0 w-full border-0"
                            type="text"
                          />
                          <span className="custom-ant-input-suffix">
                            <span className="optional-label">
                              Số điện thoại
                            </span>
                          </span>
                        </span>
                        {formik.errors.tel && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.tel}
                          </div>
                        )}
                      </div>
                      <div className="w-full css-wuiu1 border-[1px] rounded-md mt-4 border-[#c1c8d1]">
                        <select
                          name="city"
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleCityChange(e);
                          }}
                          value={selectedCity}
                          className="custom-ant-input css-10ed4xt p-0 w-full border-0"
                        >
                          <option value="">Chọn Tỉnh/Thành phố</option>
                          {cities.map((city) => (
                            <option key={city.Id} value={city.Name}>
                              {city.Name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">
                            Chọn Tỉnh/Thành phố
                          </span>
                        </span>
                      </div>
                      {formik.errors.city && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.city}
                        </div>
                      )}
                      <div className="w-full css-wuiu1 border-[1px] rounded-md mt-4 border-[#c1c8d1]">
                        <select
                          name="district"
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleDistrictChange(e);
                          }}
                          value={selectedDistrict}
                          className="custom-ant-input css-10ed4xt p-0 w-full border-0"
                        >
                          <option value="">Chọn Quận/Huyện</option>
                          {districts.map((district) => (
                            <option key={district.Id} value={district.Name}>
                              {district.Name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">
                            Chọn Quận/Huyện
                          </span>
                        </span>
                      </div>
                      {formik.errors.district && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.district}
                        </div>
                      )}
                      <div className="w-full css-wuiu1 border-[1px] rounded-md mt-4 border-[#c1c8d1]">
                        <select
                          name="ward"
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          className="custom-ant-input css-10ed4xt p-0 w-full border-0"
                        >
                          <option value="">Chọn Phường/Xã</option>
                          {wards.map((ward) => (
                            <option key={ward.Id} value={ward.Name}>
                              {ward.Name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">Chọn Phường/Xã</span>
                        </span>
                      </div>
                      {formik.errors.ward && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.ward}
                        </div>
                      )}
                      <div className="w-full css-wuiu1  rounded-md mt-4 border-[#c1c8d1]">
                        <span className="custom-ant-input-affix-wrapper css-10ed4xt">
                          <input
                            placeholder="Địa chỉ cụ thể"
                            name="detailed_address"
                            onChange={formik.handleChange}
                            value={formik.values.detailed_address}
                            className="custom-ant-input css-10ed4xt p-0 w-full border-0"
                            type="text"
                          />
                          <span className="custom-ant-input-suffix">
                            <span className="optional-label">
                              Địa chỉ cụ thể
                            </span>
                          </span>
                        </span>
                        {formik.errors.detailed_address && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.detailed_address}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between ">
                    <div className="text-[14px] font-medium text-[#020b27]">
                      Chọn hình thức thanh toán
                    </div>
                  </div>
                  <ul className="bg-white rounded-[15px] px-4 py-3 mt-2">
                    <li className="py-[12px] px-[16px]">
                      <div className="">
                        <label className="flex items-center gap-4">
                          <input
                            className=""
                            name="payment"
                            type="radio"
                            id="6"
                            value="6"
                            checked={selectedPayment === "6"}
                            onChange={handlePaymentChange}
                          />
                          <div className="w-[40px] h-[40px]">
                            <img
                              src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/cod.png"
                              alt="avatar"
                            />
                          </div>
                          <span className="cart-pre-order_text__BVylT">
                            Thanh toán tiền mặt khi nhận hàng
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="py-[12px] px-[16px]">
                      <div className="">
                        <label className="flex items-center gap-4">
                          <input
                            className=""
                            name="payment"
                            type="radio"
                            id="7"
                            value="7"
                            checked={selectedPayment === "7"}
                            onChange={handlePaymentChange}
                          />
                          <div className="w-[40px] h-[40px]">
                            <img
                              src="https://s3-sgn09.fptcloud.com/lc-public/app-lc/payment/vnpay.png"
                              alt="avatar"
                            />
                          </div>
                          <span className="cart-pre-order_text__BVylT">
                            Thanh toán bằng VNPay
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                  {paymentError && (
                    <div className="text-red-500 text-sm mt-1">
                      {paymentError}
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-1 px-3">
                <div className="bg-white p-4 rounded-t-xl">
                  <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div>
                      {new Intl.NumberFormat("vi-VN").format(data.totalPrice)}
                      <span> đ</span>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#e4e8ed] mt-4"></div>

                  <div className="flex justify-between mt-4">
                    <div>Phí vận chuyển</div>
                    <div className="text-[#2b9e02]">Miễn phí</div>
                  </div>
                  <div className="h-[1px] w-full bg-[#e4e8ed] mt-4"></div>
                  <div className="flex justify-between mt-3">
                    <div className="font-semibold text-[18px] text-[#020b27]">
                      Thành tiền
                    </div>
                    <div className="text-[20px] font-semibold text-[#1250dc]">
                      {new Intl.NumberFormat("vi-VN").format(data.totalPrice)}
                      <span> đ</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => subMitAddOrder()}
                      style={{
                        background:
                          "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                      }}
                      className="w-full rounded-[42px] cursor-pointer outline-none p-3 mt-4 flex items-center justify-center text-white"
                    >
                      Hoàn tất
                    </button>
                  </div>

                  <div className="w text-caption2 text-center md:mt-3 hidden md:block w-[350px]">
                    <span>
                      Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
                    </span>
                    <a className="underline underline-offset-[3px]" href="/tos">
                      Điều khoản dịch vụ
                    </a>
                    ,
                    <a
                      className="underline underline-offset-[3px]"
                      href="/chinh-sach-thu-thap-va-xu-ly-du-lieu-ca-nhan"
                    >
                      Chính sách thu thập và xử lý dữ liệu cá nhân
                    </a>{" "}
                    của Nhà thuốc FPT Long Châu
                  </div>
                </div>
                <div className="ml-[auto]">
                  <svg
                    width="384"
                    height="24"
                    viewBox="0 0 384 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 0H384V15.25C384 17.8112 384 19.0917 383.615 20.1135C383.007 21.7306 381.731 23.0068 380.113 23.6154C379.092 24 377.811 24 375.25 24C373.55 24 372.7 24 372.131 23.8888C370.435 23.5578 371.033 23.8255 369.656 22.7819C369.194 22.4314 367.279 20.2894 363.449 16.0053C361.252 13.5472 358.057 12 354.5 12C349.957 12 346.004 14.524 343.967 18.2462C342.376 21.1529 339.814 24 336.5 24C333.186 24 330.624 21.1529 329.033 18.2462C326.996 14.524 323.043 12 318.5 12C313.957 12 310.004 14.524 307.967 18.2462C306.376 21.1529 303.814 24 300.5 24C297.186 24 294.624 21.1529 293.033 18.2462C290.996 14.524 287.043 12 282.5 12C277.957 12 274.004 14.524 271.967 18.2462C270.376 21.1529 267.814 24 264.5 24C261.186 24 258.624 21.1529 257.033 18.2462C254.996 14.524 251.043 12 246.5 12C241.957 12 238.004 14.524 235.967 18.2462C234.376 21.1529 231.814 24 228.5 24C225.186 24 222.624 21.1529 221.033 18.2462C218.996 14.524 215.043 12 210.5 12C205.957 12 202.004 14.524 199.967 18.2462C198.376 21.1529 195.814 24 192.5 24C189.186 24 186.624 21.1529 185.033 18.2462C182.996 14.524 179.043 12 174.5 12C169.957 12 166.004 14.524 163.967 18.2462C162.376 21.1529 159.814 24 156.5 24C153.186 24 150.624 21.1529 149.033 18.2462C146.996 14.524 143.043 12 138.5 12C133.957 12 130.004 14.524 127.967 18.2462C126.376 21.1529 123.814 24 120.5 24C117.186 24 114.624 21.1529 113.033 18.2462C110.996 14.524 107.043 12 102.5 12C97.9574 12 94.0044 14.524 91.9668 18.2462C90.3757 21.1529 87.8137 24 84.5 24C81.1863 24 78.6243 21.1529 77.0332 18.2462C74.9956 14.524 71.0426 12 66.5 12C61.9574 12 58.0044 14.524 55.9668 18.2462C54.3757 21.1529 51.8137 24 48.5 24C45.1863 24 42.6243 21.1529 41.0332 18.2462C38.9956 14.524 35.0426 12 30.5 12C27.1233 12 24.0723 13.3947 21.8918 15.6395C17.3526 20.3123 15.083 22.6487 14.5384 23.008C13.3234 23.8097 13.9452 23.5469 12.5236 23.8598C11.8864 24 11.0076 24 9.25 24C6.21942 24 4.70412 24 3.52376 23.4652C2.19786 22.8644 1.13557 21.8021 0.534817 20.4762C0 19.2959 0 17.7806 0 14.75V0Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
