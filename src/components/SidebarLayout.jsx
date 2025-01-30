import React from "react";
import {Outlet, Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../app/slices/authSlice";

export default function SidebarLayout() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5DC]">
      <div className="hidden md:block w-full md:w-64">
        <div>
          <ul className="text-black p-3 space-y-5 md:space-y-2">
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              <Link to="transaction">Transaction</Link>
            </li>
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              <Link to="wishlist">Wishlist</Link>
            </li>
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              <Link to="account">Account</Link>
            </li>
            <li
              className="cursor-pointer font-medium hover:bg-[#dedec4] p-1"
              onClick={() => dispatch(logout())}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
