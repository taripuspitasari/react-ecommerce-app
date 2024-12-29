import React from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CartLayout() {
  const navigate = useNavigate();
  const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart);

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex items-start min-h-screen w-full bg-[#F5F5DC]">
      <div className="w-2/3">
        <Outlet />
      </div>
      <div className="w-1/3 px-4 pt-20">
        <div className="mx-auto border shadow-xl border-slate-200 rounded-md p-4 h-52">
          <h3 className="text-xl text-center pb-2 font-medium">
            Order Summary
          </h3>
          <table className="mx-auto w-full">
            <tbody>
              <tr>
                <td className="p-1">Subtotal ({cartTotalQuantity} Items)</td>
                <td className="text-right p-1">
                  {formatPrice(cartTotalAmount)}
                </td>
              </tr>
              <tr>
                <td className="p-1">Shipping</td>
                <td className="text-right p-1">Free</td>
              </tr>
              <tr>
                <td className="p-1">Total</td>
                <td className="text-right p-1">
                  {formatPrice(cartTotalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center">
            <button
              className="py-2 px-4 rounded-md w-full bg-[#A5D6A7] hover:bg-[#96c497]"
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
