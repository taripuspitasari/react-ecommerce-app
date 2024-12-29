import React from "react";
import {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addNewAddress} from "../app/slices/addressSlice";

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
  };

  return (
    <div>
      <div className="hidden border border-slate-400 p-4 rounded-xl space-y-3">
        <h3 className="text-lg font-medium text-center">Detail address</h3>
        {loading && (
          <div className="flex justify-center items-center">
            <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="w-full">
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="name"
                className="px-2 flex-shrink-0 min-w-[150px]"
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
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="city"
                className="px-2 flex-shrink-0 min-w-[150px]"
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
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="address"
                className="px-2 flex-shrink-0 min-w-[150px]"
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
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="postalCode"
                className="px-2 flex-shrink-0 min-w-[150px]"
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
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="phoneNumber"
                className="px-2 flex-shrink-0 min-w-[150px]"
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
            className="py-2 px-4 w-full rounded-full  bg-[#A5D6A7] hover:bg-[#96c497]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
