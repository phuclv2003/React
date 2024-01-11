import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import DashBoard from "./page/admin/dashboard";
import Home from "./page/base/home";
import PageNotFound from "./page/pageNotFound";
import Login from "./page/base/account/login";
import Register from "./page/base/account/register";
import Profile from "./page/base/account/profile";
import EditProfile from "./page/base/account/editProfile";
import DetailNews from "./page/base/news/detail";
import DetailProduct from "./page/base/product/detail";
import Cart from "./page/base/cart";
import Order from "./page/base/order/order";
import { useGetProfileQuery } from "./services/account";
import { useEffect } from "react";
import { useRefreshMutation } from "./services/auth";
import ChatList from "./page/admin/chat/list";
import Chat from "./page/admin/chat/chat";
import UserAdmin from "./page/admin/user/list";
import AddUserAdmin from "./page/admin/user/add";
import ProductsAdmin from "./page/admin/product/list";
import AddProductAdmin from "./page/admin/product/add";
import EditProductAdmin from "./page/admin/product/edit";
import OrderAdmin from "./page/admin/order";
import CategoryAdmin from "./page/admin/category/list";
import AddCategoryAdmin from "./page/admin/category/add";
import EditCategoryAdmin from "./page/admin/category/edit";
import NewAdmin from "./page/admin/new/list";
import AddNewAdmin from "./page/admin/new/add";
import EditNewAdmin from "./page/admin/new/edit";

function App() {
  const { data: user, isLoading } = useGetProfileQuery();
  const tokenRefresh = localStorage.getItem("tokenRefresh");
  const [RefreshAccount] = useRefreshMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (!user && !isLoading) {
        try {
          const res = await RefreshAccount({
            refresh_token: tokenRefresh || "",
          });
          if ("data" in res) {
            await localStorage.setItem("token", res.data.access_token);
            await localStorage.setItem("tokenRefresh", res.data.refresh_token);
            window.location.reload();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [RefreshAccount, isLoading, tokenRefresh, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />}>
            <Route path="editProfile" index element={<EditProfile />} />
          </Route>
          <Route path="news">
            <Route path=":id" index element={<DetailNews />} />
          </Route>
          <Route path="product">
            <Route path=":id" index element={<DetailProduct />} />
          </Route>
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />
          <Route path="chat" element={<ChatList />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="user" element={<UserAdmin />} />
          <Route path="user/add" element={<AddUserAdmin />} />
          <Route path="product" element={<ProductsAdmin />} />
          <Route path="product/add" element={<AddProductAdmin />} />
          <Route path="product/edit/:id" element={<EditProductAdmin />} />
          <Route path="order" element={<OrderAdmin />} />
          <Route path="category" element={<CategoryAdmin />} />
          <Route path="category/add" element={<AddCategoryAdmin />} />
          <Route path="category/edit/:id" element={<EditCategoryAdmin />} />
          <Route path="new" element={<NewAdmin />} />
          <Route path="new/add" element={<AddNewAdmin />} />
          <Route path="new/edit/:id" element={<EditNewAdmin />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
