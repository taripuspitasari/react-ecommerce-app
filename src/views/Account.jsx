import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../app/slices/authSlice";

export default function Account() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  return (
    <div className="w-full h-screen bg-[#F5F5DC] p-3">
      <h2 className="text-xl font-medium">Account</h2>
      <div className="flex gap-10">
        <div className="flex flex-col gap-4 pb-2 items-center">
          <div className="border border-black h-24 w-24 rounded-full"></div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div>
          <h3>Edit Profil</h3>
          <ul className="text-black p-3 space-y-2">
            <li className="cursor-pointer hover:bg-[#dedec4] p-1">
              Transaction
            </li>
            <li className="cursor-pointer hover:bg-[#dedec4] p-1">Whislist</li>
            <li className="cursor-pointer hover:bg-[#dedec4] p-1">Account</li>
            <li
              className="cursor-pointer hover:bg-[#dedec4] p-1"
              onClick={() => dispatch(logout())}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
