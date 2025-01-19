import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts} from "../app/slices/productSlice";
import {fetchUserCart} from "../app/slices/cartSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {loading, products, query, category} = useSelector(
    state => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts({query, category}));
  }, [query, category, dispatch]);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
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
