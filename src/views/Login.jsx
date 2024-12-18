import {Link} from "react-router-dom";
import loginImg from "../assets/gate.png";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);

  const {setUser, setToken} = useStateContext();

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };
  return (
    <div className="bg-[#F5F5DC] h-[calc(100vh-7rem)] md:h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="flex flex-col w-4/5 md:flex-row items-center bg-white md:w-2/3 rounded-lg py-2">
        <div className="flex flex-col items-center w-1/2">
          <img src={loginImg} width={350} className="p-10" />
          <a
            href="https://www.flaticon.com/free-stickers/cultures"
            title="cultures stickers"
            className="hidden md:block text-slate-200 text-sm"
          >
            Cultures stickers created by Stickers - Flaticon
          </a>
        </div>
        <div className="md:w-1/2 space-y-5 px-5">
          <h1 className="md:text-3xl font-bold text-center">
            Login to Mitsuri
          </h1>
          <form onSubmit={onSubmit} className="space-y-4 text-sm">
            <div className="w-full">
              <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-[#F5F5DC]">
                <label htmlFor="email" className="px-2">
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
              <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-[#F5F5DC]">
                <label htmlFor="password" className="px-2">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-full focus:outline-none"
                />
              </div>
              {errors?.password?.[0] && (
                <p className="px-4 text-red-500">{errors.password[0]}</p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full bg-[#F5F5DC] text-[#E63946] rounded-full hover:bg-[#FFD700] hover:text-black"
            >
              Login
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm">
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
