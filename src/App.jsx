import logoImg from "./assets/logo.png";
import {Link} from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="p-2 flex justify-between bg-[#E63946] h-20 text-[#F5F5DC]">
        <div className="flex gap-2 items-center">
          <img src={logoImg} alt="" width="40" />
          <p className="text-[#F5F5DC] text-xl font-bold">Mitsuri Dimsum</p>
        </div>
        <div className="flex">
          <ul className="flex gap-10 items-center">
            <li className="flex gap-3 items-center">
              <i class="fa-solid fa-caret-down"></i>Category
            </li>
            <li>
              <div className="w-72 h-12 p-2 rounded-full flex gap-2 items-center border border-[#F5F5DC]">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  className="w-full h-full bg-[#E63946] focus:outline-none"
                />
              </div>
            </li>
            <li>
              <Link to="/dashboard">
                <i class="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/login">
                <button className="border border-[#F5F5DC] py-2 px-4 rounded-lg">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="py-2 px-4 bg-[#F5F5DC] text-[#E63946] rounded-lg">
                  Signup
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;
