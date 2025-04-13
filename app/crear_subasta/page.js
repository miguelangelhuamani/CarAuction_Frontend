"use client";

import { docreateAuction, fetchCategories } from "./utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    const accessToken = localStorage.getItem("accessToken");
  
    const auctionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      closing_date: new Date(formData.get("closing_date")).toISOString(),
      thumbnail: formData.get("thumbnail"),
      price: parseFloat(formData.get("price")),
      stock: parseInt(formData.get("stock")),
      rating: parseFloat(formData.get("rating")),
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

  // Si hay token, mostrar el formulario
  return (
    <div>
      <h2>Crear nueva subasta</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleOnSubmit}>
        <input name="title" placeholder="Título" required />
        <br />
        <textarea name="description" placeholder="Descripción" required />
        <br />
        <input type="datetime-local" name="closing_date" required />
        <br />
        <input name="thumbnail" placeholder="URL de imagen" required />
        <br />
        <input name="price" type="number" step="0.01" placeholder="Precio inicial" required />
        <br />
        <input name="stock" type="number" placeholder="Stock" required />
        <br />
        <input name="rating" type="number" step="0.1" placeholder="Valoración" required />
        <br />
        <label htmlFor="category">Categoría:</label>
        <select name="category" required>
          <option value="">Selecciona una categoría</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        <br />
        <input name="brand" placeholder="Marca" required />
        <br />
        <button type="submit">Crear subasta</button>
      </form>
    </div>
  );
}