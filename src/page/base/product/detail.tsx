import { message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assets/css/common.css";
import { useGetProfileQuery } from "../../../services/account";
import { useAddToCartsMutation } from "../../../services/cart";
import { useGetProductByIdQuery } from "../../../services/products";

type Props = {};

const DetailProduct = (props: Props) => {
  const { id } = useParams();
  const { data: dataProduct } = useGetProductByIdQuery(id);
  const [AddToCart, { reset }] = useAddToCartsMutation();
  const [quantity, setQuantity] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { data: user } = useGetProfileQuery();
  if (!dataProduct) {
    return null;
  }
  const ingredientObject = JSON.parse(dataProduct.ingredient);
  const ingredientList = Object.entries(ingredientObject);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const Cong = () => {
    setQuantity(quantity + 1);
  };

  const Tru = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity);
    }
  };

  const addToCart = async () => {
    if (!user) {
      message.info("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    } else {
      const cartItem = {
        product_id: Number(id),
        quantity: quantity,
      };
      try {
        await AddToCart(cartItem).unwrap();
        message.success("Thêm vào giỏ hàng thành công");
        reset();
      } catch (error) {
        message.error("Thêm vào giở hàng thất bại");
      }
    }
  };
  return (
    <>
      {dataProduct && (
        <div style={{ scrollBehavior: "smooth" }} className="container mx-auto pt-6">
          <div></div>
          <div className="rounded-xl bg-white p-4 flex">
            <div className="mr-[32px] max-w-[475px] basis-[475px]">
              <img
                className="w-full"
                src={"http://localhost:8000/" + dataProduct.image}
                alt=""
              />
            </div>
            <div>
              <div>
                <h1 className="text-[24px] font-semibold text-[#020b27]">
                  {dataProduct.name}
                </h1>
              </div>
              <div>
                <span className="text-body2 font-semibold text-[#1250dc] text-[36px] ">
                  {new Intl.NumberFormat("vi-VN").format(dataProduct.price)}
                  <span> đ</span>
                </span>
                <span className="text-[24px] font-normal text-[#1250dc]">
                  {" "}
                  / {dataProduct.unit}
                </span>
              </div>
              <table className="w-full">
                <tbody>
                  <tr className=" flex ">
                    <td className="max-w-[155px] w-full mr-4 text-[#4a4f63]">
                      Danh mục
                    </td>
                    <td className="flex-1 text-[#020b27]">{dataProduct.breadcrumb[0].parent_category[0].category_name}</td>
                  </tr>
                  <tr className="flex ">
                    <td className="max-w-[155px] w-full mr-4 text-[#4a4f63]">
                      Xuất xứ thương hiệu
                    </td>
                    <td className="flex-1 text-[#020b27]">
                      {dataProduct.origin}
                    </td>
                  </tr>
                  <tr className="flex ">
                    <td className="max-w-[155px] w-full mr-4 text-[#4a4f63]">
                      Nhà sản xuất
                    </td>
                    <td className="flex-1 text-[#020b27]">
                      {dataProduct.producer}
                    </td>
                  </tr>
                  <tr className="flex ">
                    <td className="max-w-[155px] w-full mr-4 text-[#4a4f63]">
                      Thành phần
                    </td>
                    <td className="flex-1 text-[#020b27]">
                      {ingredientList.map(
                        ([vitaminName, vitaminAmount], index) => (
                          <span key={vitaminName} className="text-[#020b27]">
                            {`${vitaminName}${
                              index < ingredientList.length - 1 ? ", " : ""
                            }`}
                          </span>
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2">
                <div className="flex gap-6">
                  <div className="max-w-[155px] w-full mr-4 text-[#4a4f63]">
                    Chọn số lượng
                  </div>
                  <div className="border-[1px] border-[#c1c8d1] rounded-[34px]  h-[32px] flex">
                    <button
                      className="w-[35px] outline-none h-full"
                      style={
                        quantity > 1
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                      onClick={() => Tru()}
                    >
                      -
                    </button>
                    <input
                      className="w-[40px] border-l-[1px] h-full border-r-[1px] border-[#c1c8d1] text-center"
                      type="text"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="w-[35px] h-full flex items-center justify-center"
                      onClick={() => Cong()}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    onClick={() => addToCart()}
                    style={{
                      background:
                        "linear-gradient(315deg, #1250dc 0%, #306de4 100%)",
                    }}
                    className="w-1/2 py-3 px-6 font-medium text-xl rounded-[50px] text-white text-center"
                  >
                    Chọn mua
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 flex mt-8">
            <div className="w-[232px] mr-4">
              <ul className="lc-detail-tabs sticky top-3">
                <li className="active border-b-[#e4e8ed] border-b-[1px cursor-pointer] p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#description"
                  >
                    Mô tả sản phẩm
                  </a>
                </li>
                <li className="border-b-[#e4e8ed] border-b-[1px] cursor-pointer p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#ingredient"
                  >
                    Thành phần
                  </a>
                </li>
                <li className="border-b-[#e4e8ed] border-b-[1px] cursor-pointer p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#use"
                  >
                    Công dụng
                  </a>
                </li>
                <li className="border-b-[#e4e8ed] border-b-[1px] cursor-pointer p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#how_to_use"
                  >
                    Cách dùng
                  </a>
                </li>
                <li className="border-b-[#e4e8ed] border-b-[1px] cursor-pointer p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#side_effects"
                  >
                    Tác dụng phụ
                  </a>
                </li>
                <li className="border-b-[#e4e8ed] border-b-[1px] cursor-pointer p-4">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#note"
                  >
                    Lưu ý
                  </a>
                </li>
                <li className="p-4 cursor-pointer">
                  <a
                    className="text-18px font-normal  text-[#4a4f63]"
                    href="#preserve"
                  >
                    Bảo quản
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="pb-2 mb-2 border-b-[#e4e8ed] border-b-[1px]">
                <div className="font-semibold text-[20px]">
                  {dataProduct.name} là gì
                </div>
              </div>
              <div
                className={`mt-4 ${
                  isExpanded ? "" : "max-h-[620px] overflow-y-hidden"
                }`}
              >
                <div id="description" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Mô tả sản phẩm</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataProduct.description,
                    }}
                  ></div>
                </div>
                <div id="ingredient" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Thành phân</h2>
                  <div className="w-full">
                    <table className="w-full max-w-[700px]">
                      <thead className="border-spacing-1">
                        <tr className="rounded text-[#020b27]">
                          <th
                            className="bg-gray-4 w-[60%] border-[2px] border-[#fff] bg-[#c1c8d1] p-2 text-left"
                            style={{
                              borderBottomLeftRadius: "10px",
                              borderTopLeftRadius: "10px",
                            }}
                          >
                            <p className="text-[#020b27] font-medium">
                              Thông tin thành phần
                            </p>
                          </th>
                          <th
                            className="bg-gray-4 w-[40%] border-[2px] border-[#fff] bg-[#c1c8d1] p-2 text-right"
                            style={{
                              borderBottomRightRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                          >
                            <p className="text-[#020b27] font-medium">
                              Hàm lượng
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredientList.map(
                          ([vitaminName, vitaminAmount], index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  backgroundColor: "rgb(237 240 243/1)",
                                  borderColor: "rgb(255 255 255/1)",
                                }}
                                className="p-2 border-2"
                              >
                                {vitaminName}
                              </td>
                              <td
                                style={{
                                  backgroundColor: "rgb(237 240 243/1)",
                                  borderColor: "rgb(255 255 255/1)",
                                }}
                                className="p-2 border-2"
                              >
                                {vitaminAmount as string}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div id="use" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Công dụng</h2>
                  <div className="w-full">{dataProduct.use}</div>
                </div>
                <div id="how_to_use" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Cách dùng</h2>
                  <div className="w-full">{dataProduct.how_to_use}</div>
                </div>
                <div id="side_effects" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Tác dụng phụ</h2>
                  <div className="w-full">{dataProduct.side_effects}</div>
                </div>
                <div id="note" className="py-3 px-4 bg-[#fff3e1] mt-4">
                  <h2 className="font-semibold text-[20px] flex items-center gap-2 text-[#f79009]">
                    <div>
                      <img
                        src="https://nhathuoclongchau.com.vn/estore-images/detail/warning.svg"
                        alt=""
                      />
                    </div>
                    <div>Lưu ý</div>
                  </h2>
                  <div className="w-full">{dataProduct.note}</div>
                </div>
                <div id="preserve" className="mt-4">
                  <h2 className="font-semibold text-[20px]">Bảo quản</h2>
                  <div className="w-full">{dataProduct.preserve}</div>
                </div>
              </div>
              <div
                style={{
                  background: isExpanded
                    ? "none"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 21.88%, rgba(255, 255, 255, 0.95) 45.31%,#fff 67.71%,#fff 100%)",
                  ...(isExpanded
                    ? {}
                    : {
                        height: "68px",
                        position: "absolute",
                        bottom: "0",
                      }),
                }}
                className="lc-wrap-link lc-overlay-detail float-bottom mt-auto flex w-full cursor-pointer items-end justify-center"
              >
                <span className="estore-icon mr-1 !mb-0 transition-all duration-500  css-wi4pw5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9516 10.4793C19.2944 10.8392 19.2806 11.4088 18.9207 11.7517L12.6201 17.7533C12.2725 18.0844 11.7262 18.0844 11.3786 17.7533L5.07808 11.7517C4.71818 11.4088 4.70433 10.8392 5.04716 10.4793C5.38999 10.1193 5.95967 10.1055 6.31958 10.4483L11.9994 15.8586L17.6792 10.4483C18.0391 10.1055 18.6088 10.1193 18.9516 10.4793ZM18.9516 5.67926C19.2944 6.03916 19.2806 6.60884 18.9207 6.95167L12.6201 12.9533C12.2725 13.2844 11.7262 13.2844 11.3786 12.9533L5.07808 6.95167C4.71818 6.60884 4.70433 6.03916 5.04716 5.67926C5.38999 5.31935 5.95967 5.3055 6.31958 5.64833L11.9994 11.0586L17.6792 5.64833C18.0391 5.30551 18.6088 5.31935 18.9516 5.67926Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p
                  onClick={() => toggleExpansion()}
                  className="css-15sc8tc transition-all duration-500 "
                >
                  {isExpanded ? "Thu gọn" : "Xem thêm"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
