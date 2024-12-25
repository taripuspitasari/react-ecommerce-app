import {useSelector} from "react-redux";

export default function Users() {
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
    <div className="h-screen bg-[#F5F5DC] p-2">
      <h2 className="text-3xl py-5 font-medium text-center">My Cart</h2>
      <div className="flex gap-5 items-start ">
        <div className="w-2/3 border border-slate-300 rounded-md">
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
                <th scope="col" className="px-4 py-3 text-center">
                  <button>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </th>
              </tr>
            </thead>
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
                      <button className="font-bold">
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <p>{item.quantity}</p>
                      <button className="font-bold">
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(item.subtotal)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <i className="fa-solid fa-xmark"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto border shadow-xl border-slate-200 rounded-md w-1/3 p-4 h-52">
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
            <button className="py-2 px-4 rounded-md w-full bg-[#A5D6A7] hover:bg-[#96c497]">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
