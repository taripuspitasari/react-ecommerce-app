import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts, setSelectedCategory} from "../app/slices/productSlice";
import {fetchUserCart} from "../app/slices/cartSlice";
import {fetchUserWishlist} from "../app/slices/wishlistSlice";
import {clearNotification} from "../app/slices/orderSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {loading, products, query, category, categories} = useSelector(
    state => state.product
  );
  const {notification} = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchProducts({query, category}));
  }, [query, category, dispatch]);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);

  useEffect(() => {
    dispatch(fetchUserWishlist());
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => dispatch(clearNotification()), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const selectCategory = id => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="min-h-screen bg-beige">
      <div className="lg:hidden flex justify-center gap-2 pt-2">
        <div
          className={`py-2 px-4  rounded-md ${
            category === "" ? "bg-gold" : "bg-green"
          }`}
          key={category?.id || ""}
          onClick={() => selectCategory("")}
        >
          All
        </div>
        {categories?.length > 0 &&
          categories.map(c => (
            <div
              className={`py-2 px-4 rounded-md ${
                (category ?? "") === c.id ? "bg-gold" : "bg-green"
              }`}
              key={c.id}
              onClick={() => selectCategory(c.id)}
            >
              {c.name}
            </div>
          ))}
      </div>
      {notification && (
        <div className="flex gap-2 justify-center items-center p-3 bg-[#A5D6A7] rounded-md lg:w-1/5 absolute m-3 z-50 left-1/2 transform -translate-x-1/2 font-medium shadow-lg">
          <i className="fa-solid fa-check"></i>
          <p className="text-center">Order is successful</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-slate-400 animate-spin"></i>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
