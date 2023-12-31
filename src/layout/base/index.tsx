import { FC } from "react";
import { Outlet } from "react-router-dom";
import HeaderBase from "./header";
import FooterBase from "./footer";

const LayoutBase: FC = () => {
  return (
    <>
      <HeaderBase />
      <Outlet />
      <FooterBase />
    </>
  );
};
export default LayoutBase;
