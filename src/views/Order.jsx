import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {loadUserOrders} from "../app/slices/orderSlice";
import {Link} from "react-router-dom";

export default function Order() {
  const dispatch = useDispatch();
  const {orders, loading, errors} = useSelector(state => state.order);

  useEffect(() => {
    dispatch(loadUserOrders());
  }, []);

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (errors)
    return (
      <div className="pt-20 h-screen flex justify-center items-start">
        <p className="font-bold text-primary text-opacity-50">{errors}</p>
      </div>
    );

  return (
    <div>
      <div className="border w-full border-slate-200 rounded-md overflow-x-auto">
        <table className="w-full text-xs bg-white">
          <thead className="text-gray-700 uppercase border-b border-gray-300 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Date
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          {loading ? (
            <div className="fixed inset-0  z-40">
              <div className="flex justify-center items-center h-full">
                <i className="fa-solid fa-spinner text-xl text-primary animate-spin"></i>
              </div>
            </div>
          ) : orders.length > 0 ? (
            <tbody>
              {orders.map(item => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="px-6 py-3 text-left text-gray-900 whitespace-nowrap dark:text-white">
                    {item.created_at}
                  </td>
                  <td className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white">
                    {item.order_number}
                  </td>
                  <td className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white capitalize">
                    {item.order_status}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {formatPrice(item.total_amount)}
                  </td>

                  <td className="px-6 py-3 text-center">
                    <button className="text-primary cursor-pointer">
                      <Link to={`${item.id}`}>See Details</Link>
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
                  Order is empty
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
