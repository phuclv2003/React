import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layout/admin";
import LayoutBase from "./layout/base";
import DashBoard from "./page/admin/dashboard";
import Home from "./page/base/home";
import PageNotFound from "./page/pageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBase />}>
          <Route index element={<Home />} />
          {/* <Route path="add" element={<AddStatusAdmin />} /> */}
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
