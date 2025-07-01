import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearAll, updateCartQuantity, clearItem} from "../app/slices/cartSlice";

export default function Carts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartTotalQuantity, cartTotalAmount, cartItems} = useSelector(
    state => state.cart
  );

  const userId = useSelector(state => state.auth.user.id);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity <= 0) return;
    dispatch(updateCartQuantity({cartId, newQuantity}));
  };

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-xl py-3 font-medium text-center">My Cart</h2>
      <div className="flex flex-col lg:flex-row lg:items-start gap-2">
        <div className="lg:w-2/3">
          <div className="border w-full border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="text-gray-700 uppercase border-b border-gray-300 bg-[#A5D6A7]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Subtotal
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-center ${
                      cartItems.length > 0 ? "block" : "hidden"
                    }`}
                  >
                    <button
                      onClick={() => dispatch(clearAll(userId))}
                      className="text-red-500 hover:text-red-700"
                      title="Clear all"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              {cartItems.length > 0 ? (
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-3 text-left text-gray-900 whitespace-nowrap dark:text-white">
                        {item.product_name}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-evenly">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        {formatPrice(item.subtotal)}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() =>
                            dispatch(clearItem({userId, cartId: item.id}))
                          }
                          className="text-red-500 hover:text-red-700"
                          title="Remove item"
                        >
                          <i className="fa-solid fa-xmark"></i>
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
                      Cart is empty
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="mx-auto border border-slate-200 rounded-md p-4">
            <h3 className="text-center pb-2 font-bold">Order Summary</h3>
            <table className="mx-auto w-full">
              <tbody>
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
            <div
              className={`justify-center ${
                cartItems.length > 0 ? "flex" : "hidden"
              }`}
            >
              <button
                className="py-2 px-4 font-medium rounded-md w-full bg-[#A5D6A7] hover:bg-[#96c497]"
                onClick={() => navigate("/dashboard/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
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
  );
}
