"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";
import Searchbar from "@/components/SearchBar/SearchBar";

const Header = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        // Acceder a localStorage solo en el cliente
        if (typeof window !== 'undefined') {
          setToken(localStorage.getItem("token-jwt"));
          setUserName(localStorage.getItem("userName"));
        }
    }, []);

    const handleLogout = async () => {
        if (typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refresh-token");
    
          // Llamada para eliminar (blacklistear) el refresh token
          if (refreshToken) {
            try {
              await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
              });
            } catch (error) {
              console.error("Error al invalidar el refresh token:", error);
            }
          }
    
          // Limpiar localStorage y estado
          localStorage.removeItem("token-jwt");
          localStorage.removeItem("refresh-token");
          localStorage.removeItem("userName");
    
          setToken(null);
          setUserName(null);
    
          // Redirigir al inicio de sesión
          router.push("/inicio");
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
                {token ? (
                <>
                    <ul>
                    <li><a href="/perfil">Mi perfil</a></li>
                    <li><a href="/misSubastas">Mis Subastas</a></li>
                    <li><a href="/misPujas">Mis Pujas</a></li>
                    <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>
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