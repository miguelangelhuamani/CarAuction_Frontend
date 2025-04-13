"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResultadoBusqueda from "@/components/ResultadoBusqueda/ResultadoBusqueda";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedFilteredProducts = localStorage.getItem("filteredProducts");
    if (storedFilteredProducts) {
      setFilteredProducts(JSON.parse(storedFilteredProducts));
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
