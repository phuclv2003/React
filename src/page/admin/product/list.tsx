import { Button, Image, Input, Slider } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useGetAllProductsQuery } from "../../../services/products";

const ProductsAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data: listProduct } = useGetAllProductsQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const [openReset, setOpenReset] = useState<boolean>(false);
  const [value, setValue] = useState<number[]>([]);
  const [price, setPrice] = useState<number[]>([0, 100000000]);
  const [filter, setFilter] = useState({
    name: "",
    price: "",
    category_name: "",
  });
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (index) => index,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text) => (
        <div
          style={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Loại",
      dataIndex: "category_name",
      key: "category_name",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 50,
      render: (product: any) => (
        <div>
          <Button
            onClick={() => navigator(`edit/${product.id}`)}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Sửa
          </Button>
          <Button
            danger
            onClick={() => { }}
            className="btn-edit"
            style={{ marginRight: "1rem" }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const onAfterChangePrice = (value: number[]) => {
    setValue(value);
    setPrice(value);
  };
  const formatSliderValue = (value: any) => {
    return `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
  };

  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const [dataProduct, setDataProduct] = useState<any | null>(null);
  useEffect(() => {
    if (listProduct) {
      setDataProduct(listProduct.data);
    }
  }, [listProduct]);
  useEffect(() => {
    const filteredData = listProduct?.data?.filter((item: any) => {
      const isNameMatch = item.name
        ?.toLowerCase()
        .includes(filter.name.trim().toLowerCase());
  
      const isCategoryMatch = item.category_name
        ?.toLowerCase()
        .includes(filter.category_name);
  
      const isPriceMatch =
        value.length === 0 ||
        (item.price >= value[0] && item.price <= value[1]);
  
      return isNameMatch && isCategoryMatch && isPriceMatch;
    });
  
    setDataProduct(filteredData);
  }, [filter.category_name, filter.name, listProduct?.data, value]);

  useEffect(() => {
    if (
      filter.name === "" &&
      filter.price === "" &&
      filter.category_name === ""
    ) {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.category_name, filter.name, filter.price]);
  return (
    <>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div style={{ display: "flex", columnGap: 20, alignItems: "flex-end" }}>
        <div>
          <Input
            value={filter?.name}
            placeholder="Tên sản phẩm"
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{formatSliderValue(price[0])}</div>
            <div>{formatSliderValue(price[1])}</div>
          </div>
          <Slider
            range
            step={100000}
            defaultValue={[0, 100000000]}
            max={100000000}
            tooltip={{ formatter: null }}
            onChange={onAfterChangePrice}
            tipFormatter={formatSliderValue}
          />
        </div>
        <div>
          <Input
            value={filter?.category_name}
            placeholder="Loại sản phẩm"
            onChange={(e) => handleFilterChange("category_name", e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <Button
        onClick={() =>
          setFilter({
            name: "",
            price: "",
            category_name: ""
          })
        }
        danger
        disabled={!openReset}
        >
          Cài lại
        </Button>
      </div>
      <Button className="mb-5" onClick={() => navigator("add")}>
        Thêm sản phẩm
      </Button>
      <TableAdmin columns={columns} data={dataProduct} />
    </>
  );
};

export default ProductsAdmin;
