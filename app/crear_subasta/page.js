"use client";

import { docreateAuction } from "./utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateAuction() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // cambiar a accessToken
    // Verifica si el token de acceso existe y es válido
    setIsLoggedIn(!!token); // !!token devuelve true si el token existe y es válido, false si no
  }, []); // al montar el componente, verifica si el usuario está autenticado

  const handleOnSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const accessToken = localStorage.getItem("accessToken");
    const decoded = parseJwt(accessToken);
  
    if (!decoded || !decoded.user_id) {
      setError("No se pudo identificar al usuario");
      return;
    }
  
    const auctionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      closing_date: new Date(formData.get("closing_date")).toISOString(),
      thumbnail: formData.get("thumbnail"),
      price: parseFloat(formData.get("price")),
      stock: parseInt(formData.get("stock")),
      rating: parseFloat(formData.get("rating")),
      category: parseInt(formData.get("category")),
      brand: formData.get("brand"),
      auctioneer: decoded.user_id,
    };
  
    const result = await docreateAuction(auctionData, accessToken);
  
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  if (!isLoggedIn) {
    return <p>Debes iniciar sesión para crear una subasta.</p>;
  }

return (
    <div>
        <h2>Crear nueva subasta</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleOnSubmit}>
            <input name="title" placeholder="Título" required />
            <textarea name="description" placeholder="Descripción" required />
            <input type="datetime-local" name="closing_date" placeholder="Fecha de cierre" required />
            <input name="thumbnail" placeholder="URL de imagen" required />
            <input name="price" type="number" step="0.01" placeholder="Precio inicial" required />
            <input name="stock" type="number" placeholder="Stock" required />
            <input name="rating" type="number" step="0.1" placeholder="Valoración" required />
            <input name="category" type="number" placeholder="ID categoría" required />
            <input name="brand" placeholder="Marca" required />
            <button type="submit">Crear subasta</button>
        </form>
    </div>
);
}
