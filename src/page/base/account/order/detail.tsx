// import { FC } from "react";
// import { useParams } from "react-router-dom";
// import { useGetOrderByIdQuery } from "../../../../services/order";
// import "../../../../assets/css/common.css";

// const OrderDetail: FC = () => {
//   const { id } = useParams();
//   const {data: data} = useGetOrderByIdQuery(Number(id));
//   console.log(data);
  
//   return (
//     <>
//       {data && (
//         <div>
//           <div className="container mx-auto">
//             <div className="flex">
//               <div className="max-w-[66.6667%] basis-[66.6667%]">
//                 <div>
//                   <div className="text-[14px] font-medium text-[#020b27]">
//                     Danh sách sản phẩm ({data.products.length})
//                   </div>
//                   <div className="bg-white py-4 px-2">
//                     {data.products.map((item: any) => (
//                       <div
//                         className="flex mb-2 justify-between items-center"
//                         key={item.id}
//                       >
//                         <div className="flex items-center gap-2">
//                           <div className="w-[60px] h-[60px] shadow-[0_0_0_1px_#e4e8ed] flex items-center justify-center mr-3 rounded-md">
//                             <img
//                               className="w-[52px] h-[52px]"
//                               src={item.product_image}
//                               alt=""
//                             />
//                           </div>
//                           <div className="max-w-[450px]">
//                             {item.product_name}
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ">
//                           <div className="font-semibold text-[16px]">
//                             {new Intl.NumberFormat("vi-VN").format(
//                               item.total_price
//                             )}
//                             <span> đ</span>
//                           </div>
//                           <div className="ml-3 text-[14px] text-[#728091]">
//                             x{item.quantity} {item.unit}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="ml-1 px-3">
//                 <div className="bg-white p-4 rounded-t-xl">
//                   <div className="flex justify-between">
//                     <div>Tổng tiền</div>
//                     <div>
//                       {new Intl.NumberFormat("vi-VN").format(data.totalPrice)}
//                       <span> đ</span>
//                     </div>
//                   </div>
//                   <div className="h-[1px] w-full bg-[#e4e8ed] mt-4"></div>

//                   <div className="flex justify-between mt-4">
//                     <div>Phí vận chuyển</div>
//                     <div className="text-[#2b9e02]">Miễn phí</div>
//                   </div>
//                   <div className="h-[1px] w-full bg-[#e4e8ed] mt-4"></div>
//                   <div className="flex justify-between mt-3">
//                     <div className="font-semibold text-[18px] text-[#020b27]">
//                       Thành tiền
//                     </div>
//                     <div className="text-[20px] font-semibold text-[#1250dc]">
//                       {new Intl.NumberFormat("vi-VN").format(data.totalPrice)}
//                       <span> đ</span>
//                     </div>
//                   </div>
//                   <div>
//                     <button
//                       style={{
//                         background:
//                           "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
//                       }}
//                       className="w-full rounded-[42px] cursor-pointer outline-none p-3 mt-4 flex items-center justify-center text-white"
//                     >
//                       Hoàn tất
//                     </button>
//                   </div>

//                   <div className="w text-caption2 text-center md:mt-3 hidden md:block w-[350px]">
//                     <span>
//                       Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
//                     </span>
//                     <a className="underline underline-offset-[3px]" href="/tos">
//                       Điều khoản dịch vụ
//                     </a>
//                     ,
//                     <a
//                       className="underline underline-offset-[3px]"
//                       href="/chinh-sach-thu-thap-va-xu-ly-du-lieu-ca-nhan"
//                     >
//                       Chính sách thu thập và xử lý dữ liệu cá nhân
//                     </a>{" "}
//                     của Nhà thuốc FPT Long Châu
//                   </div>
//                 </div>
//                 <div className="ml-[auto]">
//                   <svg
//                     width="384"
//                     height="24"
//                     viewBox="0 0 384 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M0 0H384V15.25C384 17.8112 384 19.0917 383.615 20.1135C383.007 21.7306 381.731 23.0068 380.113 23.6154C379.092 24 377.811 24 375.25 24C373.55 24 372.7 24 372.131 23.8888C370.435 23.5578 371.033 23.8255 369.656 22.7819C369.194 22.4314 367.279 20.2894 363.449 16.0053C361.252 13.5472 358.057 12 354.5 12C349.957 12 346.004 14.524 343.967 18.2462C342.376 21.1529 339.814 24 336.5 24C333.186 24 330.624 21.1529 329.033 18.2462C326.996 14.524 323.043 12 318.5 12C313.957 12 310.004 14.524 307.967 18.2462C306.376 21.1529 303.814 24 300.5 24C297.186 24 294.624 21.1529 293.033 18.2462C290.996 14.524 287.043 12 282.5 12C277.957 12 274.004 14.524 271.967 18.2462C270.376 21.1529 267.814 24 264.5 24C261.186 24 258.624 21.1529 257.033 18.2462C254.996 14.524 251.043 12 246.5 12C241.957 12 238.004 14.524 235.967 18.2462C234.376 21.1529 231.814 24 228.5 24C225.186 24 222.624 21.1529 221.033 18.2462C218.996 14.524 215.043 12 210.5 12C205.957 12 202.004 14.524 199.967 18.2462C198.376 21.1529 195.814 24 192.5 24C189.186 24 186.624 21.1529 185.033 18.2462C182.996 14.524 179.043 12 174.5 12C169.957 12 166.004 14.524 163.967 18.2462C162.376 21.1529 159.814 24 156.5 24C153.186 24 150.624 21.1529 149.033 18.2462C146.996 14.524 143.043 12 138.5 12C133.957 12 130.004 14.524 127.967 18.2462C126.376 21.1529 123.814 24 120.5 24C117.186 24 114.624 21.1529 113.033 18.2462C110.996 14.524 107.043 12 102.5 12C97.9574 12 94.0044 14.524 91.9668 18.2462C90.3757 21.1529 87.8137 24 84.5 24C81.1863 24 78.6243 21.1529 77.0332 18.2462C74.9956 14.524 71.0426 12 66.5 12C61.9574 12 58.0044 14.524 55.9668 18.2462C54.3757 21.1529 51.8137 24 48.5 24C45.1863 24 42.6243 21.1529 41.0332 18.2462C38.9956 14.524 35.0426 12 30.5 12C27.1233 12 24.0723 13.3947 21.8918 15.6395C17.3526 20.3123 15.083 22.6487 14.5384 23.008C13.3234 23.8097 13.9452 23.5469 12.5236 23.8598C11.8864 24 11.0076 24 9.25 24C6.21942 24 4.70412 24 3.52376 23.4652C2.19786 22.8644 1.13557 21.8021 0.534817 20.4762C0 19.2959 0 17.7806 0 14.75V0Z"
//                       fill="white"
//                     ></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderDetail;
