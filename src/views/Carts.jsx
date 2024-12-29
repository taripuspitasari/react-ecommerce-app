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
    <div className="h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-3xl py-5 font-medium text-center">My Cart</h2>
      <div className="border w-full border-slate-300 rounded-md">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-b border-slate-300">
            <tr>
              <th scope="col" className="px-4 py-3">
                Product
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Subtotal
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-center"
                onClick={() => dispatch(clearAll(userId))}
              >
                <button>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </th>
            </tr>
          </thead>
          {cartItems.length > 0 ? (
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.product_name}
                  </th>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-between w-full">
                      <button
                        className="font-bold"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="font-bold"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(item.subtotal)}
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    onClick={() =>
                      dispatch(clearItem({userId, cartId: item.id}))
                    }
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td
                  colSpan={5}
                  className="text-center p-2 text-xs text-slate-400"
                >
                  Cart is empty
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
