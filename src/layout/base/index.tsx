import { FC } from "react";
import { Outlet } from "react-router-dom";

const LayoutBase: FC = () => {
  return (
    <>
      <div>Herder</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
};
export default LayoutBase;
