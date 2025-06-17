import {Link} from "react-router-dom";
import loginImg from "../assets/gate.png";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, clearErrors} from "../app/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {loading, errors} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    dispatch(loginUser(payload));
  };

  return (
    <div className="bg-tomato h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)] flex items-center justify-center">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-beige">
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
              {errors?.email?.[0] && (
                <p className="px-4 text-red-500">{errors.email[0]}</p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-beige">
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
              {errors?.password?.[0] && (
                <p className="px-4 text-red-500">{errors.password[0]}</p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full font-medium border border-beige bg-beige text-tomato hover:text-beige hover:bg-tomato rounded-md"
            >
              Login
            </button>
          </form>
          <p className="text-center text-slate-400 text-xs ">
            Don't have an account?{" "}
            <Link to="/signup" className="hover:underline hover:text-black">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
