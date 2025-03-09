"use client";

import { useState } from "react";
import styles from "./page.module.css";

const login = async (username, password) => {
  try {
    const dataToSend = { username, password };

    console.log("Enviando datos JSON:", JSON.stringify(dataToSend));

    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Error al iniciar sesión");
    }

    localStorage.setItem("accessToken", data.access);
    return data;
  } catch (error) {
    console.error("Error en login:", error.message);
    return { error: error.message };
  }
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar error anterior

    const result = await login(username, password);

    if (result.error) {
      setError(result.error);
    } else {
      console.log("Usuario autenticado:", result);
      window.location.href = "/perfil"; // Redirigir a otra página tras login exitoso
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <input type="password" name="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="submit">Iniciar Sesión</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <a href="/crear_usuario">¿No tienes cuenta? Crear Usuario</a>
      </main>
    </div>
  );
}