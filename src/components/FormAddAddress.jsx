import React from "react";
import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addNewAddress} from "../app/slices/addressSlice";
import {closeModal, openModal} from "../app/slices/modalSlice";

export default function FormAddAddress() {
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

    dispatch(addNewAddress(payload));
    dispatch(openModal({type: "showAddresses"}));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-full md:w-1/2 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5F5DC] p-5 rounded-lg shadow-lg ">
        <div className="border border-slate-400 p-4 rounded-md space-y-3">
          <div className="relative flex justify-center items-center">
            <h3 className="font-medium text-xl text-center">Detail address</h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => dispatch(closeModal())}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          {loading && (
            <div className="flex justify-center items-center">
              <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
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
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.name?.[0] && (
                <p className="px-4 text-red-500">{errors.name[0]}</p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
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
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.city?.[0] && (
                <p className="px-4 text-red-500">{errors.city[0]}</p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
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
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.address?.[0] && (
                <p className="px-4 text-red-500">{errors.address[0]}</p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
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
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.postal_code?.[0] && (
                <p className="px-4 text-red-500">{errors.postal_code[0]}</p>
              )}
            </div>
            <div className="w-full">
              <div className="h-10 p-2 rounded-md flex gap-2 items-center border border-slate-400">
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
                  className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                />
              </div>
              {errors?.phone_number?.[0] && (
                <p className="px-4 text-red-500">{errors.phone_number[0]}</p>
              )}
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
