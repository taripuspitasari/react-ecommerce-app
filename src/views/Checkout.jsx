import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Addresses from "../components/Addresses";
import {fetchUserAddress} from "../app/slices/addressSlice";
import FormAddAddress from "../components/FormAddAddress";
import FormUpdateAddress from "../components/FormUpdateAddress";
import qrImg from "../assets/QR.jpg";

export default function Checkout() {
  const dispatch = useDispatch();
  const {addresses} = useSelector(state => state.address);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length < 0) {
      setSelectedAddress("");
    }
    setSelectedAddress(addresses[0]);
  }, [addresses]);

  const handleSelectMethod = method => {
    setSelectedPaymentMethod(method);
  };

  // const renderPaymentDetails = () => {
  //   switch (selectedMethod) {
  //     case "bank":
  //       return (
  //         <div className="p-4 bg-gray-100 w-full h-full rounded-md">
  //           <p>Please transfer to the following account number:</p>
  //           <p>
  //             Bank: <strong>Mandiri</strong>
  //           </p>
  //           <p>
  //             Account Number: <strong>123-456-789</strong>
  //           </p>
  //           <p>
  //             Account Name: <strong>Mitsuri Food</strong>
  //           </p>
  //           <p>Upload the transfer proof once payment is completed.</p>
  //         </div>
  //       );
  //     case "qr":
  //       return (
  //         <div className="p-4 bg-gray-100 w-full h-full rounded-md">
  //           <p>Scan the QR Code below to pay:</p>
  //           <img src={qrImg} alt="QR Code" width={150} />
  //         </div>
  //       );
  //     case "cod":
  //       return (
  //         <div className="p-4 bg-gray-100 w-full h-full rounded-md">
  //           <p>Payment will be made upon delivery.</p>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="p-4 bg-gray-100 w-full h-full rounded-md">
  //           <p>Please select a payment method.</p>
  //         </div>
  //       );
  //   }
  // };

  const handleOpenModal = modal => {
    setType(modal);
  };

  const handleCloseModal = () => {
    setType("");
  };

  return (
    <div className="md:min-h-screen bg-[#F5F5DC] px-2">
      <h2 className="text-xl py-3 font-medium text-center">Checkout</h2>
      <div className="border shadow-xl border-slate-200 rounded-md p-4 space-y-3">
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
            <div className="grid md:grid-rows-1 md:grid-flow-col gap-3">
              <div
                onClick={() => handleSelectMethod("bank")}
                className={`px-4 py-4 flex flex-col gap-2 justify-center items-center border hover:shadow-xl rounded-md ${
                  selectedPaymentMethod === "bank"
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
            {/* <div className="border border-slate-400 p-4 bg-white w-full min-h-20 rounded-md flex flex-col items-center">
            {renderPaymentDetails()}
            <button className="py-2 px-4 w-full m-1 font-medium rounded-md bg-[#A5D6A7] hover:bg-[#96c497]">
              Confirm Payment
            </button>
          </div> */}
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
