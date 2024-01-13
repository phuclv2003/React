import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useGetOrderQuery } from "../../../services/order";

const OrderAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data } = useGetOrderQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });

  console.log(data);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 10,
      render: (index) => index,
    },
    {
      title: "Email",
      dataIndex: "mail_address",
      key: "mail_address",
      width: 100,
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
      width: 100,
    },
    {
      title: "Thành tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (total) => (
        <div>
          <span>{new Intl.NumberFormat("vi-VN").format(total)}</span>
          <span>VNĐ</span>
        </div>
      ),
      width: 100,
    },
    {
      title: "Hình thức",
      dataIndex: "payments",
      key: "payments",
      width: 100,
    },
    {
      title: "Địa chỉ",
      dataIndex: "receiving_location",
      key: "receiving_location",
      width: 150,
    },
    {
      title: "Thao tác",
      key: "id",
      width: 200,
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
        Thêm order
      </Button>
      <TableAdmin columns={columns} data={data?.data} />
    </>
  );
};

export default OrderAdmin;
