"use client";

import { docreateAuction, fetchCategories } from "./utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function CreateAuction() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
          // Acceder a localStorage solo en el cliente
          if (typeof window !== 'undefined') {
            setToken(localStorage.getItem("token-jwt"));
          }
      }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };

    loadCategories();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const accessToken = localStorage.getItem("token-jwt");
  
    const auctionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      closing_date: new Date(formData.get("closing_date")).toISOString(),
      thumbnail: formData.get("thumbnail"),
      price: formData.get("price"),
      stock: parseInt(formData.get("stock")),
      rating: formData.get("rating"),
      category: parseInt(formData.get("category")),
      brand: formData.get("brand")
    };
  
    const result = await docreateAuction(auctionData, accessToken);
  
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  if (!token) {
    return <p>Debes iniciar sesión para crear una subasta.</p>;
  }

return (
    <div>
        <h2>Crear nueva subasta</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleOnSubmit} className = {styles.form}>
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
