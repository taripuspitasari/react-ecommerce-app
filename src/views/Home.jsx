import {useEffect} from "react";
import Products from "../components/Products";
import {useSelector, useDispatch} from "react-redux";
import {fetchProducts, setSelectedCategory} from "../app/slices/productSlice";

export default function Home() {
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
    <div>
      <div className="lg:hidden flex justify-center gap-2 pt-2">
        <div
          className={`py-2 px-4  rounded-md border border-primary ${
            category === ""
              ? "bg-primary text-secondary"
              : "bg-secondary text-primary"
          }`}
          key={category?.id || ""}
          onClick={() => selectCategory("")}
        >
          All
        </div>
        {categories?.length > 0 &&
          categories.map(c => (
            <div
              className={`py-2 px-4 rounded-md border border-primary ${
                (category ?? "") === c.id
                  ? "bg-primary text-secondary"
                  : "bg-secondary text-primary"
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
          <i className="fa-solid fa-spinner text-4xl text-primary animate-spin"></i>
        </div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
}
