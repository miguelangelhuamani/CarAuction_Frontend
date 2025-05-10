"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultadoBusqueda from "@/components/ResultadoBusqueda/ResultadoBusqueda";

const SearchResultsContent = () => {
  // mover dentro del searchbar
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const [filteredProducts, setFilteredProducts] = useState([]);

  //useEffect que llame a fetchProducts

  useEffect(() => {
    const storedFilteredProducts = localStorage.getItem("filteredProducts");
    //filtered Products son las subastas del backend; tenemos que filtrarlas por el searchTerm cada vez que cambie el search term

    if (storedFilteredProducts) {
      setFilteredProducts(JSON.parse(storedFilteredProducts)); //JSON.parse lo convierte a objeto real
    }
  }, [searchTerm]);

  return (
    <div>
      <ResultadoBusqueda products={filteredProducts} />
    </div>
  );
};

const ResultadosBusqueda = () => {
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
};

export default ResultadosBusqueda;
