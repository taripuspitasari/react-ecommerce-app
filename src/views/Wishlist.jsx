import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadUserWishlists} from "../app/slices/wishlistSlice";
import Products from "../components/Products";

export default function Wishlist() {
  const dispatch = useDispatch();
  const {wishlists, loading} = useSelector(state => state.wishlist);
  const {products} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(loadUserWishlists());
    console.log(wishlists);
  }, []);

  const wishlistProducts = products.filter(product =>
    wishlists.includes(product.id)
  );

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-primary animate-spin"></i>
        </div>
      ) : (
        <Products products={wishlistProducts} />
      )}
    </div>
  );
}
