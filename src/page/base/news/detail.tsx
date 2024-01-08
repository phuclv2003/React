import React from 'react'
import { useGetNewsByIdQuery } from '../../../services/new'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import dayjs from 'dayjs';
import "../../../assets/css/common.css";

type Props = {}

const DetailNews = (props: Props) => {
  const { id } = useParams();
  const { data: data } = useGetNewsByIdQuery(id);
  console.log(data);

  return (
    <>
      {data && (
        <div >
          <div className='container mx-auto'>
            <Breadcrumb nameLink='Tin tức' name={data.title} />
          </div>
          <div className='bg-white'>
            <div className='container mx-auto '>
              <div className='block gap-[75px] py-4 md:grid md:grid-cols-[234px_700px_1fr] md:py-6'>
                <div></div>
                <div>
                  <div className='text-[28px] font-semibold text-[#020b27]'>{data.title}: Nguyên nhân, dấu hiệu nhiễm bệnh và cách phòng bệnh</div>
                  <div className="border-gray-2 mt-3 mb-2 border-t border-solid"></div>
                  <div className='flex justify-between'>
                    <div className='flex gap-1 items-center text-[#657384]'>
                      <span><svg width="1em" color='#657384' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5V17.75C3 19.5449 4.45507 21 6.25 21H17.75C19.5449 21 21 19.5449 21 17.75V8.5H3ZM16.75 15C17.4404 15 18 15.5596 18 16.25C18 16.9404 17.4404 17.5 16.75 17.5C16.0596 17.5 15.5 16.9404 15.5 16.25C15.5 15.5596 16.0596 15 16.75 15ZM12 15C12.6904 15 13.25 15.5596 13.25 16.25C13.25 16.9404 12.6904 17.5 12 17.5C11.3096 17.5 10.75 16.9404 10.75 16.25C10.75 15.5596 11.3096 15 12 15ZM16.75 10.5C17.4404 10.5 18 11.0596 18 11.75C18 12.4404 17.4404 13 16.75 13C16.0596 13 15.5 12.4404 15.5 11.75C15.5 11.0596 16.0596 10.5 16.75 10.5ZM12 10.5C12.6904 10.5 13.25 11.0596 13.25 11.75C13.25 12.4404 12.6904 13 12 13C11.3096 13 10.75 12.4404 10.75 11.75C10.75 11.0596 11.3096 10.5 12 10.5ZM7.25 10.5C7.94036 10.5 8.5 11.0596 8.5 11.75C8.5 12.4404 7.94036 13 7.25 13C6.55964 13 6 12.4404 6 11.75C6 11.0596 6.55964 10.5 7.25 10.5ZM6.25 3C4.45507 3 3 4.45507 3 6.25V7H21V6.25C21 4.45507 19.5449 3 17.75 3H6.25Z" fill="currentColor"></path></svg></span>
                      <span>{dayjs(data?.created_at).format("DD-MM-YYYY")}</span>
                    </div>
                    <div>
                      <div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 mb-6 md:mb-[28px]">
                    <div className="rounded-[12px] bg-gray-1,5 p-5 md:px-5 md:pt-6 md:pb-5  css-12owzhw">
                      <span className="estore-icon absolute left-[20px] text-[20px] md:top-[-10px] md:text-[30px]  css-d0ijn6" >
                        <svg width={30} viewBox="0 0 29 21" color='#a9b2be' fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.38849 20.4377C6.53555 20.4437 5.69158 20.2636 4.91543 19.9098C4.13928 19.5561 3.44967 19.0372 2.89469 18.3895C2.28126 17.717 1.80373 16.9322 1.48845 16.0784C1.14739 15.2053 0.971171 14.2766 0.96875 13.3393C1.01951 11.235 1.67774 9.19024 2.86411 7.45148C4.17271 5.41935 5.90348 3.69275 7.93877 2.38906C9.7363 1.20701 11.1446 0.615991 12.1636 0.615991C12.5345 0.603983 12.8958 0.735368 13.1724 0.982837C13.3045 1.10816 13.4083 1.26027 13.4769 1.42898C13.5454 1.5977 13.5771 1.77911 13.5698 1.96107C13.5433 2.30048 13.4197 2.62511 13.2137 2.89616C13.0077 3.16721 12.7281 3.37321 12.4081 3.48958C10.8978 4.1993 9.52047 5.16301 8.33618 6.33872C7.52301 7.21303 7.11337 7.855 7.11337 8.26464C7.11337 8.67428 7.41907 8.87606 8.03048 8.96777L8.42789 9.0289L8.88644 9.05948C10.1594 9.22972 11.3167 9.88728 12.1147 10.8937C12.9463 11.9625 13.3787 13.288 13.3375 14.6416C13.3598 16.0975 12.8111 17.5044 11.809 18.5607C11.2478 19.1697 10.5633 19.6521 9.8011 19.9758C9.03886 20.2995 8.21638 20.4569 7.38849 20.4377Z" fill="currentColor"></path><path d="M21.8321 20.4379C20.9784 20.4432 20.1337 20.2627 19.3567 19.9091C18.5797 19.5554 17.8889 19.037 17.3322 18.3897C16.7187 17.7173 16.2412 16.9325 15.9259 16.0786C15.5849 15.2056 15.4087 14.2769 15.4062 13.3396C15.457 11.2352 16.1152 9.19049 17.3016 7.45173C18.6124 5.41932 20.3452 3.69276 22.3824 2.38931C24.1717 1.20726 25.578 0.616238 26.6011 0.616238C26.9723 0.602301 27.3343 0.733941 27.6099 0.983084C27.742 1.10841 27.8458 1.26051 27.9143 1.42923C27.9829 1.59794 28.0146 1.77936 28.0073 1.96132C27.9808 2.30073 27.8572 2.62536 27.6512 2.89641C27.4452 3.16746 27.1656 3.37346 26.8456 3.48983C25.3379 4.20098 23.9629 5.16457 22.7798 6.33897C21.9646 7.21124 21.557 7.85321 21.557 8.26489C21.557 8.65007 21.8627 8.87631 22.4802 8.96802L22.8776 9.02915L23.3362 9.05973C24.6076 9.22963 25.7631 9.8874 26.5583 10.8939C27.3922 11.9615 27.8249 13.2879 27.7811 14.6418C27.8034 16.0978 27.2547 17.5046 26.2526 18.561C25.6919 19.1706 25.0075 19.6534 24.2452 19.9772C23.4828 20.3009 22.6601 20.458 21.8321 20.4379Z" fill="currentColor"></path></svg>
                      </span>
                      <p className="text-base font-normal text-[#020b27]">{data.describe}
                      </p>
                    </div>
                  </div>
                  <div>
                    {data.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailNews