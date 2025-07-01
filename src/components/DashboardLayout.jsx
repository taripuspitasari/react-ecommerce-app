import {useState, useEffect} from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import logoImg from "../assets/logo.png";
import defaultImg from "../assets/default.jpg";
import {
  setQuery,
  setSelectedCategory,
  fetchCategories,
} from "../app/slices/productSlice";
import {fetchUserCart} from "../app/slices/cartSlice";
import {logout} from "../app/slices/authSlice";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {query, categories} = useSelector(state => state.product);
  const {cartTotalQuantity} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.auth);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate({
      pathname: "/",
    });
  }

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUserCart());
  }, []);

  const selectCategory = id => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      <nav className="p-2 flex flex-col lg:flex-row justify-between bg-tomato h-14 w-full sticky z-20 top-0 lg:h-16 text-beige">
        <div className="hidden lg:flex justify-between">
          <Link to="/dashboard" className="flex gap-2 items-center">
            <img src={logoImg} width="40" />
            <p className="lg:text-xl font-medium">Mitsuri Food</p>
          </Link>
        </div>
        <div className="flex">
          <ul className="flex items-center justify-between w-full">
            <li
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="hidden lg:flex gap-3 items-center cursor-pointer"
            >
              <button className="cursor-pointer flex items-center gap-4">
                <i className="fa-solid fa-chevron-down text-sm"></i>
                <span>Category</span>
              </button>
            </li>
            <div
              className={`${
                categoryOpen ? "absolute" : "hidden"
              } rounded-md shadow-xl w-32 -bottom-10 -my-7 bg-tomato text-black py-2 px-4`}
            >
              <ul
                className="text-white"
                onMouseLeave={() => setCategoryOpen(!categoryOpen)}
              >
                <li
                  className="px-1 cursor-pointer hover:text-black hover:bg-beige"
                  onClick={() => selectCategory("")}
                >
                  All
                </li>
                {categories?.length > 0 &&
                  categories.map(category => (
                    <li
                      key={category.id}
                      className="px-1 cursor-pointer hover:text-black hover:bg-beige"
                      onClick={() => selectCategory(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
            <li className="w-full pr-5 lg:px-5">
              <div className="lg:w-96 h-10 p-2 rounded-full flex gap-2 items-center border border-beige">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  value={query}
                  onChange={e => dispatch(setQuery(e.target.value))}
                  className="w-full h-full bg-tomato focus:outline-none placeholder:text-beige placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
            </li>
            <li className="pr-2 hover:text-white">
              <Link to="/dashboard/cart" className="relative">
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="absolute -top-3 -right-4 text-xs bg-green py-0.5 px-1.5 rounded-full text-black">
                  {cartTotalQuantity}
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex gap-2 items-center p-2">
          <div className="border border-beige h-8 w-8 rounded-full overflow-hidden">
            <img
              src={user.image || defaultImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p>{user.name.split(" ")[0]}</p>
          <button className="flex gap-4" onClick={() => setOpen(!open)}>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div
          className={`${
            !open ? "hidden" : "absolute"
          }  w-72 z-99 rounded-md shadow-xl bg-tomato right-0 top-28  lg:right-4 lg:top-16 m-1`}
          onMouseLeave={() => setOpen(!open)}
        >
          <ul className="text-white p-3">
            <li>
              <Link
                to="/dashboard/account"
                className="cursor-pointer border-b border-white flex gap-4 pb-2 items-center"
              >
                <div className=" border border-beige h-14 w-14 rounded-full overflow-hidden">
                  <img
                    src={user.image || defaultImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-200">{user.email}</p>
                </div>
              </Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              <Link to="account/transaction">Transaction</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              <Link to="account/wishlist">Wishlist</Link>
            </li>
            <li className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1">
              <Link to="account/my-account">Account</Link>
            </li>
            <li
              className="cursor-pointer hover:text-black hover:bg-[#dedec4] p-1"
              onClick={() => dispatch(logout())}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      {/* bottom bar in smaller device */}
      <div className="lg:hidden h-14 w-full sticky bottom-0 z-99 bg-tomato text-beige shadow-md border-t">
        <ul className="flex justify-between p-2">
          <li>
            <Link
              to="/dashboard"
              className="flex flex-col items-center justify-center hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link
              to="account/wishlist"
              className="flex flex-col items-center justify-center hover:text-white cursor-pointer"
            >
              <i className="fa-solid fa-heart"></i>
              <p>Wishlist</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <Link
              to="account/my-account"
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
