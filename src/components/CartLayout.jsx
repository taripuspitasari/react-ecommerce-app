import React from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CartLayout() {
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

  return (
    <div className="flex flex-col md:flex-row md:items-start min-h-screen w-full bg-[#F5F5DC]">
      <div className="md:w-2/3">
        <Outlet />
      </div>
      <div className="md:w-1/3 px-4 pt-5 md:pt-16">
        <div className="mx-auto border shadow-xl border-slate-200 rounded-md p-4">
          <h3 className="text-center pb-2 font-bold">Order Summary</h3>
          <table className="mx-auto w-full">
            <tbody>
              <tr className="text-slate-500">
                <td className="p-1">Date</td>
                <td className="text-right p-1">01 Jan 2025</td>
              </tr>
              <tr className="text-slate-500 border-b">
                <td className="p-1">Time</td>
                <td className="text-right p-1">05:35 PM</td>
              </tr>
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
              <tr className="border-t">
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
              onClick={() => navigate("/carts/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
