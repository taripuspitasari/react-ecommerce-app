export default function Users() {
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
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3">
                  Subtotal
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Pencukur bulu
                </th>
                <td className="px-4 py-3">Rp. 98.000</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3 ">
                    <button className="font-bold">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <p>2</p>
                    <button className="font-bold">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">Rp. 196.000</td>
                <td className="px-4 py-3">
                  <i className="fa-regular fa-trash-can"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mx-auto border shadow-xl border-slate-200 rounded-md w-1/3 p-4 h-52">
          <h3 className="text-xl text-center pb-2 font-medium">
            Order Summary
          </h3>
          <table className="mx-auto w-full">
            <tr>
              <td className="p-1">Subtotal (2 Items)</td>
              <td className="text-right p-1">Rp. 198.000</td>
            </tr>
            <tr>
              <td className="p-1">Shipping</td>
              <td className="text-right p-1">Free</td>
            </tr>
            <tr>
              <td className="p-1">Total</td>
              <td className="text-right p-1">Rp. 198.000</td>
            </tr>
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
