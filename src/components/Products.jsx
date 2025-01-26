import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../app/slices/cartSlice";
import {addToWishlist, removeFromWishlist} from "../app/slices/wishlistSlice";

const Product = ({product}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id);
  const {wishlistItems} = useSelector(state => state.wishlist);

  const isItWishlist = wishlistItems.some(
    item => item.product_id === product.id
  );

  const handleToggleWishlist = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const productId = product.id;

    if (isItWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const handleAddToCart = productId => {
    if (!userId) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({productId, quantity: 1}));
  };

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
          <li
            onClick={() => handleAddToCart(product.id)}
            className="text-sm flex justify-center items-center gap-3 border py-1 px-4 rounded-full border-[#FFD700] hover:bg-[#FFD700] cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="text-xs hidden md:block">Add To Cart</span>
          </li>
          <li className="cursor-pointer" onClick={handleToggleWishlist}>
            {isItWishlist ? (
              <i className="fa-solid fa-heart text-red-600"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function Products({products}) {
  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(224px,_1fr))]">
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="pt-20 h-screen flex justify-center items-start">
          <p className="text-2xl font-bold text-gray-300">No products found</p>
        </div>
      )}
    </div>
  );
}
