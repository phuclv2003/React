import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useState } from 'react'
import { useGetOrderQuery } from '../../../../services/order'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const ListOrderUser = (props: Props) => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(null);
  const { data: dataProduct, refetch } = useGetOrderQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
    ...(id !== null && { state: id }),
  });
  const handleChange = (key: string) => {
    if (Number(key) === 0) {
      setId(null);
      refetch();
    } else {
      setId(Number(key));
      refetch();
    }
  };
  const home = () => {
    navigate("/");
  };

  const orderDetail = (id: number) => {
    navigate(`/order/${id}`);
  };
  console.log(dataProduct);
  return (
    <div>
      <div>
        <p className="title text-heading3 text-text-primary line-clamp-1 md:!line-clamp-1 flex-1 font-semibold">
          Đơn hàng của tôi
        </p>
      </div>
      <Tabs defaultActiveKey="0" onChange={handleChange} className=" w-full">
        <TabPane tab="Tất cả" key="0" className=''>
          {dataProduct && dataProduct.data.length > 0 ? (dataProduct.data.map((item: any) => (
            <div onClick={() => orderDetail(item.id)}  key={item.id} className='bg-white w-full mt-2 px-3'>
              <div>
                <div className="shadow-divider-1pt flex px-4 py-3 shadow-[0_1px_0_0]">
                  <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                    <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng 11/01/2024</span>
                    <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                      <div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                      </div><div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[10px] flex items-center justify-center self-start">
                    <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                    <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                  </div>
                </div>
                <div className='px-4 py-3'>
                  {item.items && item.items.map((item: any) => (
                    <div key={item.product_id} className="lc-row relative flex flex-wrap mt-2">
                      <div className="lc-col lc-col-12 !basis-[586px] md:!w-[586px] md:!max-w-[586px] css-847gtr">
                        <div className="flex items-center">
                          <div className="border-stroke-disable h-16 w-16 max-w-full basis-16 self-baseline rounded-lg border py-[6px] px-[6px]">
                            <div>
                              <picture className="h-[50px] w-[50px]">
                                <source
                                  srcSet={item.image}
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <source
                                  srcSet="/estore-images/fallback-images/default/img-default-1_1.svg"
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  alt="product-image"
                                  className="h-[50px] w-[50px]"
                                  src="/estore-images/fallback-images/error/img-error-1_1.svg"
                                />
                              </picture>
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <p className="text-text-primary line-clamp-2">
                                {item.product_name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="lc-col lc-col-4 !hidden !max-w-[100%] !flex-1 md:!block css-o0h841">
                        <div className="flex justify-end">
                          <div>
                            <p className="css-jey85n text-text-primary line-clamp-1">
                              {new Intl.NumberFormat("vi-VN").format(item.price)}
                              <span> đ</span>
                            </p>
                          </div>
                          <div className="ml-4 basis-20 text-right">
                            <p className="css-1oqd6bl text-text-secondary line-clamp-1">x{item.quantity} {item.unit}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border-divider-1pt border-t mt-2 pt-3  w-full'>
                    <div className="flex cursor-pointer py-3 justify-between" >
                      <div className="inline-flex cursor-pointer items-center">
                        <button className="text-text-focus text-blue-400">Xem chi tiết</button>
                      </div>
                      <div>
                        <span className="text-text-secondary">Thành tiền:</span>
                        <span className="css-jey85n text-text-focus ml-2 text-blue-400 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.total_price)}
                          <span> đ</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex justify-center pt-5">
              <div className="text-center">
                <div className="mx-auto w-full">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/default/profile/order-not-found.svg"
                    alt=""
                  />
                </div>
                <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                  Bạn chưa có đơn hàng nào.
                </h3>
                <p className="max-w-[300px] text-[#728091] text-[16px]">
                  Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!
                </p>
                <div
                  onClick={() => home()}
                  className="flex justify-center mt-2 cursor-pointer"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                    }}
                    className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                  >
                    Khám phá ngay
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabPane>
        <TabPane tab="Đang xử lý" key="1">
        {dataProduct && dataProduct.data.length > 0 ? (dataProduct.data.map((item: any) => (
            <div key={item.id} className='bg-white w-full mt-2 px-3'>
              <div>
                <div className="shadow-divider-1pt flex px-4 py-3 shadow-[0_1px_0_0]">
                  <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                    <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng 11/01/2024</span>
                    <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                      <div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                      </div><div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[10px] flex items-center justify-center self-start">
                    <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                    <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                  </div>
                </div>
                <div className='px-4 py-3'>
                  {item.items && item.items.map((item: any) => (
                    <div key={item.product_id} className="lc-row relative flex flex-wrap mt-2">
                      <div className="lc-col lc-col-12 !basis-[586px] md:!w-[586px] md:!max-w-[586px] css-847gtr">
                        <div className="flex items-center">
                          <div className="border-stroke-disable h-16 w-16 max-w-full basis-16 self-baseline rounded-lg border py-[6px] px-[6px]">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <picture className="h-[50px] w-[50px]">
                                <source
                                  srcSet={item.image}
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <source
                                  srcSet="/estore-images/fallback-images/default/img-default-1_1.svg"
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  alt="product-image"
                                  className="h-[50px] w-[50px]"
                                  src="/estore-images/fallback-images/error/img-error-1_1.svg"
                                />
                              </picture>
                            </a>
                          </div>
                          <div className="ml-3 flex-1">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <p className="text-text-primary line-clamp-2">
                                {item.product_name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="lc-col lc-col-4 !hidden !max-w-[100%] !flex-1 md:!block css-o0h841">
                        <div className="flex justify-end">
                          <div>
                            <p className="css-jey85n text-text-primary line-clamp-1">
                              {new Intl.NumberFormat("vi-VN").format(item.price)}
                              <span> đ</span>
                            </p>
                          </div>
                          <div className="ml-4 basis-20 text-right">
                            <p className="css-1oqd6bl text-text-secondary line-clamp-1">x{item.quantity} Hộp</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border-divider-1pt border-t mt-2 pt-3  w-full'>
                    <div className="flex cursor-pointer py-3 justify-between" >
                      <div className="inline-flex cursor-pointer items-center">
                        <button className="text-text-focus text-blue-400">Xem chi tiết</button>
                      </div>
                      <div>
                        <span className="text-text-secondary">Thành tiền:</span>
                        <span className="css-jey85n text-text-focus ml-2 text-blue-400 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.total_price)}
                          <span> đ</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex justify-center pt-5">
              <div className="text-center">
                <div className="mx-auto w-full">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/default/profile/order-not-found.svg"
                    alt=""
                  />
                </div>
                <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                  Bạn chưa có đơn hàng nào.
                </h3>
                <p className="max-w-[300px] text-[#728091] text-[16px]">
                  Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!
                </p>
                <div
                  onClick={() => home()}
                  className="flex justify-center mt-2 cursor-pointer"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                    }}
                    className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                  >
                    Khám phá ngay
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabPane>
        <TabPane tab="Đã xác nhận" key="2">
        {dataProduct && dataProduct.data.length > 0 ? (dataProduct.data.map((item: any) => (
            <div key={item.id} className='bg-white w-full mt-2 px-3'>
              <div>
                <div className="shadow-divider-1pt flex px-4 py-3 shadow-[0_1px_0_0]">
                  <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                    <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng 11/01/2024</span>
                    <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                      <div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                      </div><div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[10px] flex items-center justify-center self-start">
                    <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                    <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                  </div>
                </div>
                <div className='px-4 py-3'>
                  {item.items && item.items.map((item: any) => (
                    <div key={item.product_id} className="lc-row relative flex flex-wrap mt-2">
                      <div className="lc-col lc-col-12 !basis-[586px] md:!w-[586px] md:!max-w-[586px] css-847gtr">
                        <div className="flex items-center">
                          <div className="border-stroke-disable h-16 w-16 max-w-full basis-16 self-baseline rounded-lg border py-[6px] px-[6px]">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <picture className="h-[50px] w-[50px]">
                                <source
                                  srcSet={item.image}
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <source
                                  srcSet="/estore-images/fallback-images/default/img-default-1_1.svg"
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  alt="product-image"
                                  className="h-[50px] w-[50px]"
                                  src="/estore-images/fallback-images/error/img-error-1_1.svg"
                                />
                              </picture>
                            </a>
                          </div>
                          <div className="ml-3 flex-1">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <p className="text-text-primary line-clamp-2">
                                {item.product_name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="lc-col lc-col-4 !hidden !max-w-[100%] !flex-1 md:!block css-o0h841">
                        <div className="flex justify-end">
                          <div>
                            <p className="css-jey85n text-text-primary line-clamp-1">
                              {new Intl.NumberFormat("vi-VN").format(item.price)}
                              <span> đ</span>
                            </p>
                          </div>
                          <div className="ml-4 basis-20 text-right">
                            <p className="css-1oqd6bl text-text-secondary line-clamp-1">x{item.quantity} Hộp</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border-divider-1pt border-t mt-2 pt-3  w-full'>
                    <div className="flex cursor-pointer py-3 justify-between" >
                      <div className="inline-flex cursor-pointer items-center">
                        <button className="text-text-focus text-blue-400">Xem chi tiết</button>
                      </div>
                      <div>
                        <span className="text-text-secondary">Thành tiền:</span>
                        <span className="css-jey85n text-text-focus ml-2 text-blue-400 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.total_price)}
                          <span> đ</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex justify-center pt-5">
              <div className="text-center">
                <div className="mx-auto w-full">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/default/profile/order-not-found.svg"
                    alt=""
                  />
                </div>
                <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                  Bạn chưa có đơn hàng nào.
                </h3>
                <p className="max-w-[300px] text-[#728091] text-[16px]">
                  Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!
                </p>
                <div
                  onClick={() => home()}
                  className="flex justify-center mt-2 cursor-pointer"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                    }}
                    className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                  >
                    Khám phá ngay
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabPane>
        <TabPane tab="Đang giao" key="3">
        {dataProduct && dataProduct.data.length > 0 ? (dataProduct.data.map((item: any) => (
            <div key={item.id} className='bg-white w-full mt-2 px-3'>
              <div>
                <div className="shadow-divider-1pt flex px-4 py-3 shadow-[0_1px_0_0]">
                  <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                    <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng 11/01/2024</span>
                    <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                      <div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                      </div><div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[10px] flex items-center justify-center self-start">
                    <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                    <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                  </div>
                </div>
                <div className='px-4 py-3'>
                  {item.items && item.items.map((item: any) => (
                    <div key={item.product_id} className="lc-row relative flex flex-wrap mt-2">
                      <div className="lc-col lc-col-12 !basis-[586px] md:!w-[586px] md:!max-w-[586px] css-847gtr">
                        <div className="flex items-center">
                          <div className="border-stroke-disable h-16 w-16 max-w-full basis-16 self-baseline rounded-lg border py-[6px] px-[6px]">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <picture className="h-[50px] w-[50px]">
                                <source
                                  srcSet={item.image}
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <source
                                  srcSet="/estore-images/fallback-images/default/img-default-1_1.svg"
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  alt="product-image"
                                  className="h-[50px] w-[50px]"
                                  src="/estore-images/fallback-images/error/img-error-1_1.svg"
                                />
                              </picture>
                            </a>
                          </div>
                          <div className="ml-3 flex-1">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <p className="text-text-primary line-clamp-2">
                                {item.product_name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="lc-col lc-col-4 !hidden !max-w-[100%] !flex-1 md:!block css-o0h841">
                        <div className="flex justify-end">
                          <div>
                            <p className="css-jey85n text-text-primary line-clamp-1">
                              {new Intl.NumberFormat("vi-VN").format(item.price)}
                              <span> đ</span>
                            </p>
                          </div>
                          <div className="ml-4 basis-20 text-right">
                            <p className="css-1oqd6bl text-text-secondary line-clamp-1">x{item.quantity} Hộp</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border-divider-1pt border-t mt-2 pt-3  w-full'>
                    <div className="flex cursor-pointer py-3 justify-between" >
                      <div className="inline-flex cursor-pointer items-center">
                        <button className="text-text-focus text-blue-400">Xem chi tiết</button>
                      </div>
                      <div>
                        <span className="text-text-secondary">Thành tiền:</span>
                        <span className="css-jey85n text-text-focus ml-2 text-blue-400 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.total_price)}
                          <span> đ</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex justify-center pt-5">
              <div className="text-center">
                <div className="mx-auto w-full">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/default/profile/order-not-found.svg"
                    alt=""
                  />
                </div>
                <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                  Bạn chưa có đơn hàng nào.
                </h3>
                <p className="max-w-[300px] text-[#728091] text-[16px]">
                  Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!
                </p>
                <div
                  onClick={() => home()}
                  className="flex justify-center mt-2 cursor-pointer"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                    }}
                    className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                  >
                    Khám phá ngay
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabPane>
        <TabPane tab="Đã giao" key="4">
        {dataProduct && dataProduct.data.length > 0 ? (dataProduct.data.map((item: any) => (
            <div key={item.id} className='bg-white w-full mt-2 px-3'>
              <div>
                <div className="shadow-divider-1pt flex px-4 py-3 shadow-[0_1px_0_0]">
                  <div className="mr-auto flex max-w-[248px] flex-wrap leading-[1] md:flex md:max-w-[585px] md:flex-nowrap md:items-center">
                    <span className="css-1ktc22 text-text-primary line-clamp-1 max-w-[226px] md:max-w-[336px] font-semibold">Đơn hàng 11/01/2024</span>
                    <div className="mt-1 inline-flex md:mt-0 md:leading-none">
                      <div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2"></span>
                      </div><div className="flex items-center">
                        <span className="bg-divider-1pt !mx-[6px] inline-flex h-1 w-1 rounded-full md:!mx-2">
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-[10px] flex items-center justify-center self-start">
                    <div className="bg-semantic-error tab-item-header-dot h-2 w-2 rounded-full"></div>
                    <div className="css-5gg2ui text-semantic-error ml-[6px]">Đã hủy</div>
                  </div>
                </div>
                <div className='px-4 py-3'>
                  {item.items && item.items.map((item: any) => (
                    <div key={item.product_id} className="lc-row relative flex flex-wrap mt-2">
                      <div className="lc-col lc-col-12 !basis-[586px] md:!w-[586px] md:!max-w-[586px] css-847gtr">
                        <div className="flex items-center">
                          <div className="border-stroke-disable h-16 w-16 max-w-full basis-16 self-baseline rounded-lg border py-[6px] px-[6px]">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <picture className="h-[50px] w-[50px]">
                                <source
                                  srcSet={item.image}
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <source
                                  srcSet="/estore-images/fallback-images/default/img-default-1_1.svg"
                                  type="image/webp"
                                  width="50"
                                  height="50"
                                />
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  alt="product-image"
                                  className="h-[50px] w-[50px]"
                                  src="/estore-images/fallback-images/error/img-error-1_1.svg"
                                />
                              </picture>
                            </a>
                          </div>
                          <div className="ml-3 flex-1">
                            <a href="/ca-nhan/don-hang-cua-toi/80734427831704974322416">
                              <p className="text-text-primary line-clamp-2">
                                {item.product_name}
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="lc-col lc-col-4 !hidden !max-w-[100%] !flex-1 md:!block css-o0h841">
                        <div className="flex justify-end">
                          <div>
                            <p className="css-jey85n text-text-primary line-clamp-1">
                              {new Intl.NumberFormat("vi-VN").format(item.price)}
                              <span> đ</span>
                            </p>
                          </div>
                          <div className="ml-4 basis-20 text-right">
                            <p className="css-1oqd6bl text-text-secondary line-clamp-1">x{item.quantity} Hộp</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='border-divider-1pt border-t mt-2 pt-3  w-full'>
                    <div className="flex cursor-pointer py-3 justify-between" >
                      <div className="inline-flex cursor-pointer items-center">
                        <button className="text-text-focus text-blue-400">Xem chi tiết</button>
                      </div>
                      <div>
                        <span className="text-text-secondary">Thành tiền:</span>
                        <span className="css-jey85n text-text-focus ml-2 text-blue-400 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.total_price)}
                          <span> đ</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex justify-center pt-5">
              <div className="text-center">
                <div className="mx-auto w-full">
                  <img
                    src="https://nhathuoclongchau.com.vn/estore-images/default/profile/order-not-found.svg"
                    alt=""
                  />
                </div>
                <h3 className="text-[#4a4f63] font-semibold text-[18px]">
                  Bạn chưa có đơn hàng nào.
                </h3>
                <p className="max-w-[300px] text-[#728091] text-[16px]">
                  Cùng mua sắm hàng ngàn sản phẩm tại nhà thuốc FPT Long Châu nhé!
                </p>
                <div
                  onClick={() => home()}
                  className="flex justify-center mt-2 cursor-pointer"
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(315deg,#1250dc 14.64%,#306de4 85.36%)",
                    }}
                    className="h-[48px] px-4 text-white rounded-[42px] flex justify-center items-center w-[60%]"
                  >
                    Khám phá ngay
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabPane>
      </Tabs>

    </div>
  )
}

export default ListOrderUser