import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts} from "../app/slices/productSlice";

export default function PublicHome() {
  const dispatch = useDispatch();
  const {loading, products, query, category} = useSelector(
    state => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts({query, category}));
  }, [query, category, dispatch]);

  return (
    <div className="min-h-screen bg-[#E63946]">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-slate-100 animate-spin"></i>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
