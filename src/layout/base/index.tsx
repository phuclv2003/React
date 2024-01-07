import { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderBase from "./header";
import FooterBase from "./footer";

const LayoutBase: FC = () => {
  return (
    <>
      <HeaderBase />
      <div className="bg-[#edf0f3] pb-9">
        <Outlet />
      </div>
      <FooterBase />
    </>
  );
};
export default LayoutBase;
