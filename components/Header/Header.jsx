"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";
import { doLogout } from "./utils";


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

    const handleLogout = async () => doLogout(setToken, setUserName, router);
    
    return (
        <header className={styles.header}>
        <a href="/">
            <h2>Subastas Plan B</h2>
        </a>

        <Link href="/todas_subastas" style={{ marginLeft: "20px" }}>
            Todas las subastas
        </Link>

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