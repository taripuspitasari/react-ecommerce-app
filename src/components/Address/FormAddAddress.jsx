import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {createNewAddress} from "../../app/slices/addressSlice";

export default function FormAddAddress({handleOpenModal, handleCloseModal}) {
  const dispatch = useDispatch();
  const {errors, loading} = useSelector(state => state.address);
  const nameRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const phoneNumberRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      city: cityRef.current.value,
      address: addressRef.current.value,
      postal_code: postalCodeRef.current.value,
      phone_number: phoneNumberRef.current.value,
    };

    dispatch(createNewAddress(payload))
      .unwrap()
      .then(() => handleOpenModal("showAddresses"))
      .catch(err => console.log(err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full md:w-1/2 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-2 rounded-lg shadow-lg ">
        <div className="p-2 rounded-md space-y-3">
          <div className="relative flex justify-between items-center border-b border-primary pb-1 text-primary">
            <h3 className="font-medium text-xl text-primary">
              Create New Address
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
                <i className="fa-solid fa-spinner text-xl text-primary animate-spin"></i>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-primary">
                <label
                  htmlFor="name"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  id="name"
                  className="w-full h-full focus:outline-none bg-secondary"
                />
              </div>
              {errors?.name?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-primary">
                <label
                  htmlFor="city"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  City
                </label>
                <input
                  ref={cityRef}
                  type="text"
                  name="city"
                  id="city"
                  className="w-full h-full focus:outline-none bg-secondary"
                />
              </div>
              {errors?.city?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.city[0]}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-primary">
                <label
                  htmlFor="address"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Address
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  name="address"
                  id="address"
                  className="w-full h-full focus:outline-none bg-secondary"
                />
              </div>
              {errors?.address?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.address[0]}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-primary">
                <label
                  htmlFor="postalCode"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Postal Code
                </label>
                <input
                  ref={postalCodeRef}
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="w-full h-full focus:outline-none bg-secondary"
                />
              </div>
              {errors?.postal_code?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.postal_code[0]}
                </p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-primary">
                <label
                  htmlFor="phoneNumber"
                  className="px-2 flex-shrink-0 min-w-[120px]"
                >
                  Phone Number
                </label>
                <input
                  ref={phoneNumberRef}
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="w-full h-full focus:outline-none bg-secondary"
                />
              </div>
              {errors?.phone_number?.[0] && (
                <p className="mt-2 py-2 px-3 text-red-500 bg-red-50 rounded-md border border-red-300">
                  {errors.phone_number[0]}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="py-2 px-4 rounded-md font-medium border border-primary  text-primary"
                onClick={() => handleOpenModal("showAddresses")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-md font-medium bg-primary text-secondary"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
