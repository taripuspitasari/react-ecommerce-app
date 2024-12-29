import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Addresses from "../components/Addresses";
import {fetchUserAddress} from "../app/slices/addressSlice";
import FormAddAddress from "../components/FormAddAddress";
import FormUpdateAddress from "../components/FormUpdateAddress";

export default function Checkout() {
  const dispatch = useDispatch();
  const {addresses} = useSelector(state => state.address);

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-2">
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

      <FormAddAddress />
      <Addresses addresses={addresses} />
      <FormUpdateAddress />
    </div>
  );
}
