import React from "react";
import {Outlet, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function AccountLayout() {
  return (
    <div>
      <nav className="hidden lg:flex h-8 items-center">
        <ul className="flex justify-evenly items-center container text-primary text-opacity-80">
          <li>
            <NavLink
              to="/dashboard/account/my-account"
              className={({isActive}) =>
                `cursor-pointer p-1 block rounded-sm ${
                  isActive ? "font-bold" : "hover:font-bold"
                }`
              }
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/account/order"
              className={({isActive}) =>
                `cursor-pointer p-1 block rounded-sm ${
                  isActive ? "font-bold" : "hover:font-bold"
                }`
              }
            >
              Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/account/wishlist"
              className={({isActive}) =>
                `cursor-pointer p-1 block rounded-sm ${
                  isActive ? "font-bold" : "hover:font-bold"
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
