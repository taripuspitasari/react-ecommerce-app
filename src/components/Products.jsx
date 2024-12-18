import React from "react";
import {Link} from "react-router-dom";

const Product = ({product}) => {
  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      key={product.id}
      className="bg-white md:w-56 md:h-68 m-2 p-4 rounded-md shadow-md"
    >
      <Link to={`/products/${product.id}`}>
        <img className="mb-2 rounded-md w-full" src={product.image} />
      </Link>
      <h5 className="text-xs text-slate-400">{product.category}</h5>
      <h3 className="font-bold">{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <div className="mt-3">
        <ul className="flex justify-between items-center gap-2">
          <li className="text-sm flex justify-center items-center gap-3 border py-1 px-4 rounded-full border-[#FFD700] hover:bg-[#FFD700] cursor-pointer">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="text-xs hidden md:block">Add To Cart</span>
          </li>
          <li className="cursor-pointer">
            <i className="fa-regular fa-heart"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function Products({products}) {
  return (
    <div className="p-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
