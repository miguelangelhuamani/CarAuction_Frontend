"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(""); 


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserProfile();
    }
  }, []);


  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://das-p2-backend.onrender.com/api/users/login/",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        setError("Credenciales incorrectas.");
        return;
      }

      const tokenData = await response.json();
      localStorage.setItem("accessToken", tokenData.access); 
      setError(""); 
      fetchUserProfile();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error en la conexión.");
    }
  };


  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(
        "https://das-p2-backend.onrender.com/api/users/profile/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Error al obtener el perfil");
        return;
      }

      const userData = await response.json();
      setUserData(userData); 
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  
  const logout = () => {
    localStorage.removeItem("accessToken"); 
    setUserData(null); 
    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {userData ? (
          <div>
            <h2>Perfil de {userData.username}</h2>
            <p>Email: {userData.email}</p>
            <p>Nombre: {userData.first_name} {userData.last_name}</p>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        ) : (
          <div>
            <h2>Iniciar sesión</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login(username, password);
              }}
            >
              <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <input type="submit" value="Iniciar Sesión" />
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <a href="/crear_usuario">¿No tienes cuenta? Crear Usuario</a>
          </div>
        )}
      </main>
    </div>
  );
}