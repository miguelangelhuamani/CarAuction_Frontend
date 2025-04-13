"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Searchbar from "@/components/SearchBar/SearchBar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Solo accedemos a `localStorage` después de que el componente se haya montado en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token-jwt");
      setIsLoggedIn(!!token);  // Cambia el estado según si hay token
    }
  }, []);  // Solo se ejecuta una vez, cuando el componente se monta

  const logout = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del enlace

    const refreshToken = localStorage.getItem("refresh_token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/log-out/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      // Limpiar los elementos del almacenamiento local
      localStorage.removeItem("token-jwt");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userName");

      if (!response.ok) {
        const data = await response.json();
        console.error("Error al cerrar sesión:", data);
      }

      setIsLoggedIn(false);  // Actualizar estado después de cerrar sesión
      window.location.href = "/inicio";  // Redirigir al inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className={styles.header}>
      <a href="/">
        <h2>Subastas Plan B</h2>
      </a>

      <Searchbar />

      <nav>
        <ul>
          <li>
            {isLoggedIn ? (
              <>
                <ul>
                  <li><a href="/perfil">Mi perfil</a></li>
                  <li><a href="#" onClick={logout}>Cerrar Sesión</a></li>
                </ul>
              </>
            ) : (
              <a href="/inicio">Iniciar Sesión</a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;