import React from "react";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Account() {
  const {user, token, setUser, setToken} = useStateContext();

  const onLogout = e => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className="w-full h-screen bg-[#F5F5DC]">
      {/* <ul className="text-black p-3 space-y-5">
        <li>
          <div className="border-b border-[#FFD700] flex flex-col gap-4 pb-2 items-center">
            <div className="border border-black h-24 w-24 rounded-full"></div>
            <div className="text-center">
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </li>
        <li className="cursor-pointer hover:bg-[#dedec4] p-1">Transaction</li>
        <li className="cursor-pointer hover:bg-[#dedec4] p-1">Whislist</li>
        <li className="cursor-pointer hover:bg-[#dedec4] p-1">Account</li>
        <li
          className="cursor-pointer hover:bg-[#dedec4] p-1"
          onClick={onLogout}
        >
          Logout
        </li>
      </ul> */}
    </div>
  );
}
