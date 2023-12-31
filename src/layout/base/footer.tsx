import React, { FC } from "react";
import LocationIcon from "../../assets/svg/location";
import { Link } from "react-router-dom";
import boCongThuong from "../../assets/svg/bo_cong_thuong_a8e5750f57.svg";
import DMCA from "../../assets/svg/DMCA_1_1f84305343.svg";
import Zalo from "../../assets/svg/Logo_Zalo_979d41d52b.svg";
import FB from "../../assets/svg/facebook_logo_3152b9bb16.svg";
const FooterBase: FC = () => {
  return (
    <div>
      <div className="bg-[#2167dd]">
        <div className="container mx-auto flex justify-between items-center py-5">
          <div className="flex gap-x-2 footerLocation text-white text-[24px] font-normal">
            <LocationIcon />
            <div>Xem hệ thống 1741 nhà thuốc trên hệ thống </div>
          </div>
          <div className="bg-white px-6 py-3 rounded-full cursor-pointer  font-medium text-base text-[#1250dc] ">
            Xem danh sách nhà thuốc
          </div>
        </div>
      </div>
      <div className="container mx-auto flex mt-4">
        <div className="w-[58%] grid grid-cols-3">
          <div className="">
            <h4 className="text-[#657384] font-bold text-[14px]">Về chúng tôi</h4>
            <ul>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Giới thiệu</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Giấy phép kinh doanh</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Quy chế hoạt động</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Chính sắt đặt cọc</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Chính sách nội dụng</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Chính sách đổi trả thuốc</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#657384] font-bold text-[14px]">Danh mục</h4>
            <ul>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Giới thiệu</Link>
              </li>
              <li className="py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Giấy phép kinh doanh</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Quy chế hoạt động</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Chính sắt đặt cọc</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"  to="">Chính sách nội dụng</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]" to="">Chính sách đổi trả thuốc</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#657384] font-bold text-[14px]">Tìm hiểu thêm</h4>
            <ul>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Giới thiệu</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Giấy phép kinh doanh</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Quy chế hoạt động</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Chính sắt đặt cọc</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Chính sách nội dụng</Link>
              </li>
              <li className=" py-1">
                <Link className="text-[#1250dc] text-[14px]"   to="">Chính sách đổi trả thuốc</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[42%] grid grid-cols-2">
          <div>
            <h4 className="text-[#657384] font-bold text-[14px]">Tổng đài</h4>
            <div className="py-1">
              <p className="text-[#4a4f63] font-medium text-[14px]">Tư vấn mua hàng</p>
              <Link to="" className="text-[#1250dc] text-[14px]">18006928 <span className="text-[#4a4f63] font-medium text-[14px]">(Nhánh 1)</span></Link>
            </div>
            <div  className="py-2">
              <p className="text-[#4a4f63] font-medium text-[14px]">Trung tâm Vắc xin</p>
              <Link to="" className="text-[#1250dc] text-[14px]">18006928 <span className="text-[#4a4f63] font-medium text-[14px]">(Nhánh 1)</span></Link>
            </div>
            <div  className="py-2">
              <p className="text-[#4a4f63] font-medium text-[14px]">Gợi ý khiếu nại</p>
              <Link to="" className="text-[#1250dc] text-[14px]">18006928 <span className="text-[#4a4f63] font-medium text-[14px]">(Nhánh 1)</span></Link>
            </div>

            <h4 className="text-[#4a4f63] font-medium text-[14px]">Chứng nhận bỡi</h4>
            <div className="flex items-center">
              <div>
                <Link to={""}>
                  <img src={boCongThuong} alt="" />
                </Link>
              </div>
              <div>
                <Link to={""}>
                  <img src={DMCA} alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[#657384] font-bold text-[14px]">Kết nối với chúng tôi</h4>
              <div  className="flex items-center gap-4">
                <Link to={""}> <img width={28} src={Zalo} alt="" /></Link>
                <Link to={""}> <img width={28} src={FB} alt="" /></Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBase;
