import React from "react";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateAddress} from "../app/slices/addressSlice";

export default function FormUpdateAddress() {
  const dispatch = useDispatch();
  const {errors, loading, address} = useSelector(state => state.address);

  useEffect(() => {
    if (address) {
      setData({
        name: address.name || "",
        city: address.city || "",
        address: address.address || "",
        postalCode: address.postal_code || "",
        phoneNumber: address.phone_number || "",
      });
    }
  }, [address]);

  const [data, setData] = useState({
    name: "",
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    const payload = {
      name: data.name,
      city: data.city,
      address: data.address,
      postal_code: data.postalCode,
      phone_number: data.phoneNumber,
    };
    console.log(payload);
    dispatch(updateAddress({addressId: address.id, payload}));
  };

  return (
    <div>
      <div className="border border-slate-400 p-4 rounded-xl space-y-3">
        <h3 className="text-lg font-medium text-center">detail address</h3>
        {loading && (
          <div className="flex justify-center items-center">
            <i className="fa-solid fa-spinner text-xl text-slate-400 animate-spin"></i>
          </div>
        )}
        <form onSubmit={handleUpdateSubmit} className="space-y-2">
          <div className="w-full">
            <div className="h-10 p-2 rounded-full flex gap-2 items-center border border-slate-400">
              <label
                htmlFor="name"
                className="px-2 flex-shrink-0 min-w-[150px]"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                onChange={handleChange}
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
                type="text"
                name="city"
                id="city"
                value={data.city}
                className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                onChange={handleChange}
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
                type="text"
                name="address"
                id="address"
                value={data.address}
                className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                onChange={handleChange}
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
                type="text"
                name="postalCode"
                id="postalCode"
                value={data.postalCode}
                className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                onChange={handleChange}
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
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={data.phoneNumber}
                className="w-full h-full focus:outline-none bg-[#F5F5DC]"
                onChange={handleChange}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
