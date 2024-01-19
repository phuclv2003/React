import { Button, DatePicker, DatePickerProps, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
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
  const [dataOrder, setDataOrder] = useState<any | null>(null);
  useEffect(() => {
    if (data) {
      setDataOrder(data.data);
    }
  }, [data]);
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
  const [openReset, setOpenReset] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    name: "",
    time: "",
    status: "",
  });
  useEffect(() => {
    if (
      filter.name === "" &&
      filter.time === "" &&
      filter.status === ""
    ) {
      setOpenReset(false);
    } else {
      setOpenReset(true);
    }
  }, [filter.name, filter.status, filter.time]);
  useEffect(() => {
    const filteredData = data?.data?.filter(
      (item: any) =>
        item.mail_address
          ?.toLowerCase()
          .includes(filter.name.trim().toLowerCase()) &&
        dayjs(item.created_at)
          .format("DD/MM/YYYY")
          .toLowerCase()
          .includes(filter.time.trim().toLowerCase()) && 
        item.state?.toString().toLowerCase().includes(filter.status)
    );
    setDataOrder(filteredData);
  }, [data?.data, filter.name, filter.status, filter.time]);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      handleFilterChange("time", dayjs(date).format("DD/MM/YYYY"));
    } else {
      handleFilterChange("time", "");
    }
  };
  const handleFilterChange = (fieldName: string, value: string) => {
    setFilter({ ...filter, [fieldName]: value });
  };

  const optionStatus = [{
    value: 1,
    label: "Đang xử lý",
  }, {
    value: 2,
    label: "Đã xác nhận",
  }, {
    value: 3,
    label: "Đang giao",
  }, {
    value: 4,
    label: "Đã giao",
  }];
  return (
    <>
      <h2 style={{ margin: "0.5rem" }}>Tìm kiếm</h2>
      <div style={{ display: "flex", columnGap: 20, alignItems: "flex-end" }}>
        <div>
          <Input
            value={filter?.name}
            placeholder="Tên người đặt"
            onChange={(e) => handleFilterChange("name", e.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <div>
          <DatePicker
            style={{ width: 200 }}
            format="YYYY-MM-DD"
            placeholder="Ngày đặt"
            onChange={onChange}
          />
        </div>
        <div>
          <Select
            options={optionStatus}
            onChange={(value) => handleFilterChange("status", value)}
            value={filter.status || null}
            style={{ width: 200 }}
            placeholder="Hình thức thanh toán"
          />
        </div>
        <Button
          onClick={() =>
            setFilter({
              name: "",
              time: "",
              status: ""
            })
          }
          danger
          disabled={!openReset}
        >
          Cài lại
        </Button>
      </div>
      <Button className="mb-5" onClick={() => navigator("add")}>
        Thêm order
      </Button>
      <TableAdmin columns={columns} data={dataOrder} />
    </>
  );
};

export default OrderAdmin;
