import { Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useGetCategoryQuery } from "../../../services/category";
import Search from "antd/es/input/Search";

const CategoryAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data: listCategory } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const [openReset, setOpenReset] = useState<boolean>(false);
  const [filter, setFilter] = useState({ name: "" });
  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };
  const [listCategoryData, setListCategoryData] = useState<any[] | undefined>([]);

  useEffect(() => {
    // const filteredData = listCategory.filter((item: { title: string; }) =>
    //   item.title?.toLowerCase().includes(filter.name.trim().toLowerCase())
    // );
    // setListCategoryData(filteredData);
  }, [listCategory, filter]);

  useEffect(() => {
    if (filter.name === "") {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name]);
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
      dataIndex: "category_name",
      key: "category_name",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (img) => <Image width={100} src={img} />,
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

  return (
    <>

      {/* <div className="btn-table">
        <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
        <div style={{ display: "flex", columnGap: 20 }}>
          <Search
            placeholder="Tìm kiếm Trạng Thái "
            value={filter?.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => setFilter({ name: "" })}
            danger
            disabled={!openReset}
          >
            Cài lại
          </Button>
        </div>
      </div> */}
      <Button className="mb-5" onClick={() => navigator("add")}>
        Thêm danh mục
      </Button>
      <TableAdmin columns={columns} data={listCategory} />
    </>
  );
};

export default CategoryAdmin;
