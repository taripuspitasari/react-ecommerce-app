import {useState, useEffect} from "react";
import {Outlet, Navigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  setQuery,
  setSelectedCategory,
  fetchCategories,
} from "../app/slices/productSlice";
import logoImg from "../assets/logo.png";

export default function GuestLayout() {
  const dispatch = useDispatch();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const {query, categories} = useSelector(state => state.product);
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (token) {
    return <Navigate to="/" />;
  }

  const selectCategory = id => {
    dispatch(setSelectedCategory(id));
  };

  // Merah Tradisional (#E63946): Warna khas untuk makanan Asia.
  // Emas Tradisional (#FFD700): Memberi kesan keberuntungan.
  // Hijau Daun (#A5D6A7): Menyegarkan, cocok untuk bahan alami.
  // Beige atau Putih Gading (#F5F5DC): Kesan lembut, cocok untuk latar.
  // Coklat Gelap (#5D4037): Memberikan kesan hangat dan lezat.

  return (
    <div className="h-screen w-full">
      <nav className="p-2 flex flex-col md:flex-row justify-between bg-[#E63946] h-14 w-full sticky top-0 md:h-20 text-[#F5F5DC]">
        <div className="hidden md:flex justify-between">
          <Link to="/public" className="flex gap-2 items-center">
            <img src={logoImg} alt="" width="40" />
            <p className="text-[#F5F5DC] text-xl font-medium">Mitsuri Food</p>
          </Link>
        </div>
        <div className="flex">
          <ul className="flex md:gap-10 items-center justify-between w-full">
            <li
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="hidden md:flex gap-3 items-center"
            >
              <button className="cursor-pointer font-medium flex items-center gap-4">
                <i className="fa-solid fa-chevron-down"></i>
                <span>Category</span>
              </button>
            </li>
            <div
              className={`${
                categoryOpen ? "absolute" : "hidden"
              } rounded-md shadow-xl w-32 -bottom-16 -my-7 bg-[#E63946] text-black py-2 px-4`}
            >
              <ul
                className="text-white"
                onMouseLeave={() => setCategoryOpen(!categoryOpen)}
              >
                <li
                  className="px-1 cursor-pointer hover:text-black hover:bg-[#dedec4]"
                  onClick={() => selectCategory("")}
                >
                  All
                </li>
                {categories.map(category => (
                  <li
                    key={category.id}
                    className="px-1 cursor-pointer hover:text-black hover:bg-[#dedec4]"
                    onClick={() => selectCategory(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <li className="w-full pr-5 md:px-5">
              <div className="md:w-72 h-10 p-2 rounded-full flex gap-2 items-center border border-[#F5F5DC]">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  value={query}
                  onChange={e => dispatch(setQuery(e.target.value))}
                  className="w-full h-full bg-[#E63946] focus:outline-none placeholder:text-gray-200 placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
            </li>
            <li>
              <Link to="/login">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/login">
                <button className="border font-medium border-[#F5F5DC] py-2 px-4 rounded-lg">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="py-2 px-4 font-medium bg-[#F5F5DC] text-[#E63946] rounded-lg">
                  Signup
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <div className="md:hidden h-14 w-full sticky bottom-0 z-99 bg-[#E63946] shadow-md border-t">
        <ul className="flex justify-between p-2 text-[#F5F5DC]">
          <li className="flex flex-col items-center justify-center">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
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
              to="/login"
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
