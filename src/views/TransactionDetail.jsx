import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axiosClient from "../axios-client";

export default function TransactionDetail() {
  const {id} = useParams();
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    address = "",
    created_at = "",
    order_details = [],
    order_status = "",
    payment_method = "",
    total_amount = 0,
  } = transaction;

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/orders/${id}`)
      .then(({data}) => {
        setLoading(false);
        const response = data.data;
        setTransaction(response);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen p-3">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-slate-400 animate-spin"></i>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex items-center gap-4">
              <Link className="md:hidden" to="/my-account/transaction">
                <i className="fa-solid fa-arrow-left text-lg"></i>
              </Link>
              <h4 className="text-xl font-medium">Transaction Details</h4>
            </div>

            <div className="flex justify-between">
              <div>
                <p>Order ID: #{id} </p>
                <p className="text-gray-400">{created_at}</p>
              </div>
              <p>Status: {order_status}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-5 w-full justify-between my-5">
              <div className="w-1/2">
                <h5 className="font-bold mb-1">Delivery Address</h5>
                <p>
                  <span className="font-medium">{address.name}</span> |{" "}
                  <span>{address.phone_number}</span>
                </p>
                <ul>
                  <li>{address.address}</li>
                  <li>{address.city}</li>
                  <li>{address.postal_code}</li>
                </ul>
              </div>
              <div className="w-1/2">
                <h5 className="font-bold mb-1">Payment Details</h5>
                <div className="flex justify-between">
                  <p>Payment method</p>
                  <p>{payment_method}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Amount</p>
                  <p>{formatPrice(total_amount)}</p>
                </div>
              </div>
            </div>

            <div className="my-5">
              <h5 className="font-bold mb-1">Product Details</h5>
              <ul className="space-y-5">
                {order_details.map((item, index) => (
                  <li className="border-b border-gray-300" key={index}>
                    <h6>{item.product_name}</h6>
                    <p className="flex gap-5 text-gray-400">
                      <span>{formatPrice(item.price)}</span>
                      <span>{item.quantity} pcs</span>
                    </p>
                    <p className="font-medium">{formatPrice(item.subtotal)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
