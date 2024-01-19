import React, { useState } from "react";
import "../../../assets/css/common.css";
import banner from "../../../assets/images/banner.webp";
import muaThuoc from "../../../assets/images/can_mua_thuoc_40x40_3x_59367d7177.webp";
import cupIcon from "../../../assets/images/cupIcon.webp";
import timNha from "../../../assets/images/tim_nha_thuoc_gan_day_40x40_3x_a116d4c818.webp";
import tuVan from "../../../assets/images/tu_van_voi_duoc_sy_40x40_3x_aaa988a1a2.webp";
import BannerProducts from "../../../assets/svg/sanPhamBannerHome";
import { useGetAllProductsQuery } from "../../../services/products";
import CarouselComponent from "./carousel";
import { useGetNewsQuery } from "../../../services/new";
import { useNavigate } from "react-router-dom";
import ModalChat from "./modalChat";
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: dataProduct } = useGetAllProductsQuery({
    page_size: 6,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const { data: dataNews } = useGetNewsQuery({
    page_size: 4,
    page: 1,
    sort_by: '{"created_at": "desc"}',
  });

  const detailNews = (id: number) => {
    navigate(`/news/${id}`);
  };
  const detailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const [openModalChat, setOpenModalChat] = useState<boolean>(false);
  return (
    <>
      <div className="bg-[#f8f9fd] relative">
        <div className="container mx-auto">
          <div className="flex gap-5 py-4">
            <CarouselComponent />
            <div className="flex flex-col">
              <div>
                <img className="w-full" src={banner} alt="" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div
                  style={{
                    boxShadow:
                      "0 0 16px -4px rgba(0,39,102,.08), 0 0 6px -2px rgba(0,39,102,.03)",
                  }}
                  className="flex flex-col items-center justify-start px-[11px] py-[17px] rounded-lg bg-white"
                >
                  <div>
                    <img src={muaThuoc} alt="" />
                  </div>
                  <div className="text-[13px] font-[600] text-center w-[96%] mx-auto">
                    Cần mua thuốc
                  </div>
                </div>
                <div
                  onClick={() => setOpenModalChat(!openModalChat)}
                  style={{
                    boxShadow:
                      "0 0 16px -4px rgba(0,39,102,.08), 0 0 6px -2px rgba(0,39,102,.03)",
                  }}
                  className="flex flex-col items-center justify-start px-[11px] py-[17px] rounded-lg bg-white cursor-pointer"
                >
                  <div>
                    <img src={tuVan} alt="" />
                  </div>
                  <div className="text-[13px] font-[600] text-center w-[96%] mx-auto">
                    Tư vấn với dược sỹ
                  </div>
                </div>
                <div
                  style={{
                    boxShadow:
                      "0 0 16px -4px rgba(0,39,102,.08), 0 0 6px -2px rgba(0,39,102,.03)",
                  }}
                  className="flex flex-col items-center justify-start px-[11px] py-[17px] rounded-lg bg-white"
                >
                  <div>
                    <img src={timNha} alt="" />
                  </div>
                  <div className="text-[13px] font-[600] text-center w-[96%] mx-auto">
                    Tìm nhà thuốc gần đây
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#f7e4cf] to-[#fffefd]">
          <div className="container mx-auto">
            <div className="flex justify-center relative -top-3 mt-7">
              <BannerProducts />
              <p className="absolute top-1 text-[20px] font-medium text-white">
                Sản phẩm bán chạy
              </p>
            </div>
            <div className="grid grid-cols-6 gap-5 pb-7">
              {dataProduct?.data?.map((item: any) => (
                <div
                  onClick={() => detailProduct(item.id)}
                  key={item.id}
                  className="bg-white relative rounded-xl border border-white hover:border-[#1250dc] transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <div className="p-3">
                    <div className="px-1 text-center md:px-4">
                      <img className="w-full" src={item.image} alt="product" />
                    </div>
                    <div>
                      <h3 className="text-body2 font-semibold">{item.name}</h3>
                      <div className="mt-1">
                        <span className="text-body2 font-semibold text-[#1250dc] ">
                          {new Intl.NumberFormat("vi-VN").format(item.price)}
                          <span> đ</span>
                        </span>
                        <span className="text-caption font-medium text-[#1250dc] text-[12px] pl-1">
                          /<span className="pl-1">{item.unit}</span>
                        </span>
                      </div>
                      <div className="m-auto flex pt-1 mt-6">
                        <div className="w-fit rounded-xl bg-[#edf0f3] px-2 py-1">
                          <p className="w-fit text-caption font-medium text-[#4a4f63] line-clamp-2 text-[12px]">
                            {item.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white pb-7">
          <div className="container mx-auto">
            <div className="mb-2 flex">
              <img src={cupIcon} alt="Danh mục nổi bật" />
              <h2 className="ml-2 flex w-full items-center text-[18px] font-[600]">
                Danh mục nổi bật
              </h2>
            </div>
            <div className="grid grid-cols-6 gap-3">
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/suc_khoe_tim_mach_level_2_1fc9d156fd.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Thần kinh não
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    8 sản phẩm
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Vitamin & Khoáng chất
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    3 sản phẩm
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/suc_khoe_tim_mach_level_2_1fc9d156fd.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Sức khỏe tim mạch
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    7 sản phẩm
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_lam_dep_level_2_87dfb56752.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Hỗ trợ làm đẹp
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    2 sản phẩm
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/ho_tro_tieu_hoa_level_2_df7385ed6e.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Hỗ trợ tiêu hóa
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    9 sản phẩm
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#d9dfe5] rounded-2xl hover:opacity-80 cursor-pointer">
                <div className="py-6 pt-4 text-center flex flex-col items-center">
                  <img
                    className="w-6"
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/dinh_duong_level_2_6b1af6b735.png"
                    alt=""
                  />
                  <h3 className="text-sm font-semibold mt-2 mb-1">
                    Dinh dưỡng
                  </h3>
                  <div className="text-sm font-medium text-[#657384]">
                    6 sản phẩm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#fffefd] to-[#8dade8] pb-7">
          <div className="container mx-auto">
            <div className="mb-2 flex">
              <img src={cupIcon} alt="Danh mục nổi bật" />
              <h2 className="ml-2 flex w-full items-center text-[18px] font-[600]">
                Tin Tức
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {dataNews?.data?.map((item: any) => (
                <div
                  onClick={() => detailNews(item.id)}
                  key={item.id}
                  className="flex h-full w-full flex-col rounded-[8px] bg-white transition-all md:rounded-xl md:p-[16px] cursor-pointer"
                  style={{
                    boxShadow:
                      "rgba(0, 39, 102, 0.08) 0px 0px 24px -4px, rgba(0, 39, 102, 0.03) 0px 0px 8px -4px",
                  }}
                >
                  <div className="h-1/2">
                    <div className="overflow-hidden rounded-t-[8px] h-full rounded-b-[0px] md:rounded-[8px]">
                      <img className="w-full h-full" src={item.image} alt="" />
                    </div>
                  </div>
                  <div className="flex flex-1 h-full grow flex-col p-[12px] md:p-0 md:pt-[20px]">
                    <h3 className="leading-[24px] tracking-[0.005em] text-[18px] font-bold text-[#020b27] md:tracking-[0.0025em]">
                      {item.title}
                    </h3>
                    <p
                      className="mt-[8px] mb-[24px] text-gray-7 line-clamp-3 md:mb-[20px] text-[15px] font-medium"
                      style={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.describe || "",
                      }}
                    />
                    <span className="flex items-center text-[14px] font-medium text-[#1250dc]">
                      Tìm hiểu thêm
                      <span className="estore-icon ml-[4px] text-[20px] css-wi4pw5">
                        <svg
                          className="w-5"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.25383 4.29289C8.86331 4.68342 8.86331 5.31658 9.25383 5.70711L15.5467 12L9.25383 18.2929C8.86331 18.6834 8.86331 19.3166 9.25383 19.7071C9.64436 20.0976 10.2775 20.0976 10.668 19.7071L17.668 12.7071C18.0586 12.3166 18.0586 11.6834 17.668 11.2929L10.668 4.29289C10.2775 3.90237 9.64435 3.90237 9.25383 4.29289Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/chan_trang_desktop_2331700d88.jpg"
            alt=""
          />
        </div>
        <ModalChat
          openModalChat={openModalChat}
          setOpenModalChat={setOpenModalChat}
        />
      </div>
    </>
  );
};

export default Home;
