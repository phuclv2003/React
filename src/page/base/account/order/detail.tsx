import dayjs from "dayjs";
import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../assets/css/common.css";

const OrderDetail: FC = () => {
  const location = useLocation();
  const [data] = useState<any>(location.state?.data);
  console.log(data);

  return (
    <>
      {data && (
        <div>
          <div className="container mx-auto">
            <div className="flex pt-12">
              <div className="max-w-[66.6667%] basis-[66.6667%]">
                <div>
                  <div className="shadow-divider-1pt flex px-8 py-3 shadow-[0_0.1px_0_0] bg-white rounded-t-xl">
                    <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                      <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng {dayjs(data?.created_at).format("DD-MM-YYYY")}</span>
                      <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                        <div className="flex items-center">
                          <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                        </div><div className="flex items-center">
                          <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-[10px] flex items-center justify-center self-start">
                      <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                      <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                    </div>
                  </div>
                  <div className="bg-white grid grid-cols-2 px-8 pb-9 mt-[0.5px] pt-4 rounded-b-xl">
                    <div className="px-4">
                      <div className="flex items-center">
                        <span className="estore-icon  css-wi4pw5">
                          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76141 17 6.99998C17 4.23856 14.7614 1.99998 12 1.99998C9.23858 1.99998 7 4.23856 7 6.99998C7 9.76141 9.23858 12 12 12Z" fill="#ACC0F3"></path>
                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="url(#paint0_linear_3708_96166)"></path>
                            <defs><linearGradient id="paint0_linear_3708_96166" x1="21.0902" y1="22.5" x2="15.1916" y2="9.09562" gradientUnits="userSpaceOnUse"><stop stop-color="#1250DC"></stop><stop offset="1" stop-color="#306DE4"></stop></linearGradient></defs></svg>
                        </span>
                        <span className="css-tc11gt text-text-secondary ml-1 md:ml-[10px]">Thông tin người nhận</span>
                      </div>
                      <div className="font-medium text-base mt-3">
                      {data.mail_address}
                      </div>
                    </div>
                    <div className=" border-l-2 border-[#c1c8d1] px-4">
                      <div className="flex items-center">
                        <span className="estore-icon  css-wi4pw5">
                          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.52714 19.642C9.18736 19.5903 9.82806 19.8874 10.2011 20.4346C10.4905 20.8591 10.7647 21.2937 11.0235 21.7371C11.0931 21.8568 11.1932 21.9561 11.3172 22.0257C11.3732 22.0576 11.4326 22.0826 11.4954 22.1C11.5701 22.1208 11.6465 22.1314 11.7246 22.131C11.8672 22.131 12.0081 22.0941 12.1321 22.0245C12.2543 21.9549 12.3545 21.8551 12.4224 21.7359L12.4886 21.62C12.7276 21.2183 12.9792 20.8241 13.2432 20.4381C13.6173 19.891 14.259 19.5943 14.9197 19.6472C18.1232 19.9034 20.3847 20.5297 20.3847 21.2618C20.3847 22.2218 16.4935 23.0002 11.6924 23.0002C6.89119 23.0002 3 22.2218 3 21.2618C3 20.5252 5.29111 19.8951 8.52714 19.642Z" fill="#ACC0F3"></path><path d="M16.9616 3.04077C16.1919 2.33939 15.29 1.79873 14.3086 1.45047C13.3273 1.10222 12.2863 0.953388 11.2467 1.0127C10.207 1.07202 9.18972 1.33828 8.25435 1.79589C7.31898 2.2535 6.48438 2.89324 5.79948 3.67761C5.11458 4.46198 4.59316 5.37519 4.26579 6.3637C3.93843 7.35222 3.8117 8.39614 3.89305 9.43426C3.97439 10.4724 4.26217 11.4838 4.73951 12.4093C5.21686 13.3347 5.87415 14.1556 6.67287 14.8237C8.4989 16.3418 10.0246 18.1884 11.1712 20.268C11.2272 20.3715 11.3103 20.458 11.4115 20.5181C11.5128 20.5783 11.6284 20.6099 11.7462 20.6096C11.8638 20.6095 11.9793 20.5776 12.0803 20.5172C12.1813 20.4568 12.2641 20.3703 12.3199 20.2666L12.3733 20.1662C13.5281 18.1119 15.0507 16.2872 16.8651 14.7833C17.7059 14.0566 18.3821 13.159 18.8486 12.1504C19.3151 11.1417 19.5611 10.0451 19.5702 8.93386C19.5793 7.82258 19.3514 6.72214 18.9016 5.70593C18.4517 4.68973 17.7904 3.78114 16.9616 3.04077ZM11.7462 12.1345C11.1015 12.1345 10.4713 11.9433 9.93521 11.5852C9.39916 11.227 8.98137 10.7179 8.73465 10.1223C8.48794 9.52666 8.42339 8.87125 8.54916 8.23895C8.67493 7.60664 8.98539 7.02583 9.44125 6.56996C9.89712 6.11409 10.4779 5.80364 11.1102 5.67787C11.7425 5.55209 12.398 5.61664 12.9936 5.86336C13.5892 6.11007 14.0983 6.52787 14.4565 7.06391C14.8146 7.59996 15.0058 8.23017 15.0058 8.87487C15.0048 9.73906 14.661 10.5676 14.0499 11.1786C13.4389 11.7897 12.6104 12.1335 11.7462 12.1345Z" fill="url(#paint0_linear_3708_96171)"></path><defs><linearGradient id="paint0_linear_3708_96171" x1="19.5705" y1="20.6096" x2="0.435545" y2="5.28825" gradientUnits="userSpaceOnUse"><stop stop-color="#1250DC"></stop><stop offset="1" stop-color="#306DE4"></stop></linearGradient></defs></svg>
                        </span>
                        <span className="css-tc11gt text-text-secondary ml-1 md:ml-[10px]">Nhận hàng tại</span>
                      </div>
                      <div className="font-medium text-base mt-3">
                        {data.receiving_location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-9">
                  <div className="text-[14px] font-medium text-[#020b27]">
                    Danh sách sản phẩm
                  </div>
                  <div className="bg-white py-5 px-5 rounded-lg ">
                    {data.items.map((item: any) => (
                      <div
                        className="flex mb-4 justify-between items-center"
                        key={item.product_id}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-[60px] h-[60px] shadow-[0_0_0_1px_#e4e8ed] flex items-center justify-center mr-3 rounded-md">
                            <img
                              className="w-[52px] h-[52px]"
                              src={item.image}
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
                              item.price
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
              </div>
              <div className="ml-1 px-3">
                <div className="bg-white p-4 rounded-t-xl">
                  <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div>
                      {new Intl.NumberFormat("vi-VN").format(data.total_price)}
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
                      {new Intl.NumberFormat("vi-VN").format(data.total_price)}
                      <span> đ</span>
                    </div>
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

export default OrderDetail;
