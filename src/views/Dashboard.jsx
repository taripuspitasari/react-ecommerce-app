import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import Products from "../components/Products";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setLoading(true);
    axiosClient
      .get("/products")
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
