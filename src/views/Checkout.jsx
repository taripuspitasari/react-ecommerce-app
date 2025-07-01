import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Addresses from "../components/Addresses";
import {fetchUserAddress} from "../app/slices/addressSlice";
import FormAddAddress from "../components/FormAddAddress";
import FormUpdateAddress from "../components/FormUpdateAddress";
import {setPaymentMethod, setSelectedAddress} from "../app/slices/orderSlice";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../app/slices/orderSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const {addresses} = useSelector(state => state.address);
  const {selectedAddress, selectedPaymentMethod} = useSelector(
    state => state.order
  );

  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length < 0) {
      dispatch(setSelectedAddress(null));
    }
    dispatch(setSelectedAddress(addresses[0]));
  }, [addresses]);

  const handleSelectMethod = method => {
    dispatch(setPaymentMethod(method));
  };

  const handleOpenModal = modal => {
    setType(modal);
  };

  const handleCloseModal = () => {
    setType("");
  };

  const navigate = useNavigate();
  const {cartTotalQuantity, cartTotalAmount, cartItems} = useSelector(
    state => state.cart
  );

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleProceed = () => {
    dispatch(createOrder());
    navigate("/dashboard");
  };

  return (
    <div className="lg:min-h-screen bg-[#F5F5DC] px-2">
      <h2 className="text-xl py-3 font-medium text-center">Checkout</h2>
      <div className="flex flex-col lg:flex-row lg:items-start gap-2">
        <div className="lg:w-2/3 border border-slate-200 rounded-md p-4 space-y-3">
          {selectedAddress ? (
            <div className="space-y-3 border-b border-slate-300 pb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">Address</h3>
                <button
                  className="hover:underline font-bold"
                  onClick={() => handleOpenModal("showAddresses")}
                >
                  Other address
                </button>
              </div>
              <div key={selectedAddress.id}>
                <h4 className="font-medium">
                  {selectedAddress.name} | +62{selectedAddress.phone_number}
                </h4>
                <p>
                  {selectedAddress.address}, {selectedAddress.city},{" "}
                  {selectedAddress.postal_code}
                </p>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-300 pb-3 space-y-3">
              <h3 className="font-bold">Address</h3>
              <div>
                <h4>No address available.</h4>
              </div>
              <button
                className="py-2 px-4 font-medium rounded-md bg-[#A5D6A7] hover:bg-[#96c497]"
                onClick={() => handleOpenModal("addNewAddress")}
              >
                Create new address
              </button>
            </div>
          )}

          <div className="space-y-3 mt-4">
            <h3 className="font-bold">Select payment method</h3>
            <div className="flex flex-col gap-5">
              <div className="grid lg:grid-rows-1 lg:grid-flow-col gap-3">
                <div
                  onClick={() => handleSelectMethod("bank_transfer")}
                  className={`px-4 py-4 flex flex-col gap-2 justify-center items-center border hover:shadow-xl rounded-md ${
                    selectedPaymentMethod === "bank_transfer"
                      ? "border-[#A5D6A7] border-2 shadow-xl"
                      : "border-slate-400"
                  }`}
                >
                  <i className="fa-regular fa-credit-card"></i>
                  <p>Bank Transfer</p>
                </div>
                <div
                  onClick={() => handleSelectMethod("qr")}
                  className={`px-4 py-4 flex flex-col gap-2 justify-center items-center border hover:shadow-xl rounded-md ${
                    selectedPaymentMethod === "qr"
                      ? "border-[#A5D6A7] border-2 shadow-xl"
                      : "border-slate-400"
                  }`}
                >
                  <i className="fa-solid fa-wallet"></i>
                  <p>Wallet</p>
                </div>
                <div
                  onClick={() => handleSelectMethod("cod")}
                  className={`px-4 py-4 flex flex-col gap-2 justify-center items-center border hover:shadow-xl rounded-md ${
                    selectedPaymentMethod === "cod"
                      ? "border-[#A5D6A7] border-2 shadow-xl"
                      : "border-slate-400"
                  }`}
                >
                  <i className="fa-solid fa-rupiah-sign"></i>
                  <p>COD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="mx-auto border border-slate-200 rounded-md p-4">
            <h3 className="text-center pb-2 font-bold">Order Summary</h3>
            <table className="mx-auto w-full">
              <tbody>
                <tr>
                  <td className="p-1">Products</td>
                  <td className="text-right p-1 text-slate-500">Quantity</td>
                </tr>
                {cartItems.map(item => (
                  <tr key={item.id} className="text-slate-500">
                    <td className="p-1"> {item.product_name}</td>
                    <td className="text-right p-1">{item.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-1">Subtotal ({cartTotalQuantity} Items)</td>
                  <td className="text-right p-1 text-slate-500">
                    {formatPrice(cartTotalAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="p-1">Shipping</td>
                  <td className="text-right p-1 text-slate-500">Free</td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="p-1">Total</td>
                  <td className="text-right p-1 text-slate-500">
                    {formatPrice(cartTotalAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center">
              <button
                className="py-2 px-4 font-medium rounded-md w-full bg-[#A5D6A7] hover:bg-[#96c497]"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <div className={`justify-end mt-2`}>
              <button
                className="py-2 px-4 font-medium rounded-md text-[#ec4553] hover:underline"
                onClick={() => navigate("/dashboard")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      {type === "addNewAddress" && (
        <FormAddAddress
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      {type === "showAddresses" && (
        <Addresses
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          addresses={addresses}
          setSelectedAddress={setSelectedAddress}
        />
      )}
      {type === "updateAddress" && (
        <FormUpdateAddress handleOpenModal={handleOpenModal} />
      )}
    </div>
  );
}
