import {useState, useEffect} from "react";
import {Outlet, NavLink, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loadCategories, loadProducts} from "../../app/slices/productSlice";
import logoImg from "../../assets/new-logo.png";

export default function Layout() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const {categories} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadProducts({query, category}));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, category, dispatch]);

  const selectCategory = id => {
    setCategory(id);
  };

  return (
    <div className="bg-secondary">
      <nav className="p-4 flex justify-between bg-secondary h-14 w-full sticky z-20 top-0 lg:h-16 text-primary">
        <ul className="flex items-center justify-between container">
          <li>
            <div>
              <Link to="/" className="flex gap-2 items-center">
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
                {/* <input
                  type="search"
                  value={query}
                  onChange={e => dispatch(setQuery(e.target.value))}
                  className="w-full h-full bg-secondary focus:outline-none placeholder:text-primary placeholder:text-opacity-50 placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                /> */}
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full h-full bg-secondary focus:outline-none placeholder:text-primary placeholder:text-opacity-50 placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
              <div>
                <Link to="/login">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>
            </div>
          </li>
          <li className="hidden lg:block">
            <div className="flex justify-between items-center gap-2">
              <Link to="/login">
                <button className="border font-medium border-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-secondary">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="py-2 px-4 font-medium  bg-accent text-secondary rounded-lg hover:bg-primary hover:text-secondary">
                  Sign Up
                </button>
              </Link>
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

      <div className="min-h-screen px-4">
        <Outlet />
      </div>

      <div className="lg:hidden h-14 w-full sticky bottom-0 z-99 bg-secondary text-slate-400 shadow-md border-t">
        <ul className="flex justify-between p-2">
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <NavLink
              to="/"
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
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <NavLink
              to="/login"
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
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <NavLink
              to="/signup"
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
