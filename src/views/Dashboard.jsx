import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import Products from "../components/Products";
import {useStateContext} from "../contexts/ContextProvider";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const {products, setProducts, query, category} = useStateContext();

  useEffect(() => {
    getProducts();
  }, [query]);

  const getProducts = () => {
    setLoading(true);
    axiosClient
      .get(`/products?search=${query}&category=${category}`)
      .then(({data}) => {
        setLoading(false);
        setProducts(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
