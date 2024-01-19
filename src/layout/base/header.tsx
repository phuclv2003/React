import { Menu, Popover } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/common.css";
import header_desktop from "../../assets/images/header_desktop_a4bfadd206.webp";
import megaphone from "../../assets/images/megaphone_b8025908d5.webp";
import ArrowDownIcon from "../../assets/svg/arrowDownIcon";
import LogOutIcon from "../../assets/svg/logOut";
import OrderIcon from "../../assets/svg/order";
import PhoneIcon from "../../assets/svg/phoneIcon";
import SearchIcon from "../../assets/svg/searchIcon";
import ShoppingCartIcon from "../../assets/svg/shoppingCart";
import UserIcon from "../../assets/svg/user";
import UserHover from "../../assets/svg/userHover";
import { useGetProfileQuery } from "../../services/account";
import { useGetCategoryQuery } from "../../services/category";

const HeaderBase: FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetProfileQuery();

  const { data: cate } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const cart = () => {
    navigate(`/cart`);
  };
  const items = cate?.map((item) => {
    if (!item.sub_category) {
      return {
        label: (
          <Link to={item.id.toString()} key={item.id}>
            {item.category_name}
          </Link>
        ),
        key: `main_${item.id}`,
      };
    }

    const subMenuItems = item.sub_category?.map((cate) => ({
      label: (
        <Link
          to={`category/${cate.id.toString()}`}
          key={cate.id}
          className="flex items-center gap-x-2"
        >
          <img className="w-[20px]" src={cate.image} alt="" />
          {cate.category_name}
        </Link>
      ),
      key: `sub_${cate.id}`,
    }));

    return {
      label: (
        <div
          key={item.id}
          className="flex items-center gap-x-1 arrow-down-icon"
        >
          {item.sub_category && item.sub_category?.length > 0 ? (
            <>
              <div>{item.category_name}</div>
              <ArrowDownIcon />
            </>
          ) : (
            <Link to={`category/${item.id}`}>{item.category_name}</Link>
          )}
        </div>
      ),
      key: `main_${item.id}`,
      children: subMenuItems,
    };
  });

  const logout = async () => {
    await localStorage.removeItem("tokenRefresh");
    await localStorage.removeItem("token");
    await new Promise((resolve) => setTimeout(resolve, 0));
  };
  const someFunction = async () => {
    await logout();
    window.location.reload();
  };
  const content = (
    <div className="m-0 p-0">
      <div className="flex items-center gap-x-2 my-4 cursor-pointer">
        <UserHover />
        <Link to={"/profile/editProfile"}>Thông tin cá nhân</Link>
      </div>
      <div className="flex items-center gap-x-2 my-4 cursor-pointer">
        <OrderIcon />
        <Link to={"/profile/listOrderUser"}>Đơn hàng của tôi</Link>
      </div>
      <div
        className="flex items-center gap-x-2 my-4 cursor-pointer"
        onClick={() => {
          someFunction();
        }}
      >
        <div>
          <LogOutIcon />
        </div>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
  return (
    <>
      <header
        style={{ backgroundImage: `url(${header_desktop})` }}
        className="bg-center bg-cover bg-no-repeat"
      >
        <div style={{ boxShadow: "0 0 0 1px #2167dd" }} className="py-2">
          <div className="flex w-full justify-between container mx-auto">
            <div className="flex gap-x-2 text-white items-center">
              <div>
                <img className="w-4 h-4" src={megaphone} alt="" />
              </div>
              <span className="cursor-pointer inline-block font-semibold">
                Trung tâm tiêm chủng Long Châu {""}
                <Link to="#" className="underline decoration-solid">
                  Xem chi tiết
                </Link>
              </span>
            </div>
            <div className="hidden md:flex gap-x-2 text-white items-center">
              <PhoneIcon />
              <span className="ml-1 text-sm font-medium text-white">
                Tư vấn ngay: <Link to="tel:+18006938">1800 6938</Link>
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="container mx-auto grid grid-cols-[40px_1fr_90px] grid-rows-[40px] content-center pt-1.5 pb-2 md:grid-cols-[200px_1fr_300px] md:grid-rows-[56px] md:pt-4 md:pb-[44px]">
            <Link to="">
              <img
                src="https://cms-prod.s3-sgn09.fptcloud.com/smalls/logo_web_a11ae0bbab.svg"
                alt=""
              />
            </Link>
            <div className=" mx-auto w-full flex justify-center">
              <div className="inline-flex items-center bg-white rounded-[35px] p-[6px] pl-4 w-[90%]">
                <input
                  placeholder="Tìm tên thuốc, bệnh lý, thực phẩm chức năng..."
                  className="w-full text-ellipsis bg-transparent outline-none placeholder:text-text-tertiary placeholder-shown:text-ellipsis h-[40px] text-body1 placeholder:text-label1"
                  type="text"
                />
                <button className="shrink-0 rounded-full bg-layer-blue-1,5 w-[40px] h-[40px] p-[10px] ml-3 bg-[#c1d0f6] flex items-center justify-center">
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="flex h-full items-center justify-between">
              {!user ? (
                <div className="flex items-center cursor-pointer justify-center">
                  <div>
                    <UserIcon />
                  </div>
                  <div className="text-white font-medium text-[16px] ml-2">
                    <Link to={"/login"}>Đăng nhập</Link>
                  </div>
                </div>
              ) : (
                <Popover
                  placement="bottom"
                  content={content}
                  className="flex items-center cursor-pointer justify-center"
                >
                  <div>
                    <UserIcon />
                  </div>
                  <div className="text-white font-medium text-[16px] ml-2">
                    <p>{user.account_name}</p>
                  </div>
                </Popover>
              )}

              <div
                onClick={() => cart()}
                className="flex items-center bg-[#1250dc] relative shrink-0 md:ml-auto rounded-[42px] w-[134px] h-[48px] justify-center cursor-pointer"
              >
                <div>
                  <ShoppingCartIcon />
                </div>
                <div className="text-white font-medium text-[16px] ml-2">
                  Giỏ hàng
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className=" flex justify-center border-b-[1px] w-full border-[rgba(5, 5, 5, 0.06)]">
        <div className="menu-container">
          <Menu mode="horizontal" items={items} />
        </div>
      </nav>
    </>
  );
};

export default HeaderBase;
