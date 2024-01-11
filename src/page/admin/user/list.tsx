import { Button, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import TableAdmin from "../../../components/table";
import { useGetListProfileQuery } from "../../../services/account";
import { useNavigate } from "react-router-dom";

const UserAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { data: listUser } = useGetListProfileQuery();

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
      dataIndex: "account_name",
      key: "account_name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "mail_address",
      key: "mail_address",
      width: 150,
    },
    {
      title: "Ảnh",
      dataIndex: "upload_file_path",
      key: "upload_file_path",
      width: 150,
      render: (img) => (
        <Image width={100} src={"http://localhost:8000/" + img} />
      ),
    },
    {
      title: "SĐT",
      dataIndex: "tel",
      key: "tel",
      width: 150,
    },
    {
      title: "Vai trò",
      dataIndex: "user_type",
      key: "user_type",
      width: 150,
    },
  ];

  return (
    <>
      <Button className="mb-5" onClick={() => navigator("add")}>
        Thêm tài khoản Admin
      </Button>
      <TableAdmin columns={columns} data={listUser?.data} />
    </>
  );
};

export default UserAdmin;
