import React from "react";
import {Outlet, Link, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../app/slices/authSlice";

export default function SidebarLayout() {
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen w-full bg-[#F5F5DC]">
      <div className="hidden lg:block w-full lg:w-64">
        <div>
          <ul className="text-black p-3 space-y-5 lg:space-y-2">
            <li>
              <NavLink
                to="/dashboard/account/my-account"
                className={({isActive}) =>
                  `cursor-pointer font-medium p-1 block rounded-sm ${
                    isActive ? "bg-[#dedec4]" : "hover:bg-[#dedec4]"
                  }`
                }
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/account/transaction"
                className={({isActive}) =>
                  `cursor-pointer font-medium p-1 block rounded-sm ${
                    isActive ? "bg-[#dedec4]" : "hover:bg-[#dedec4]"
                  }`
                }
              >
                Transaction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/account/wishlist"
                className={({isActive}) =>
                  `cursor-pointer font-medium p-1 block rounded-sm ${
                    isActive ? "bg-[#dedec4]" : "hover:bg-[#dedec4]"
                  }`
                }
              >
                Wishlist
              </NavLink>
            </li>

            <li
              className="cursor-pointer font-medium rounded-sm hover:bg-[#dedec4] p-1"
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
