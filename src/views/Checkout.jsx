import React from "react";
import {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewAddress, fetchUserAddress} from "../app/slices/addressSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const {addresses} = useSelector(state => state.address);
  const nameRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const phoneNumberRef = useRef();

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

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
    <div className="h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-3xl py-5 font-medium text-center">Checkout</h2>
      {addresses.length > 0 ? (
        <div className="border border-slate-400 p-4 rounded-xl space-y-3">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Addresses</h3>
            <button className="hover:underline">Other address</button>
          </div>
          {addresses.map(address => (
            <div key={address.id}>
              <h4 className="font-bold">
                {address.name} | +62{address.phone_number}
              </h4>
              <p>
                {address.address}, {address.city}, {address.postal_code}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-slate-400 p-4 rounded-xl space-y-3">
          <h3 className="text-lg font-medium">Addresses</h3>
          <div>
            <h4>No address available.</h4>
          </div>
          <button className="py-2 px-4 rounded-md bg-[#A5D6A7] hover:bg-[#96c497]">
            Create new address
          </button>
        </div>
      )}
      <div className="border border-slate-400 p-4 rounded-xl space-y-3">
        <h3 className="text-lg font-medium">Detail address</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" ref={nameRef} />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityRef} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" ref={addressRef} />
          </div>
          <div>
            <label htmlFor="postal_code">Postal Code</label>
            <input type="text" id="postalCode" ref={postalCodeRef} />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number</label>
            <input type="text" id="phoneNumber" ref={phoneNumberRef} />
          </div>
          <button
            type="submit"
            className="py-2 px-4 rounded-md bg-[#A5D6A7] hover:bg-[#96c497]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
