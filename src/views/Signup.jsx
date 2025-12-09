import {Link, useNavigate} from "react-router-dom";
import signupImg from "../assets/panda.png";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {signupUser, clearErrors} from "../app/slices/authSlice";
import {alertError} from "../components/alert";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const {loading, errors} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMatchPassword("Password confirmation does not match.");
      return;
    }

    setMatchPassword("");

    const payload = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(signupUser(payload))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(err => console.log(err));
  };

  return (
    <div className="bg-secondary h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col w-4/5 lg:flex-row items-center bg-white lg:w-2/3 rounded-lg py-2">
        <div className="flex flex-col items-center w-1/2">
          <img src={signupImg} width={350} className="p-10" />
          <a
            href="https://www.flaticon.com/free-stickers/cultures"
            title="cultures stickers"
            className="text-slate-200 text-xs hidden lg:block"
          >
            Cultures stickers created by Stickers - Flaticon
          </a>
        </div>
        <div className="lg:w-1/2 space-y-5 px-5 m-3">
          <h1 className="text-xl font-medium text-center">Signup to Mitsuri</h1>
          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-primary animate-spin"></i>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md border border-[#F5F5DC] flex gap-2 items-center">
                <label htmlFor="name" className="px-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full h-full focus:outline-none"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
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
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-[#F5F5DC]">
                <label htmlFor="password" className="px-2">
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
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-[#F5F5DC]">
                <label
                  htmlFor="passwordConfirmation"
                  className="px-2 flex-shrink-0 min-w-[150px]"
                >
                  Password Confirmation
                </label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="w-full h-full focus:outline-none"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <p className="px-4 text-red-500">{matchPassword}</p>
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full font-medium  bg-secondary text-primary rounded-md"
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
