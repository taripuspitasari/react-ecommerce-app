import {Link} from "react-router-dom";
import loginImg from "../assets/gate.png";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../app/slices/authSlice";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const {loading, errors} = useSelector(state => state.auth);

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(loginUser(payload));
  };

  return (
    <div className="bg-tomato h-[calc(100vh-7rem)] md:h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col w-4/5 md:flex-row items-center bg-white md:w-2/3 rounded-lg py-2">
        <div className="flex flex-col items-center w-1/2">
          <img src={loginImg} width={350} className="p-10" />
          <a
            href="https://www.flaticon.com/free-stickers/cultures"
            title="cultures stickers"
            className="hidden md:block text-slate-200 text-xs"
          >
            Cultures stickers created by Stickers - Flaticon
          </a>
        </div>
        <div className="md:w-1/2 space-y-5 px-5 mb-5">
          <h1 className="text-xl font-medium text-center">Login to Mitsuri</h1>
          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-beige">
                <label
                  htmlFor="email"
                  className="px-2 flex-shrink-0 min-w-[80px]"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-full focus:outline-none"
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
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-full focus:outline-none "
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
