"use client";

import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import Bid from "@/components/Bid/Bid";
import { getUserIdFromToken, fetchAuctionDetail, deleteAuction, createRating, getMyRating, deleteRating, editRating } from "./utils";
import styles from "./page.module.css";


const Detalle = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [myRating, setMyRating] = useState(null);
  const [myRatingId, setMyRatingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    setToken(token);
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

    const loadmyRating = async () => {
      try {
        const ratingData = await getMyRating(id, token);
        const rating = ratingData.rating; // Asegúrate de que ratingData tenga la estructura esperada
        const ratingId = ratingData.id; // Asegúrate de que ratingData tenga la estructura esperada
        
        setMyRating(rating);
        setMyRatingId(ratingId); // Asegúrate de que ratingData tenga la estructura esperada


      } catch (error) {
        console.error("Error al cargar la valoración:", error);
      }
    };

    if (id && token) {
      loadProduct();
      loadmyRating();
    }
  }, [id, token]);



  const handleOnDelete = async () => {
    await deleteAuction(product.id, token);

  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rating = parseInt(formData.get("rating"));

    try {
      await createRating(product.id, rating, token);
      router.push("/todas_subastas");


    } catch (error) {
      console.error("Error al crear la valoración:", error);
      setErrorMessage("Ya has valorado esta subasta");
    }
    
  }

  const handleOnRatingDelete = async () => {
    try {
      await deleteRating(product.id, myRatingId, token);
      setMyRating(null);
      setMyRatingId(null);


    } catch (error) {
      console.error("Error al eliminar la valoración:", error);
    }
  }

  const handleOnRatingEdit = async (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    const rating = parseInt(formData.get("rating"));

    try {
      await editRating(product.id, myRatingId, token, rating);
      setMyRating(rating);


    } catch (error) {
      console.error("Error al editar la valoración:", error);
      setErrorMessage("Ya has valorado esta subasta");
    }
  
  }
    
  

  return (
    <div>
      {product ? (
        <>
          <ProductDetail product={product} />

          <main className={styles.main}>

            {userId === product.auctioneer_id ? (
              <div>
                <p>Este producto es tuyo</p>
                <button onClick={handleOnDelete} className={styles.button}>
                Eliminar subasta
                </button>

                <button onClick = {() => router.push(`/editar_subasta/${product.id}`)} className={styles.button}>
                Editar subasta
                </button>


              </div>
              ) : (
                <div>
                  <p>Publicado por {product.auctioneer}</p>
                  <Bid productoId={product.id} />
                </div>
              )}


            {myRatingId ? (
              <>
                <p>Tu valoración: {myRating}</p>

                <form onSubmit={handleOnRatingEdit}>
                  Editar valoración:
                  <input type="number" name="rating" min="1" max="5" step="1" required />
                  {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  <button type="submit">Valorar</button>
                </form>

                <button onClick={handleOnRatingDelete} className={styles.button}>Eliminar valoración</button>
              </>
            ) : (
              <form onSubmit={handleOnSubmit}>
                Valorar subasta:
                <input type="number" name="rating" min="1" max="5" step="1" required />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Valorar</button>
              </form>
            )}

            </main>
          
          

        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Detalle;