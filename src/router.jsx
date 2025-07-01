import {createBrowserRouter} from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Carts from "./views/Carts";
import NotFound from "./views/NotFound";
import Account from "./views/Account";
import ProductDetail from "./views/ProductDetail";
import Checkout from "./views/Checkout";
import Transaction from "./views/Transaction";
import Wishlist from "./views/Wishlist";
import TransactionDetail from "./views/TransactionDetail";
import Layout from "./components/Layout";
import Home from "./views/Home";
import DashboardLayout from "./components/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {index: true, Component: Home},
      {path: "login", Component: Login},
      {path: "signup", Component: Signup},
      {
        path: "products/:id",
        Component: ProductDetail,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {index: true, Component: Home},
      {
        path: "cart",
        Component: Carts,
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "account",
        Component: SidebarLayout,
        children: [
          {index: true, Component: Account},
          {path: "my-account", Component: Account},
          {path: "transaction", Component: Transaction},
          {path: "transaction/:id", Component: TransactionDetail},
          {path: "wishlist", Component: Wishlist},
        ],
      },
      {
        path: "products/:id",
        Component: ProductDetail,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
