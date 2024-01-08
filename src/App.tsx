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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} > 
            <Route path="editProfile" index element={<EditProfile />} />
          </Route>
          <Route path="news" > 
            <Route path=":id" index element={<DetailNews />} />
          </Route>
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashBoard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
