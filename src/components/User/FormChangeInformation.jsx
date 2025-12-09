import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// import {updateUser} from "../../app/slices/authSlice";
import {updateUser} from "../../app/slices/authSlice";

export default function FormChangeInformation({handleCloseModal}) {
  const dispatch = useDispatch();

  const {errors, user, loading} = useSelector(state => state.auth);

  const [data, setData] = useState({name: "", email: ""});

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUser({id: user.id, data}))
      .unwrap()
      .then(() => handleCloseModal())
      .catch(err => console.log(err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full lg:w-1/2 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-5 rounded-lg shadow-lg ">
        <div className="border border-slate-400 p-4 rounded-md space-y-3">
          <div className="relative flex justify-center items-center">
            <h3 className="font-medium text-xl text-center">
              Change Personal Information
            </h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          {loading && (
            <div className="fixed inset-0  z-40">
              <div className="flex justify-center items-center h-full">
                <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
              </div>
            </div>
          )}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                <label
                  htmlFor="name"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Name
                </label>
                <input
                  value={data.name}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full h-full focus:outline-none bg-secondary"
                  onChange={handleChange}
                />
              </div>
              {errors?.name?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.name[0]}
                </p>
              )}
            </div>

            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                <label
                  htmlFor="email"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Email Address
                </label>
                <input
                  value={data.email}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-full focus:outline-none bg-secondary"
                  onChange={handleChange}
                />
              </div>
              {errors?.email?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.email[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full rounded-md font-medium bg-primary text-secondary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
