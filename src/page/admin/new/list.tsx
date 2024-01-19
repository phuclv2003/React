import { Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useGetNewsQuery } from "../../../services/new";
import dayjs from "dayjs";

const NewAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data: listNew } = useGetNewsQuery({
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
      title: "Ngày đăng",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
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
          dangerouslySetInnerHTML={{
            __html: text || "",
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
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
        Thêm tin tức
      </Button>
      <TableAdmin columns={columns} data={listNew?.data} />
    </>
  );
};

export default NewAdmin;
