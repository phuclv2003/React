import React, { useState } from 'react'
import { useGetProfileQuery } from '../../../services/account';
import dayjs from 'dayjs';
import { useFormik } from 'formik';

type Props = {}

const EditProfile = (props: Props) => {
  const { data: user } = useGetProfileQuery();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleEditButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const formik = useFormik<any>({
    initialValues: {
      account_name: user?.account_name || '',
      tel: user?.tel || '',
      mail_address: user?.mail_address || '',
    },
    onSubmit: async (values: any) => {
      try {

      } catch (error) {
        console.error('Lỗi', error);
      }
    },
  });
  return (
    <>
      <div className='rounded-lg bg-white'>
        <div className='py-3 px-4 border-b'>
          <p className='font-medium text-[16px]'>Thông tin cá nhân</p>
        </div>
        <div>
          <div className='mx-auto max-w-[440px] pt-3 pb-6'>
            <div className='flex justify-center'>
              <img src="https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile-large.svg" alt="" />
            </div>
            <div className='text-center'>
              {!isFormVisible && (
                <div className='mt-6 mx-4'>
                  <div className='flex items-center justify-between border-b py-4'>
                    <div className='text-[14px] font-normal text-[#4a4f63]'>Họ và tên</div>
                    <div className='text-[14px] font-medium text-[#020b27]'>{user?.account_name}</div>
                  </div>
                  <div className='flex items-center justify-between border-b py-4'>
                    <div className='text-[14px] font-normal text-[#4a4f63]'>Số điện thoại</div>
                    <div className='text-[14px] font-medium text-[#020b27]'>{user?.tel}</div>
                  </div>
                  <div className='flex items-center justify-between border-b py-4'>
                    <div className='text-[14px] font-normal text-[#4a4f63]'>Địa chỉ email</div>
                    <div className='text-[14px] font-medium text-[#020b27]'>{user?.mail_address}</div>
                  </div>
                  <div className='flex items-center justify-between border-b py-4'>
                    <div className='text-[14px] font-normal text-[#4a4f63]'>Ngày sinh</div>
                    <div className='text-[14px] font-medium text-[#020b27]'>{dayjs(user?.birthday).format("DD-MM-YYYY")}</div>
                  </div>
                </div>
              )}
              {isFormVisible && (
                <div className='mt-6 mx-4'>
                  <form action="" onSubmit={formik.handleSubmit}>
                    <div className="cs-wrapper-text w-full css-wuiu1">
                      <span className="custom-ant-input-affix-wrapper css-10ed4xt">
                        <input placeholder="Họ và tên"
                          name="account_name"
                          onChange={formik.handleChange}
                          value={formik.values.account_name} className="custom-ant-input css-10ed4xt p-0 w-full" type="text" />
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">Họ và tên</span>
                        </span>
                      </span>
                    </div>
                    <div className="cs-wrapper-text w-full css-wuiu1 mt-4">
                      <span className="custom-ant-input-affix-wrapper css-10ed4xt">
                        <input placeholder="Số điện thoại"
                          name="tel"
                          onChange={formik.handleChange}
                          value={formik.values.tel} className="custom-ant-input css-10ed4xt p-0 w-full" type="text" />
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">Số điện thoại</span>
                        </span>
                      </span>
                    </div>
                    <div className="cs-wrapper-text w-full css-wuiu1 mt-4">
                      <span className="custom-ant-input-affix-wrapper custom-ant-input-affix-wrapper-disabled css-10ed4xt">
                        <input placeholder="Địa chỉ email"
                          name="mail_address"
                          onChange={formik.handleChange}
                          value={formik.values.mail_address}
                          className="custom-ant-input custom-ant-input-disabled css-10ed4xt p-0 w-full" type="text" />
                        <span className="custom-ant-input-suffix">
                          <span className="optional-label">Địa chỉ email</span>
                        </span>
                      </span>
                    </div>
                  </form>
                </div>
              )}
              <div className='mt-6 '>
                <button onClick={handleEditButtonClick} className='rounded-[50px] text-[#1250dc] min-h-[48px] font-medium h-[48px] py-[12px] px-[24px] border-[#eaeffa] bg-[#eaeffa]'>Chỉnh sửa thông tin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile