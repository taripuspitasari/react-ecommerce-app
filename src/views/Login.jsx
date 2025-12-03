import {Link, useNavigate} from "react-router-dom";
import loginImg from "../assets/gate.png";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../app/slices/authSlice";
import axiosClient from "../axios-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const response = await axiosClient.post("/login", {email, password});
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
      dispatch(setUser(response.data.user));

      navigate({
        pathname: "/dashboard",
      });
    } catch (error) {
      setErrors(
        error.response.data.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-secondary h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col w-4/5 lg:flex-row items-center bg-white lg:w-2/3 rounded-lg py-2">
        <div className="flex flex-col items-center w-1/2">
          <img src={loginImg} width={350} className="p-10" />
          <a
            href="https://www.flaticon.com/free-stickers/cultures"
            title="cultures stickers"
            className="hidden lg:block text-slate-200 text-xs"
          >
            Cultures stickers created by Stickers - Flaticon
          </a>
        </div>
        <div className="lg:w-1/2 space-y-5 px-5 mb-5">
          <h1 className="text-xl font-medium text-center">Login to Mitsuri</h1>
          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}
          {errors && <p className="px-4 py-2 text-red-500">{errors}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-secondary">
                <label
                  htmlFor="email"
                  className="px-2 flex-shrink-0 min-w-[80px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-full focus:outline-none"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-secondary">
                <label
                  htmlFor="password"
                  className="px-2 flex-shrink-0 min-w-[70px]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-full focus:outline-none"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full font-medium  bg-secondary text-primary rounded-md"
            >
              Login
            </button>
          </form>
          <p className="text-center text-slate-400 text-xs ">
            Don't have an account?{" "}
            <Link to="/signup" className="hover:underline hover:text-black">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
