import {useState} from "react";
import {Navigate, Outlet, Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import logoImg from "../assets/logo.png";
import {useEffect} from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const [open, setOpen] = useState(false);
  const {user, token, setUser, setToken} = useStateContext();

  useEffect(() => {
    if (!token) return;

    axiosClient.get("/user").then(({data}) => {
      setUser(data);
    });
  }, [token]);

  const onLogout = e => {
    e.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  if (!token) {
    return <Navigate to="/public" />;
  }

  return (
    <div className="h-screen w-full overflow-y-auto">
      <nav className="p-2 flex flex-col md:flex-row justify-between bg-[#E63946] h-14 w-full sticky top-0 md:h-20 text-[#F5F5DC]">
        <div className="hidden md:flex justify-between">
          <Link to="/public" className="flex gap-2 items-center">
            <img src={logoImg} alt="" width="40" />
            <p className="text-[#F5F5DC] text-xl font-bold">Mitsuri Food</p>
          </Link>
        </div>
        <div className="flex">
          <ul className="flex md:gap-10 items-center justify-between w-full">
            <li className="hidden md:flex gap-3 items-center cursor-pointer">
              <i className="fa-solid fa-chevron-down"></i>
              <span>Category</span>
            </li>
            <div className="hidden absolute rounded-md shadow-xl w-32 -bottom-16 -my-2 bg-[#E63946] text-black py-2 px-4">
              <ul className="text-white">
                <li className="px-1 cursor-pointer hover:text-black hover:bg-[#dedec4]">
                  Food
                </li>
                <li className="px-1 cursor-pointer hover:text-black hover:bg-[#dedec4]">
                  Beverages
                </li>
              </ul>
            </div>
            <li className="w-full pr-5 md:px-5">
              <div className="md:w-96 h-10 p-2 rounded-full flex gap-2 items-center border border-[#F5F5DC]">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  className="w-full h-full bg-[#E63946] focus:outline-none text-[#F5F5DC] placeholder:text-gray-200 placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
            </li>
            <li>
              <Link to="/carts">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center p-2">
          <button className="flex gap-4" onClick={() => setOpen(!open)}>
            <i className="fa-solid fa-user"></i>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div
          className={`${
            !open ? "hidden" : "absolute"
          }  w-72 h-56 rounded-md shadow-xl bg-[#E63946] right-0 top-28  md:right-4 md:top-20 m-1`}
          onMouseLeave={() => setOpen(!open)}
        >
          <ul className="text-white p-3">
            <li>
              <div className="border-b border-white flex gap-4 pb-2 items-center">
                <div className="border border-white h-14 w-14 rounded-full"></div>
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-200">{user.email}</p>
                </div>
              </div>
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              Transaction
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              Whislist
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              <Link to="/my-account/account">Account</Link>
            </li>
            <li
              className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1"
              onClick={onLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      {/* bottom bar in smaller device */}
      <div className="md:hidden h-14 w-full sticky bottom-0 z-99 bg-[#E63946] shadow-md border-t">
        <ul className="flex justify-between p-2 text-[#F5F5DC]">
          <li>
            <Link to="/" className="flex flex-col items-center justify-center">
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center">
            <i className="fa-solid fa-list"></i>
            <p>Category</p>
          </li>
          <li className="flex flex-col items-center justify-center">
            <i className="fa-solid fa-heart"></i>
            <p>Whislist</p>
          </li>
          <li>
            <Link
              to="/my-account"
              className="flex flex-col items-center justify-center"
            >
              <i className="fa-solid fa-user"></i>
              <p>Account</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
