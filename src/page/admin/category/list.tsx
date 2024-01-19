import { Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useGetCategoryQuery } from "../../../services/category";

const CategoryAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data: listCategory } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
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
            onClick={() => {}}
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
      <Button className="mb-5" onClick={() => navigator("add")}>
        Thêm danh mục
      </Button>
      <TableAdmin columns={columns} data={listCategory} />
    </>
  );
};

export default CategoryAdmin;
