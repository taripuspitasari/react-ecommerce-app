import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Addresses from "../components/Addresses";
import {fetchUserAddress} from "../app/slices/addressSlice";
import FormAddAddress from "../components/FormAddAddress";
import FormUpdateAddress from "../components/FormUpdateAddress";
import {openModal, setSelectedAddress} from "../app/slices/modalSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const {addresses} = useSelector(state => state.address);
  const {type, selectedAddress} = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length < 0) {
      dispatch(setSelectedAddress(null));
    }
    dispatch(setSelectedAddress(addresses[0]));
  }, [addresses]);

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-3xl py-5 font-medium text-center">Checkout</h2>
      {selectedAddress ? (
        <div className="border border-slate-400 p-4 rounded-xl space-y-3">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Address</h3>
            <button
              className="hover:underline"
              onClick={() => dispatch(openModal({type: "showAddresses"}))}
            >
              Other address
            </button>
          </div>
          <div key={selectedAddress.id}>
            <h4 className="font-bold">
              {selectedAddress.name} | +62{selectedAddress.phone_number}
            </h4>
            <p>
              {selectedAddress.address}, {selectedAddress.city},{" "}
              {selectedAddress.postal_code}
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-slate-400 p-4 rounded-xl space-y-3">
          <h3 className="text-lg font-medium">Addresses</h3>
          <div>
            <h4>No address available.</h4>
          </div>
          <button
            onClick={() => dispatch(openModal({type: "addNewAddress"}))}
            className="py-2 px-4 rounded-md bg-[#A5D6A7] hover:bg-[#96c497]"
          >
            Create new address
          </button>
        </div>
      )}

      {type === "addNewAddress" && <FormAddAddress />}
      {type === "showAddresses" && <Addresses addresses={addresses} />}
      {type === "updateAddress" && <FormUpdateAddress />}
    </div>
  );
}
