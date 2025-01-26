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
    <div className="md:h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-xl py-3 font-medium text-center">My Cart</h2>
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

              <tr className="border-b dark:border-gray-700">
                <td
                  colSpan={3}
                  className="px-6 py-3 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Estimated Shipping
                </td>
                <td className="px-6 py-3 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  FREE
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td
                  colSpan={3}
                  className="px-6 py-3 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total
                </td>
                <td className="px-6 py-3 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {formatPrice(cartTotalAmount)}
                </td>
              </tr>
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
      <div className="flex justify-between">
        <div className={`justify-end mt-2`}>
          <button
            className="py-2 px-4 font-medium rounded-md bg-[#ec4553] text-[#F5F5DC] hover:bg-[#f05360]"
            onClick={() => navigate("/dashboard")}
          >
            Continue Shopping
          </button>
        </div>
        <div
          className={`justify-end mt-2 ${
            cartItems.length > 0 ? "flex" : "hidden"
          }`}
        >
          <button
            className="py-2 px-4 font-medium rounded-md bg-[#A5D6A7] hover:bg-[#96c497]"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
