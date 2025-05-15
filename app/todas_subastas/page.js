'use client'
import { useEffect, useState, Suspense } from "react";
import { fetchAllAuctions } from './utils';
import ResultadoBusqueda from "@/components/ResultadoBusqueda/ResultadoBusqueda";
import SearchBar from "@/components/SearchBar/SearchBar";

const ResultadosBusqueda = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const initialProducts = await fetchAllAuctions();
      setProducts(initialProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div>

      <SearchBar setFetchedProducts={setProducts} />
      <Suspense fallback={<div>Cargando resultados...</div>}>
        <ResultadoBusqueda products={products} />
      </Suspense>
    </div>
  );
};

export default ResultadosBusqueda;
