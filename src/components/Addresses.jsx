import React from "react";
import {deleteAddress, getAddress} from "../app/slices/addressSlice";
import {useDispatch} from "react-redux";

export default function Addresses({addresses}) {
  const dispatch = useDispatch();

  return (
    <div>
      {addresses.map(address => (
        <div key={address.id} className="border-b-2 p-2">
          <h4 className="font-bold">
            {address.name} | +62{address.phone_number}
          </h4>
          <p>
            {address.address}, {address.city}, {address.postal_code}
          </p>
          <div className="flex gap-5">
            <button
              className="hover:underline"
              onClick={() => dispatch(getAddress(address.id))}
            >
              update
            </button>
            <button
              className="hover:underline"
              onClick={() => dispatch(deleteAddress(address.id))}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
