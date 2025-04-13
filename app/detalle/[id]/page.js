"use client";

import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Bid from "@/components/Bid/Bid";
import { getUserIdFromToken, fetchAuctionDetail } from "./utils";

const Detalle = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchAuctionDetail(id);
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <ProductDetail product={product} />
          {userId === product.auctioneer_id ? (
            <div><p>Este producto es tuyo</p></div>
          ) : (
            <div>
              <p>Publicado por {product.auctioneer}</p>
              <Bid productoId={product.id} />
            </div>
          )}
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Detalle;