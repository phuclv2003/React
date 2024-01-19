import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import AddCategoryAdmin from "./page/admin/category/add";
import EditCategoryAdmin from "./page/admin/category/edit";
import CategoryAdmin from "./page/admin/category/list";
import Chat from "./page/admin/chat/chat";
import ChatList from "./page/admin/chat/list";
import DashBoard from "./page/admin/dashboard";
import AddNewAdmin from "./page/admin/new/add";
import EditNewAdmin from "./page/admin/new/edit";
import NewAdmin from "./page/admin/new/list";
import OrderAdmin from "./page/admin/order";
import AddProductAdmin from "./page/admin/product/add";
import EditProductAdmin from "./page/admin/product/edit";
import ProductsAdmin from "./page/admin/product/list";
import AddUserAdmin from "./page/admin/user/add";
import UserAdmin from "./page/admin/user/list";
import EditProfile from "./page/base/account/editProfile";
import Login from "./page/base/account/login";
import ListOrderUser from "./page/base/account/order";
import OrderDetail from "./page/base/account/order/detail";
import Profile from "./page/base/account/profile";
import Register from "./page/base/account/register";
import Cart from "./page/base/cart";
import Home from "./page/base/home";
import DetailNews from "./page/base/news/detail";
import Order from "./page/base/order/order";
import PaymentReturn from "./page/base/payment_return";
import DetailProduct from "./page/base/product/detail";
import ListByIdCate from "./page/base/product/listByIdCate";
import PageNotFound from "./page/pageNotFound";
import { useGetProfileQuery } from "./services/account";
import { useRefreshMutation } from "./services/auth";
import OrderDetailAdmin from "./page/admin/order/detail";

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
          <Route path="order">
            <Route index element={<Order />} />
            <Route path="detail" index element={<OrderDetail />} />
          </Route>

          <Route path="register" element={<Register />} />
          <Route path="payment_return" element={<PaymentReturn />} />
          <Route path="profile" element={<Profile />}>
            <Route path="editProfile" index element={<EditProfile />} />
            <Route path="listOrderUser" element={<ListOrderUser />} />
          </Route>
          <Route path="news">
            <Route path=":id" index element={<DetailNews />} />
          </Route>
          <Route path="product">
            <Route path=":id" index element={<DetailProduct />} />
          </Route>
          <Route path="category">
            <Route path=":id" index element={<ListByIdCate />} />
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
          <Route path="order">
            <Route index element={<OrderAdmin />} />
            <Route path="detail" element={<OrderDetailAdmin />} />
          </Route>
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
