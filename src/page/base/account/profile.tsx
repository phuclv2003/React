import React from 'react'
import Breadcrumb from '../../../components/Breadcrumb'
import { useGetProfileQuery } from '../../../services/account';
import UserHover from '../../../assets/svg/userHover';
import OrderIcon from '../../../assets/svg/order';
import LogOutIcon from '../../../assets/svg/logOut';
import { Outlet } from 'react-router';

type Props = {}

const Profile = (props: Props) => {
  const { data: user } = useGetProfileQuery();
  const logout = async () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem("token");
    await new Promise(resolve => setTimeout(resolve, 0));
  };
  const someFunction = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <>
      <div className="container mx-auto">
        <div>
          <Breadcrumb nameLink="Cá nhân" link="/products" name={"Thông tin cá nhân"} />
        </div>
        <div className='flex gap-5'>
          <div className='block basis-80'>
            <div style={{ backgroundImage: 'url(https://nhathuoclongchau.com.vn/estore-images/profile/v2/background-info.png)' }} className='text-center flex justify-center rounded-xl py-4 bg-no-repeat bg-cover bg-center p-16 min-h-[176px]'>
              <div className='flex flex-col'>
                <div className='text-center flex justify-center'><img src="https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile.svg" alt="" /></div>
                <div className='text-white text-14px font-medium mt-2'>
                  {user?.account_name}
                </div>
              </div>
            </div>
            <div className='mt-4 bg-white rounded-xl'>
              <div className="flex items-center gap-x-2 px-3 py-4 cursor-pointer hover:text-[#1250dc] hover:bg-[#edf0f3] transition-all delay-200">
                <UserHover />
                <div className='text-16 font-medium'>Thông tin cá nhân</div>
              </div>
              <div className="flex items-center gap-x-2 px-3 py-4 cursor-pointer hover:text-[#1250dc] hover:bg-[#edf0f3] transition-all delay-200">
                <OrderIcon />
                <div className='text-16 font-medium'>Đơn hàng của tôi</div>
              </div>
              <div
                className="flex items-center gap-x-2 px-3 py-4 cursor-pointer hover:text-[#1250dc hover:bg-[#edf0f3] transition-all delay-200"
                onClick={() => {
                  someFunction();
                }}
              >
                <div>
                  <LogOutIcon />
                </div>
                <div className='text-16 font-medium'>Đăng xuất</div>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile