import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import TableAdmin from "../../../components/table";
import { useListChatQuery } from "../../../services/chat";

const ChatList = () => {
  const { data } = useListChatQuery();
  const navigator = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: 50,
      render: (index) => index + 1,
    },
    {
      title: "Tên User",
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
      title: "Thao tác",
      key: "data",
      width: 200,
      render: (data) => (
        <Button
          className="btn-edit"
          danger={data.is_read}
          onClick={() => navigator(`${data.id}`)}
          style={{ marginRight: "1rem" }}
        >
          Chat
        </Button>
      ),
    },
  ];

  return (
    <>
      <h2 className="title-appoiment">List Chat</h2>

      <TableAdmin columns={columns} data={data?.data} />
    </>
  );
};

export default ChatList;
