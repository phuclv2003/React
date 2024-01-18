import { FC, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../services/products";



const ListByIdCate: FC = () => {
  const navigate = useNavigate();
  const [conditions, setConditions] = useState<any[]>([]);
  const { id } = useParams();
  const [isOpen] = useState(false);
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const detailProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const { data: dataProduct } = useGetAllProductsQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
    category_id: id,
    ...(min !== null && { min_price: min }),
    ...(max !== null && { max_price: max }),
  });
  const addCondition = (condition: any) => {
    setConditions([...conditions, condition]);
  };

  const removeCondition = (index: number) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const handleChange = (idMin: number | null, idMax: number | null, buttonIndex: number) => {
    setSelectedButton(buttonIndex);
    if (idMin) {
      setMin(idMin);
    } else {
      setMin(null);
    }
    if (idMax) {
      setMax(idMax);
    } else {
      setMax(null);
    }
  };

  const deleteData = () => {
    setSelectedButton(null);
    setMin(null);
    setMax(null);
  }
  return (
    <div className="container mx-auto pt-6">
      <div className="md:grid md:grid-cols-[289px_907fr] md:gap-5">
        <div className="hidden md:block">
          <div className="sticky top-3 rounded-xl bg-white pb-4">
            <div className="text-text-primary border-stroke-disable flex items-center border-b px-4 pt-3 pb-2">
              <span className="estore-icon mr-1 css-8u32eo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 16H14C14.5523 16 15 16.4477 15 17C15 17.5128 14.614 17.9355 14.1166 17.9933L14 18H10C9.44772 18 9 17.5523 9 17C9 16.4872 9.38604 16.0645 9.88338 16.0067L10 16H14H10ZM8 11H16C16.5523 11 17 11.4477 17 12C17 12.5128 16.614 12.9355 16.1166 12.9933L16 13H8C7.44772 13 7 12.5523 7 12C7 11.4872 7.38604 11.0645 7.88338 11.0067L8 11H16H8ZM5 6H19C19.5523 6 20 6.44772 20 7C20 7.51284 19.614 7.93551 19.1166 7.99327L19 8H5C4.44772 8 4 7.55228 4 7C4 6.48716 4.38604 6.06449 4.88338 6.00673L5 6H19H5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <h3 className="">Bộ lọc nâng cao</h3>
            </div>
            <div className="sm-scrollbar max-h-[calc(100vmin-45px-2*12px-16px)] overflow-auto px-4 [&amp;>:last-child]:pb-0" style={{ scrollbarGutter: "stable" }}>
              <div className="border-divider-1pt border-t pt-3 pb-2">
                <div className="flex cursor-pointer items-center gap-3">
                  <p className="css-1v577ri">Giá bán</p>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <ul className="w-full">
                      <li className="mt-2">
                        <button
                          onClick={() => {handleChange(null, 100000, 1); addCondition('Dưới 100.000đ');}}
                          
                          type="button"
                          className={`py-[13px] px-[9px] rounded-md ant-btn ant-btn-default w-full estore-btn-selected !duration-200 !ease-in-out ${selectedButton === 1 ? 'shadow-[inset_0_0_0_1px_#1250dc]' : 'shadow-[inset_0_0_0_1px_#c1c8d1]'
                            }`}
                        >
                          <span className="">Dưới 100.000đ</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <button
                          onClick={() => {handleChange(100000, 300000, 2); addCondition('Từ 100.000đ đến 300.000đ');}}
                          type="button"
                          className={`py-[13px] px-[9px] rounded-md ant-btn ant-btn-default w-full estore-btn-selected !duration-200 !ease-in-out ${selectedButton === 2 ? 'shadow-[inset_0_0_0_1px_#1250dc]' : 'shadow-[inset_0_0_0_1px_#c1c8d1]'
                            }`}
                        >
                          <span className="">100.000đ đến 300.000đ</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <button
                          onClick={() => {handleChange(300000, 500000, 3); addCondition('Từ 300.000đ đến 500.000đ');}}
                          type="button"
                          className={`py-[13px] px-[9px] rounded-md ant-btn ant-btn-default w-full estore-btn-selected !duration-200 !ease-in-out ${selectedButton === 3 ? 'shadow-[inset_0_0_0_1px_#1250dc]' : 'shadow-[inset_0_0_0_1px_#c1c8d1]'
                            }`}
                        >
                          <span className="">300.000đ đến 500.000đ</span>
                        </button>
                      </li>
                      <li className="mt-2">
                        <button
                          type="button"
                          onClick={() => {handleChange(500000, null, 4); addCondition('Trên 500.000đ');}}
                          className={`py-[13px] px-[9px] rounded-md ant-btn ant-btn-default w-full estore-btn-selected !duration-200 !ease-in-out ${selectedButton === 4 ? 'shadow-[inset_0_0_0_1px_#1250dc]' : 'shadow-[inset_0_0_0_1px_#c1c8d1]'
                            }`}
                        >
                          <span className="">Trên 500.000đ</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="border-divider-1pt border-t pt-3 pb-2 first:border-t-0 first:pt-4">
                <div className="flex cursor-pointer items-center gap-3">
                  <p className="css-1v577ri">Xuất xứ thương hiệu</p>
                  <div className="ml-auto h-5 w-5 shrink-0">
                    <svg
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      className="rotate-0 transition-[transform]"
                    >
                      <path
                        d="M5.25383 8.29289C5.64435 7.90237 6.27752 7.90237 6.66804 8.29289L12.9609 14.5858L19.2538 8.29289C19.6444 7.90237 20.2775 7.90237 20.668 8.29289C21.0586 8.68342 21.0586 9.31658 20.668 9.70711L13.668 16.7071C13.2775 17.0976 12.6444 17.0976 12.2538 16.7071L5.25383 9.70711C4.86331 9.31658 4.86331 8.68342 5.25383 8.29289Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="Accordion_accordion-wrapper__jjlyE transition-[grid-template-rows]">
                  <div>
                    <div className="border-stroke-disable mt-2 rounded-[35px] border py-[5px] px-3">
                      <form>
                        <div className="flex items-center">
                          <span className="estore-icon text-icon-secondary mr-2 css-wi4pw5">
                            <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10.9414 1.93125C5.98269 1.93125 1.94336 5.97057 1.94336 10.9293C1.94336 15.888 5.98269 19.9352 10.9414 19.9352C13.0594 19.9352 15.0074 19.193 16.5469 17.9606L20.2949 21.7066C20.4841 21.888 20.7367 21.988 20.9987 21.9853C21.2607 21.9826 21.5112 21.8775 21.6966 21.6923C21.882 21.5072 21.9875 21.2569 21.9906 20.9949C21.9936 20.7329 21.8939 20.4801 21.7129 20.2907L17.9648 16.5427C19.1983 15.0008 19.9414 13.0498 19.9414 10.9293C19.9414 5.97057 15.9001 1.93125 10.9414 1.93125ZM10.9414 3.93128C14.8192 3.93128 17.9395 7.05148 17.9395 10.9293C17.9395 14.8071 14.8192 17.9352 10.9414 17.9352C7.06357 17.9352 3.94336 14.8071 3.94336 10.9293C3.94336 7.05148 7.06357 3.93128 10.9414 3.93128Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                          <input
                            type="text"
                            placeholder="Tìm theo tên"
                            className="text-icon-black placeholder:text-icon-secondary mr-2 w-full outline-none placeholder:text-[14px] placeholder:leading-5"
                            value=""
                          />
                        </div>
                      </form>
                    </div>
                    <ul>
                      <li className="mt-2 flex">
                        <label className="ant-checkbox-wrapper ant-checkbox-wrapper-checked text-text-primary css-hgw3zq" style={{ cursor: "not-allowed" }}>
                          <span className="ant-checkbox ant-checkbox-checked">
                            <input name="brandOrigin--" id="brandOrigin--" type="checkbox" className="ant-checkbox-input" value="" checked />
                            <span className="ant-checkbox-inner"></span>
                          </span>
                          <span>Tất cả</span>
                        </label>
                      </li>
                      <li className="mt-2 flex">
                        <label className="ant-checkbox-wrapper text-text-primary css-hgw3zq">
                          <span className="ant-checkbox">
                            <input name="brandOrigin--Việt Nam" id="brandOrigin--Việt Nam" type="checkbox" className="ant-checkbox-input" value="" />
                            <span className="ant-checkbox-inner"></span>
                          </span>
                          <span>Việt Nam</span>
                        </label>
                      </li>
                      <li className="mt-2 flex">
                        <label className="ant-checkbox-wrapper text-text-primary css-hgw3zq">
                          <span className="ant-checkbox">
                            <input name="brandOrigin--Hoa Kỳ" id="brandOrigin--Hoa Kỳ" type="checkbox" className="ant-checkbox-input" value="" />
                            <span className="ant-checkbox-inner"></span>
                          </span>
                          <span>Hoa Kỳ</span>
                        </label>
                      </li>
                      <li className="mt-2 flex">
                        <label className="ant-checkbox-wrapper text-text-primary css-hgw3zq">
                          <span className="ant-checkbox">
                            <input name="brandOrigin--Nhật Bản" id="brandOrigin--Nhật Bản" type="checkbox" className="ant-checkbox-input" value="" />
                            <span className="ant-checkbox-inner"></span>
                          </span>
                          <span>Nhật Bản</span>
                        </label>
                      </li>
                      <li className="mt-2 flex">
                        <label className="ant-checkbox-wrapper text-text-primary css-hgw3zq">
                          <span className="ant-checkbox">
                            <input name="brandOrigin--Úc" id="brandOrigin--Úc" type="checkbox" className="ant-checkbox-input" value="" />
                            <span className="ant-checkbox-inner"></span>
                          </span>
                          <span>Úc</span>
                        </label>
                      </li>
                    </ul>
                    <button className="css-15sc8tc flex w-full items-center py-2" >
                      <span className="estore-icon mr-2 css-wi4pw5">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18.9516 10.4793C19.2944 10.8392 19.2806 11.4088 18.9207 11.7517L12.6201 17.7533C12.2725 18.0844 11.7262 18.0844 11.3786 17.7533L5.07808 11.7517C4.71818 11.4088 4.70433 10.8392 5.04716 10.4793C5.38999 10.1193 5.95967 10.1055 6.31958 10.4483L11.9994 15.8586L17.6792 10.4483C18.0391 10.1055 18.6088 10.1193 18.9516 10.4793ZM18.9516 5.67926C19.2944 6.03916 19.2806 6.60884 18.9207 6.95167L12.6201 12.9533C12.2725 13.2844 11.7262 13.2844 11.3786 12.9533L5.07808 6.95167C4.71818 6.60884 4.70433 6.03916 5.04716 5.67926C5.38999 5.31935 5.95967 5.3055 6.31958 5.64833L11.9994 11.0586L17.6792 5.64833C18.0391 5.30551 18.6088 5.31935 18.9516 5.67926Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-[#020b27] text-[18px] font-semibold">Danh sách sản phẩm </h2>
          </div>
          {conditions.length > 0 && (
              <div className="mt-4">
                <span className="text-text-secondary hidden whitespace-nowrap md:inline">
                  Lọc theo ({conditions.length})
                </span>
                <div className="no-scrollbar border-t-stroke-disable flex flex-wrap items-center gap-2 overflow-x-auto border bg-white py-3 px-4 md:mb-3 md:overflow-x-visible md:rounded-xl md:border-0">
                  {conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="ant-tag !mr-2 shrink-0 whitespace-nowrap last:!mr-0 estore-tag type-1-secondary size-medium css-nhkq40 css-10ed4xt"
                      style={{ cursor: 'auto' }}
                    >
                      <p className="css-15sc8tc">
                        <span className="css-15sc8tc">{condition}</span>
                      </p>
                      <span className="ant-tag-close-icon">
                        <span
                          className="estore-icon css-u5y24t"
                          onClick={() => removeCondition(index)}
                        >
                          <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M4.21263 4.3871L4.29582 4.29289C4.65631 3.93241 5.22354 3.90468 5.61583 4.2097L5.71004 4.29289L12.0029 10.585L18.2958 4.29289C18.6863 3.90237 19.3195 3.90237 19.71 4.29289C20.1006 4.68342 20.1006 5.31658 19.71 5.70711L13.4179 12L19.71 18.2929C20.0705 18.6534 20.0982 19.2206 19.7932 19.6129L19.71 19.7071C19.3496 20.0676 18.7823 20.0953 18.39 19.7903L18.2958 19.7071L12.0029 13.415L5.71004 19.7071C5.31951 20.0976 4.68635 20.0976 4.29582 19.7071C3.9053 19.3166 3.9053 18.6834 4.29582 18.2929L10.5879 12L4.29582 5.70711C3.93534 5.34662 3.90761 4.77939 4.21263 4.3871L4.29582 4.29289L4.21263 4.3871Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          {
            (dataProduct && dataProduct.data.length > 0) ? (
              <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
                {dataProduct?.data?.map((item: any) => (
                  <div
                    onClick={() => detailProduct(item.id)}
                    key={item.id}
                    className="bg-white relative rounded-xl border border-white hover:border-[#1250dc] transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <div className="p-3">
                      <div className="px-1 text-center md:px-4">
                        <img
                          className="w-full"
                          src={"http://localhost:8000/" + item.image}
                          alt="product"
                        />
                      </div>
                      <div>
                        <h3 className="text-body2 font-semibold">{item.name}</h3>
                        <div className="mt-1">
                          <span className="text-body2 font-semibold text-[#1250dc] ">
                            {new Intl.NumberFormat("vi-VN").format(item.price)}
                            <span> đ</span>
                          </span>
                          <span className="text-caption font-medium text-[#1250dc] text-[12px] pl-1">
                            /<span className="pl-1">{item.unit}</span>
                          </span>
                        </div>
                        <div className="m-auto flex pt-1 mt-6">
                          <div className="w-fit rounded-xl bg-[#edf0f3] px-2 py-1">
                            <p className="w-fit text-caption font-medium text-[#4a4f63] line-clamp-2 text-[12px]">
                              {item.unit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center pt-5">
                <div className="text-center">
                  <div className="mx-auto w-full">
                    <img
                      src="https://nhathuoclongchau.com.vn/estore-images/illustration-not-found.svg"
                      alt=""
                    />
                  </div>
                  <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                    Ôi! Không tìm thấy sản phẩm nào phù hợp
                  </h3>
                  <p className="max-w-[300px] text-[#728091] text-[16px]">
                    Hãy thử lại bằng cách thay đổi điều kiện lọc hoặc
                  </p>
                  <div
                    className="flex justify-center mt-2 cursor-pointer"
                  >
                    <div
                      onClick={() => deleteData()}
                      style={{
                        background:
                          "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                      }}
                      className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                    > Xóa tất cả bộ lọc
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default ListByIdCate;