import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../app/slices/authSlice";
import defaultImg from "../assets/default.jpg";
import FormChangePassword from "../components/FormChangePassword";
import FormChangeInformation from "../components/FormChangeInformation";
import FormChangePhoto from "../components/FormChangePhoto";
import {clearNotification} from "../app/slices/authSlice";

export default function Account() {
  const dispatch = useDispatch();
  const {user, notification, loading} = useSelector(state => state.auth);

  const [type, setType] = useState("");

  const handleOpenModal = modal => {
    setType(modal);
  };

  const handleCloseModal = () => {
    setType("");
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="w-full h-screen bg-[#F5F5DC] p-3">
      {notification && (
        <div className="flex gap-2 justify-center items-center p-3 bg-[#A5D6A7] rounded-md absolute m-3 z-50 right-5 bottom-5 font-medium shadow-lg">
          <i className="fa-solid fa-check"></i>
          <p className="text-center">{notification}</p>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="flex justify-center items-center h-full">
            <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
          </div>
        </div>
      )}

      <h2 className="text-xl font-medium pb-3 text-center">Account</h2>
      <div className="flex p-4 gap-3 items-center border rounded-md shadow-md">
        <div className="relative z-10">
          <div className="border border-beige h-20 w-20 rounded-full overflow-hidden">
            <img
              src={user.image || defaultImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            onClick={() => handleOpenModal("changePhoto")}
            className="bg-green px-2 py-1 rounded-full absolute top-14 right-0 cursor-pointer"
          >
            <i className="fa-solid fa-pen text-xs"></i>
          </div>
        </div>
        <div>
          <h3 className="text-xl">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="flex p-4 justify-between items-start border rounded-md shadow-md">
        <div className="space-y-2">
          <h3 className="font-bold">Personal Information</h3>
          <div>
            <p className="text-gray-500">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email Address</p>
            <p>{user.email}</p>
          </div>
        </div>
        <div
          onClick={() => handleOpenModal("changeInformation")}
          className="cursor-pointer"
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
      <div className="flex p-4 justify-between items-start border rounded-md shadow-md">
        <div className="space-y-2">
          <h3 className="font-bold">Change Password</h3>
        </div>
        <div
          onClick={() => handleOpenModal("changePassword")}
          className="cursor-pointer"
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
      </div>
      <div
        className="lg:hidden flex p-4 justify-between items-start border rounded-md shadow-md cursor-pointer"
        onClick={() => dispatch(logout())}
      >
        <div className="space-y-2">
          <button className="font-bold">Logout</button>
        </div>
      </div>

      {type === "changePassword" && (
        <FormChangePassword handleCloseModal={handleCloseModal} />
      )}
      {type === "changeInformation" && (
        <FormChangeInformation handleCloseModal={handleCloseModal} />
      )}
      {type === "changePhoto" && (
        <FormChangePhoto handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}
