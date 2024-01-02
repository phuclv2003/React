import "../../../assets/css/common.css";
import { Carousel } from "antd";
import React, { useRef } from "react";
import banner2 from "../../../assets/images/banner2.webp";
import banner3 from "../../../assets/images/banner3.png";
import banner1 from "../../../assets/images/banner.webp";
import ArrowDownIcon from "../../../assets/svg/arrowDownIcon";

const CarouselComponent: React.FC = () => {
  const ref = useRef<any>(null);
  const banners = [banner1, banner2, banner3];

  return (
    <div className="w-[70%] relative h-[250px]">
      <Carousel autoplay ref={ref}>
        {banners.map((banner, index) => (
          <img key={index} className="w-full h-[260px]" src={banner} alt="" />
        ))}
      </Carousel>
      <button
        className="slidePrev bg-[rgba(2,11,39,.4)] hover:bg-[rgba(2,11,39,.6)] rounded-full w-10 h-10 flex justify-center items-center absolute top-[35%] left-4 translate-y-2/4"
        onClick={() => {
          if (ref.current) {
            ref.current.prev();
          }
        }}
      >
        <ArrowDownIcon />
      </button>
      <button
        className="slideNext bg-[rgba(2,11,39,.4)] hover:bg-[rgba(2,11,39,.6)] rounded-full w-10 h-10 flex justify-center items-center absolute top-[35%] right-4 translate-y-2/4"
        onClick={() => {
          if (ref.current) {
            ref.current.next();
          }
        }}
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
};

export default CarouselComponent;
