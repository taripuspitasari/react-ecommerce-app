import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserOrder} from "../app/slices/orderSlice";
import {Link} from "react-router-dom";

export default function Transaction() {
  const dispatch = useDispatch();
  const {orderHistory} = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, []);

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full h-screen bg-[#F5F5DC] p-3">
      <h2 className="text-xl font-medium pb-3 text-center">Transaction</h2>
      <div className="border w-full border-slate-200 rounded-md overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="text-gray-700 uppercase border-b border-gray-300 bg-[#A5D6A7]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Date
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Nomor Order
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <button
                  onClick={() => dispatch(clearAll(userId))}
                  className="text-red-500 hover:text-red-700"
                  title="Clear all"
                ></button>
              </th>
            </tr>
          </thead>
          {orderHistory.length > 0 ? (
            <tbody>
              {orderHistory.map(item => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="px-6 py-3 text-left text-gray-900 whitespace-nowrap dark:text-white">
                    {item.created_at}
                  </td>
                  <td className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white">
                    {item.order_status}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {formatPrice(item.total_amount)}
                  </td>

                  <td className="px-6 py-3 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <Link to={`${item.id}`}>see details</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td
                  colSpan={5}
                  className="text-center px-6 py-3 text-slate-400"
                >
                  Transaction is empty
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
