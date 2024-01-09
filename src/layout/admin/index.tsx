import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { FC, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../services/account";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  to?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: to ? (
      <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
        {label}
      </Link>
    ) : (
      label
    ),
  } as MenuItem;
}

type Props = {};
const { Header, Sider, Content } = Layout;

const items: MenuItem[] = [
  getItem("Chat", "1", <PieChartOutlined />, "/admin/chat"),
  getItem("Option 2", "2", <DesktopOutlined />, "/admin/option2"),
  getItem("User", "sub1", <UserOutlined />, undefined, [
    getItem("Tom", "3", undefined, "/admin/users/tom"),
    getItem("Bill", "4", undefined, "/admin/users/bill"),
    getItem("Alex", "5", undefined, "/admin/users/alex"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, undefined, [
    getItem("Team 1", "6", undefined, "/admin/teams/team1"),
    getItem("Team 2", "8", undefined, "/admin/teams/team2"),
  ]),
  getItem("Files", "9", <FileOutlined />, "/admin/files"),
];

const LayoutAdmin: FC<Props> = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { name: string; url: string }[]
  >([]);

  const { data: user, isSuccess } = useGetProfileQuery();

  useEffect(() => {
    if (user?.user_type !== "admin" && isSuccess) {
      navigator("/");
    }
  }, [isSuccess, navigator, user?.user_type]);

  const generatePathArray = (path: string) => {
    const pathArray = path.split("/").filter(Boolean);
    return pathArray.map((segment, index) => {
      const name = segment;
      const url = "/" + pathArray.slice(0, index + 1).join("/");
      return { name, url };
    });
  };

  useEffect(() => {
    setBreadcrumbs(generatePathArray(location.pathname));
  }, [location.pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbs.map((item) => (
              <Breadcrumb.Item
                className="capitalize hover:text-[#001628] cursor-pointer"
                onClick={() => navigator(`${item.url}`)}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            className="h-full"
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
