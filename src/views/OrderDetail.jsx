import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axiosClient from "../axios-client";

export default function OrderDetail() {
  const {id} = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("contoh nih");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosClient.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (error) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (error)
    return (
      <div className="pt-20 h-screen flex justify-center items-start">
        <p className="font-bold text-primary text-opacity-50">{error}</p>
      </div>
    );

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
              <p>{order.created_at}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Order ID</h4>
              <p>#{id}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Order Status</h4>
              <p className="capitalize">{order.order_status}</p>
            </div>
            <div className="px-4 md:border-r">
              <h4 className="text-slate-400 text-xs">Payment Method</h4>
              <p
                className={`${
                  order.payment_method === "bank_transfer"
                    ? "capitalize"
                    : "uppercase"
                }`}
              >
                {order.payment_method}
              </p>
            </div>
            <div className="px-4">
              <h4 className="text-slate-400 text-xs">Total Amount</h4>
              <p>{formatPrice(order.total_amount)}</p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-x-10 px-2">
            {/* products list */}

            <div className="md:w-1/2">
              <ul className="space-y-1">
                {order.order_details.map((item, index) => (
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
                <span>{order.address.name}</span> |{" "}
                <span>{order.address.phone_number}</span>
              </p>
              <ul>
                <li>{order.address.address}</li>
                <li>{order.address.city}</li>
                <li>{order.address.postal_code}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
