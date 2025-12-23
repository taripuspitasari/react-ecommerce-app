import Products from "../components/Products";
import {useSelector} from "react-redux";

export default function Home() {
  const {loading, products} = useSelector(state => state.product);

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
