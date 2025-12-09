import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axiosClient from "../axios-client";

export default function OrderDetail() {
  const {id} = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    address = "",
    created_at = "",
    order_details = [],
    order_status = "",
    payment_method = "",
    total_amount = 0,
  } = order;

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/orders/${id}`)
      .then(({data}) => {
        setLoading(false);
        const response = data.data;
        setOrder(response);
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
    <div>
      <div className="p-2 flex items-center gap-4 md:hidden">
        <Link className="lg:hidden" to="/dashboard/account/order">
          <i className="fa-solid fa-arrow-left text-lg text-primary"></i>
        </Link>
        <h4 className="font-medium text-primary">Order Details</h4>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-primary animate-spin"></i>
        </div>
      ) : (
        <div className="space-y-2 border rounded-md shadow-md bg-white p-2">
          <div className="grid grid-cols-2 md:grid-cols-5 py-3 border-b space-y-1">
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Order Date</h4>
              <p>{created_at}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Order ID</h4>
              <p>#{id}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Order Status</h4>
              <p className="capitalize">{order_status}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Payment Method</h4>
              <p
                className={`${
                  payment_method === "bank_transfer"
                    ? "capitalize"
                    : "uppercase"
                }`}
              >
                {payment_method}
              </p>
            </div>
            <div className="px-4">
              <h4 className="text-slate-400 text-xs">Total Amount</h4>
              <p>{formatPrice(total_amount)}</p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-x-10 px-2">
            {/* products list */}

            <div className="md:w-1/2">
              <ul className="space-y-1">
                {order_details.map((item, index) => (
                  <li
                    className="p-2 border-gray-300 flex justify-between"
                    key={index}
                  >
                    <div>
                      <h6 className="font-medium  text-nowrap">
                        {item.product_name}
                      </h6>
                      <p className="text-slate-400 text-xs text-nowrap">
                        Price: {formatPrice(item.price)}
                      </p>
                      <p className="text-slate-400 text-xs text-nowrap">
                        Quantity: {item.quantity} pcs
                      </p>
                    </div>
                    <div>
                      <p className="font-medium place-self-end">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* address */}
            <div className="w-1/2 px-2 py-1">
              <h5 className="font-medium mb-1">Delivery Address</h5>
              <p>
                <span>{address.name}</span> |{" "}
                <span>{address.phone_number}</span>
              </p>
              <ul>
                <li>{address.address}</li>
                <li>{address.city}</li>
                <li>{address.postal_code}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
