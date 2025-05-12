"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCategories, doEditAuction } from "./utils";
import styles from "./page.module.css";
import CategorySelect from "@/components/CategorySelect/CategorySelect";

export default function EditAuctionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
  };

  function getUserId(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.target);
    const userId = getUserId(token);

    const auctionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      closing_date: new Date(formData.get("closing_date")).toISOString(),
      thumbnail: formData.get("thumbnail"),
      price: formData.get("price"),
      stock: parseInt(formData.get("stock")),
      category: parseInt(categorySelect),
      brand: formData.get("brand"),
      auctioneer_id: userId,
      
    };

    const result = await doEditAuction(id, auctionData, token);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("✅ Subasta actualizada con éxito");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  if (!token) return <p>Debes iniciar sesión para editar una subasta.</p>;

  return (
    <div>
      <h2>Editar subasta #{id}</h2>

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
        <label htmlFor="closing_date">Fecha de cierre:</label>
        <input type="datetime-local" name="closing_date" required />
        <input name="thumbnail" placeholder="URL de imagen" required />
        <input name="price" type="number" step="0.01" placeholder="Precio inicial" required />
        <input name="stock" type="number" placeholder="Stock" required />

        <label htmlFor="category">Categoría:</label>
        <CategorySelect categories={categories} onChange={handleCategoryChange} />

        <input name="brand" placeholder="Marca" required />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
