import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {loadProducts} from "../app/slices/productSlice";

export default function Home() {
  const dispatch = useDispatch();

  const {loading, products} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-primary animate-spin"></i>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
