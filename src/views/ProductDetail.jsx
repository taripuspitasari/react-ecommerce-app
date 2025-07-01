import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../axios-client";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../app/slices/cartSlice";
import {addToWishlist, removeFromWishlist} from "../app/slices/wishlistSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.auth.user.id);
  const {wishlistItems} = useSelector(state => state.wishlist);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/products/${id}`)
      .then(({data}) => {
        setLoading(false);
        const response = data.data;
        setProduct(response);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const isItWishlist = wishlistItems.some(
    item => item.product_id === Number(id)
  );

  const handleToggleWishlist = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const productId = Number(id);

    if (isItWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const formatPrice = price => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = productId => {
    dispatch(addToCart({productId, quantity: 1}));
  };

  return (
    <div className="h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)] bg-beige pb-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-slate-400 animate-spin"></i>
        </div>
      ) : (
        <div>
          <div
            key={product.id}
            className="flex flex-col md:flex-row py-4 md:gap-4 items-start w-11/12 mx-auto"
          >
            <div className="md:w-1/2">
              <img className="rounded-md" src={product.image} />
            </div>
            <div className="mt-3 space-y-2 md:space-y-4">
              <div>
                <h5 className="text-xs text-slate-400">{product.category}</h5>
                <h3 className="font-medium text-xl">{product.name}</h3>
                <p className="font-bold">{formatPrice(product.price)}</p>
              </div>
              <ul className="flex items-center gap-2 md:w-56">
                <li className="text-sm flex justify-center items-center gap-3 border py-1 px-4 rounded-full border-[#FFD700] hover:bg-[#FFD700] cursor-pointer">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-xs hidden md:block">Add To Cart</span>
                </li>
                <li className="cursor-pointer" onClick={handleToggleWishlist}>
                  {isItWishlist ? (
                    <i className="fa-solid fa-heart text-red-600"></i>
                  ) : (
                    <i className="fa-regular fa-heart "></i>
                  )}
                </li>
              </ul>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 w-11/12 mx-auto bg-[#F5F5DC] shadow-md rounded-md">
            <div>
              <h5 className="text-xs text-slate-400">{product.category}</h5>
              <h3 className="font-medium text-xl">{product.name}</h3>
              <p className="font-bold">{formatPrice(product.price)}</p>
            </div>
            <div
              onClick={() => handleAddToCart(id)}
              className="text-sm flex justify-center h-10 font-medium items-center gap-3 border py-1 px-4 rounded-md bg-[#A5D6A7] hover:bg-[#FFD700] cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i>
              <span className="text-xs hidden md:block">Add To Cart</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
