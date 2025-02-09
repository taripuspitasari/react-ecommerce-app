import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts, setSelectedCategory} from "../app/slices/productSlice";

export default function PublicHome() {
  const dispatch = useDispatch();
  const {loading, products, query, category, categories} = useSelector(
    state => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts({query, category}));
  }, [query, category, dispatch]);

  const selectCategory = id => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="min-h-screen bg-tomato">
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
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fa-solid fa-spinner text-4xl text-[#F5F5DC] animate-spin"></i>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
