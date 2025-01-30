import {Link} from "react-router-dom";
import signupImg from "../assets/panda.png";
import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {signupUser} from "../app/slices/authSlice";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {loading, errors} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return;
    }

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    dispatch(signupUser(payload));
  };

  return (
    <div className="bg-tomato h-[calc(100vh-7rem)] md:h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col w-4/5 md:flex-row items-center bg-white md:w-2/3 rounded-lg py-2">
        <div className="flex flex-col items-center w-1/2">
          <img src={signupImg} width={350} className="p-10" />
          <a
            href="https://www.flaticon.com/free-stickers/cultures"
            title="cultures stickers"
            className="text-slate-200 text-xs hidden md:block"
          >
            Cultures stickers created by Stickers - Flaticon
          </a>
        </div>
        <div className="md:w-1/2 space-y-5 px-5 m-3">
          <h1 className="text-xl font-medium text-center">Signup to Mitsuri</h1>
          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md border border-[#F5F5DC] flex gap-2 items-center">
                <label htmlFor="name" className="px-2">
                  Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full h-full focus:outline-none"
                />
              </div>
              {errors?.name?.[0] && (
                <p className="px-4 text-red-500">{errors.name[0]}</p>
              )}
            </div>
            <div className="w-full ">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-[#F5F5DC]">
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
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-[#F5F5DC]">
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
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-[#F5F5DC]">
                <label
                  htmlFor="passwordConfirmation"
                  className="px-2 flex-shrink-0 min-w-[150px]"
                >
                  Password Confirmation
                </label>
                <input
                  ref={passwordConfirmationRef}
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="w-full h-full focus:outline-none"
                />
              </div>
              {errors?.passwordConfirmation?.[0] && (
                <p className="px-4 text-red-500">
                  {errors.passwordConfirmation[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full font-medium border border-beige bg-beige text-tomato hover:text-beige hover:bg-tomato rounded-md"
            >
              Signup
            </button>
          </form>
          <p className="text-center text-slate-400 text-xs">
            Already have an account?{" "}
            <Link to="/login" className="hover:underline hover:text-black">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
