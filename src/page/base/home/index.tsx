import "../../../assets/css/common.css"
import { Carousel } from "antd";
import React, { useRef } from "react";
import banner2 from "../../../assets/images/banner2.webp";
import banner3 from "../../../assets/images/banner3.png";
import banner from "../../../assets/images/banner_web_782x240_01_01_522295d1d0.webp";
import banner1 from "../../../assets/images/banner_web_pc_1610x492_7fad510c4d.webp";
import muaThuoc from "../../../assets/images/can_mua_thuoc_40x40_3x_59367d7177.webp";
import timNha from "../../../assets/images/tim_nha_thuoc_gan_day_40x40_3x_a116d4c818.webp";
import tuVan from "../../../assets/images/tu_van_voi_duoc_sy_40x40_3x_aaa988a1a2.webp";
import ArrowDownIcon from "../../../assets/svg/arrowDownIcon";

const Home: React.FC = () => {
  const ref = useRef<any>(null);
  const banners = [banner1, banner2, banner3];

  return (
    <>
      <div className="bg-[#f8f9fd]">
        <div className="container mx-auto">
          {/* slide */}
          <div className="flex gap-5 my-4">
            <div className="w-[70%] relative">
              <Carousel autoplay ref={ref}>
                {banners.map((banner, index) => (
                  <div key={index}>
                    <img className="w-full h-full" src={banner} alt="" />
                  </div>
                ))}
              </Carousel>
              <button className="slidePrev bg-[#377ba9] rounded-full w-10 h-10 flex justify-center items-center absolute top-[35%] left-4 translate-y-2/4"
                onClick={() => {
                  if (ref.current) {
                    ref.current.prev();
                  }
                }}
              >
                <ArrowDownIcon />
              </button>
              <button className="slideNext bg-[#377ba9] rounded-full w-10 h-10 flex justify-center items-center absolute top-[35%] right-4 translate-y-2/4"
                onClick={() => {
                  if (ref.current) {
                    ref.current.next();
                  }
                }}
              >
                <ArrowDownIcon />
              </button>
            </div>
            <div>
              <div>
                {" "}
                <img className="w-full" src={banner} alt="" />{" "}
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
                  style={{
                    boxShadow:
                      "0 0 16px -4px rgba(0,39,102,.08), 0 0 6px -2px rgba(0,39,102,.03)",
                  }}
                  className="flex flex-col items-center justify-start px-[11px] py-[17px] rounded-lg bg-white"
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
      </div>
    </>
  );
};

export default Home;
