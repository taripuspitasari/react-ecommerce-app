import {useState, useEffect} from "react";
import {Outlet, Link, useNavigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import logoImg from "../assets/new-logo.png";
import defaultImg from "../assets/default.jpg";
import {loadCategories, loadProducts} from "../app/slices/productSlice";
import {fetchUserCart} from "../app/slices/cartSlice";
import {logout} from "../app/slices/authSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {cartTotalQuantity} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.auth);

  const {categories} = useSelector(state => state.product);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(loadCategories());
    dispatch(fetchUserCart());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      dispatch(loadProducts({query, category}));
    }, 500);

    return () => clearTimeout(timer);
  }, [user, query, category, dispatch]);

  const selectCategory = id => {
    setCategory(id);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/login"))
      .catch(err => console.log(err));
  };

  return (
    <div className="bg-secondary">
      <nav className="p-4 flex justify-between bg-secondary h-14 w-full sticky z-20 top-0 lg:h-16 text-primary">
        <ul className="flex items-center justify-between container">
          <li>
            <div>
              <Link to="/dashboard" className="flex gap-2 items-center">
                <img
                  src={logoImg}
                  width="40"
                  className="lg:hidden rounded-full object-cover border border-primary"
                />
                <p className="hidden lg:block text-2xl font-bold font-spartan">
                  Mitsuri Corner
                </p>
              </Link>
            </div>
          </li>
          <li>
            <div className="flex justify-between gap-5 items-center">
              <div
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="hidden lg:flex gap-3 items-center cursor-pointer"
              >
                <button className="cursor-pointer flex items-center gap-4">
                  <i className="fa-solid fa-chevron-down"></i>
                  <span>Categories</span>
                </button>
              </div>
              <div
                className={`${
                  categoryOpen ? "absolute" : "hidden"
                }  shadow-xl w-32 -bottom-16 -my-7 bg-secondary py-2 px-4`}
              >
                <ul onMouseLeave={() => setCategoryOpen(!categoryOpen)}>
                  <li
                    className="px-1 cursor-pointer hover:font-bold "
                    onClick={() => selectCategory("")}
                  >
                    All
                  </li>
                  {categories?.length > 0 &&
                    categories.map(category => (
                      <li
                        key={category.id}
                        className="px-1 cursor-pointer hover:font-bold"
                        onClick={() => selectCategory(category.id)}
                      >
                        {category.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="lg:w-72 h-10 p-2 rounded-full flex gap-2 items-center border border-primary">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full h-full bg-secondary focus:outline-none placeholder:text-primary placeholder:text-opacity-50 placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
              <div>
                <Link to="/dashboard/cart" className="relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <div className="absolute -top-3 -right-4 text-xs bg-accent py-0.5 px-1.5 rounded-full text-white">
                    {cartTotalQuantity}
                  </div>
                </Link>
              </div>
            </div>
          </li>
          <li className="relative">
            <div className="hidden lg:flex gap-2 items-center p-2">
              <div className="border border-secondary h-8 w-8 rounded-full overflow-hidden">
                <img
                  src={user?.image || defaultImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p>{user?.name?.split(" ")[0]}</p>
              <button className="flex gap-4" onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>
            {/* hidden part top-16*/}
            <div
              className={`${
                !open ? "hidden" : "absolute"
              }  w-72 z-99 shadow-xl bg-secondary right-0 top-28  lg:right-0 lg:top-12 m-1`}
              onMouseLeave={() => setOpen(!open)}
            >
              <ul className="text-primary p-3">
                <li>
                  <Link
                    to="/dashboard/account"
                    className="cursor-pointer border-b border-white flex gap-4 pb-2 items-center"
                  >
                    <div className=" border border-secondary h-14 w-14 rounded-full overflow-hidden">
                      <img
                        src={user.image || defaultImg}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm text-primary text-opacity-60">
                        {user.email}
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="cursor-pointer hover:font-bold p-1">
                  <Link to="account/my-account">Account</Link>
                </li>
                <li className="cursor-pointer hover:font-bold p-1">
                  <Link to="account/order">Order</Link>
                </li>
                <li className="cursor-pointer hover:font-bold p-1">
                  <Link to="account/wishlist">Wishlist</Link>
                </li>

                <li
                  className="cursor-pointer hover:font-bold p-1"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div className="lg:hidden flex justify-center gap-2 pt-2">
        <div
          className={`py-2 px-4  rounded-md border border-primary ${
            category === ""
              ? "bg-primary text-secondary"
              : "bg-secondary text-primary"
          }`}
          key={category?.id || ""}
          onClick={() => selectCategory("")}
        >
          All
        </div>
        {categories?.length > 0 &&
          categories.map(c => (
            <div
              className={`py-2 px-4 rounded-md border border-primary ${
                (category ?? "") === c.id
                  ? "bg-primary text-secondary"
                  : "bg-secondary text-primary"
              }`}
              key={c.id}
              onClick={() => selectCategory(c.id)}
            >
              {c.name}
            </div>
          ))}
      </div>

      <div className="p-4 lg:py-0 min-h-screen ">
        <Outlet />
      </div>

      {/* bottom bar in smaller device */}
      <div className="lg:hidden h-14 w-full sticky bottom-0 z-99 bg-secondary  shadow-md text-slate-400 border-t">
        <ul className="flex justify-between p-2">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({isActive}) =>
                `flex flex-col items-center justify-center  cursor-pointer ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/wishlist"
              className={({isActive}) =>
                `flex flex-col items-center justify-center  cursor-pointer ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <i className="fa-solid fa-heart"></i>
              <p>Wishlist</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account/order"
              className={({isActive}) =>
                `flex flex-col items-center justify-center  cursor-pointer ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <p>Order</p>
            </NavLink>
          </li>
          <li className="flex flex-col items-center justify-center hover:text-primary cursor-pointer">
            <NavLink
              to="account/my-account"
              className={({isActive}) =>
                `flex flex-col items-center justify-center  cursor-pointer ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              <i className="fa-solid fa-user"></i>
              <p>Account</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
