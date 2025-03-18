"use client";

import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Detalle = () => {
  const params = useParams();
  const id = params.id; // Obtiene el parámetro de la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        
      try {
        const response = await fetch('/docs/productos.json');
        const file = await response.json();

        const foundProduct = file.item.find((product) => product.id === parseInt(id));
        setProduct(foundProduct);

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); //every time id changes, fetch product

  return (
    <div>
      {product ? <ProductDetail product={product} /> : <p>Loading...</p>}
    </div>
  );
};

export default Detalle;

