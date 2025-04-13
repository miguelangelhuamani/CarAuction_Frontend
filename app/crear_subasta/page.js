"use client";

import { docreateAuction, fetchCategories } from "./utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function CreateAuction() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
  
  function getUserId(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.target);
    const accessToken = localStorage.getItem("token-jwt");
    const userId = getUserId(accessToken);

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
      auctioneer: userId,
    };

    const result = await docreateAuction(auctionData, accessToken);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("✅ Subasta creada con éxito");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  if (!token) {
    return <p>Debes iniciar sesión para crear una subasta.</p>;
  }

  return (
    <div>
      <h2>Crear nueva subasta</h2>

      {error && (
        <div>
          {typeof error === "string" ? (
            <p>{error}</p>
          ) : (
            Object.entries(error).map(([field, messages]) => (
              <p key={field}>
                {field}: {messages.join(", ")}
              </p>
            ))
          )}
        </div>
      )}

      {success && <p>{success}</p>}

      <form onSubmit={handleOnSubmit} className={styles.form}>
        <input name="title" placeholder="Título" required />
        <textarea name="description" placeholder="Descripción" required />
        <input type="datetime-local" name="closing_date" required />
        <input name="thumbnail" placeholder="URL de imagen" required />
        <input name="price" type="number" step="0.01" placeholder="Precio inicial" required />
        <input name="stock" type="number" placeholder="Stock" required />
        <input name="rating" type="number" step="0.1" placeholder="Valoración" required />

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

        <input name="brand" placeholder="Marca" required />
        <button type="submit">Crear subasta</button>
      </form>
    </div>
  );
}
