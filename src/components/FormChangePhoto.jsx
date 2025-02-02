import React, {useState, useEffect} from "react";
import defaultImg from "../assets/default.jpg";
import {useSelector, useDispatch} from "react-redux";
import {changePhoto} from "../app/slices/authSlice";

export default function FormChangePhoto({handleCloseModal}) {
  const dispatch = useDispatch();
  const {user, loading, errors, notification} = useSelector(
    state => state.auth
  );
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setPreviewImage(user.image);
    }
  }, [user]);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!photo) {
      alert("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);
    console.log("form data", formData);
    console.log("photo", photo);

    dispatch(changePhoto({id: user.id, newPhoto: formData}));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full md:w-1/2 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5F5DC] p-5 rounded-lg shadow-lg ">
        <div className="border border-slate-400 p-4 rounded-md space-y-3">
          <div className="relative flex justify-center items-center">
            <h3 className="font-medium text-xl text-center">
              Change Photo Profil
            </h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleCloseModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}

          {notification && (
            <div className="flex gap-2 justify-center items-center p-3 bg-[#A5D6A7] rounded-md absolute m-3 z-50 left-1/2 transform -translate-x-1/2 font-medium shadow-lg">
              <i className="fa-solid fa-check"></i>
              <p className="text-center">{notification}</p>
            </div>
          )}

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-evenly">
              <div className="border border-beige h-20 w-20 rounded-full overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={user.image || defaultImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="h-15 p-2 rounded-md flex gap-2 items-center border border-slate-400">
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                    onChange={handleFileChange}
                  />
                </div>
                {errors?.image?.[0] && (
                  <p className="p-1 text-red-500">{errors.image[0]}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full rounded-md font-medium bg-[#A5D6A7] hover:bg-[#96c497]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
