import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import PublicHome from "./views/PublicHome";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Carts from "./views/Carts";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Account from "./views/Account";
import SidebarLayout from "./components/SidebarLayout";
import ProductDetail from "./views/ProductDetail";
import Checkout from "./views/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/carts",
        element: <Carts />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/my-account",
        element: <SidebarLayout />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/public",
        element: <PublicHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
