"use client";

import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Bid from "@/components/Bid/Bid"; // componente para pujar

// Función para extraer el user_id desde el token JWT
function getUserIdFromToken(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.user_id;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

const Detalle = () => {
  const params = useParams();
  const id = params.id; // ID de la subasta
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extraer ID del usuario autenticado desde el token JWT
    const token = localStorage.getItem("token-jwt");
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/auctions/${id}/`);
        const foundProduct = await response.json();
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <ProductDetail product={product} />

          {userId === product.auctioneer_id ? (
            <div>
              <p>Este producto es tuyo</p>
              <Bid productoId={product.id} />
            </div>
          ) : (
            <p>Publicado por {product.auctioneer}</p>
          )}
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Detalle;
