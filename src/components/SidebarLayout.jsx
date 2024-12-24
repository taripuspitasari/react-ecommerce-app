import React from "react";
import {Outlet, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../app/slices/authSlice";

export default function SidebarLayout() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen w-full bg-[#F5F5DC]">
      <div className="w-full md:w-64">
        <div>
          <ul className="text-black p-3 space-y-5 md:space-y-2">
            <li>
              <div className="border-b border-slate-400 flex flex-col md:flex-row gap-4 pb-2 items-center">
                <div className="border border-black h-36 w-36 md:h-14 md:w-14 rounded-full"></div>
                <div className="text-center md:text-left">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </li>
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              Transaction
            </li>
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              Whislist
            </li>
            <li className="cursor-pointer font-medium hover:bg-[#dedec4] p-1">
              <Link to="/account">Account</Link>
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
      <div>
        <Outlet />
      </div>
    </div>
  );
}
