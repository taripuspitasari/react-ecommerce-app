import Products from "../components/Products";
import {useSelector} from "react-redux";
import Pagination from "../components/Pagination";

export default function Home() {
  const {loading, products, pages} = useSelector(state => state.product);

  return (
    <div>
      {loading || !pages ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-primary animate-spin"></i>
        </div>
      ) : (
        <div>
          <Products products={products} />
          <Pagination pages={pages} />
        </div>
      )}
    </div>
  );
}
