"use client";
 
 import styles from "./page.module.css";
 
 import { doLogin } from "./utils";
 import { useRouter } from "next/navigation";
 import { useState } from "react";
 
 
 export default function Login() {
   const [loading, setLoading] = useState(false);
   const router = useRouter();
 
   const handleOnSubmit = async (event) => {
       event.preventDefault();
       const formData = new FormData(event.target);
 
       const username = formData.get("username");
       const password = formData.get("password");
 
       setLoading(true);
       try {
           const userLogged = await doLogin(username, password);
 
           if (userLogged.error) {
               alert(userLogged.error);
               return;
           }
 
           // Guardar datos en localStorage
           localStorage.setItem("token-jwt", userLogged.access);
           localStorage.setItem("userName", userLogged.username);
 
           // Redirigir al menú principal
           router.push("/");
       } catch (error) {
           alert("Algo salió mal: " + error.message);
       } finally {
           setLoading(false);
       }
   };
 
   return (
     <div className={styles.page}>
       <main className={styles.main}>
         <h2>Iniciar sesión</h2>
 
         <form onSubmit={handleOnSubmit}>
           <input type="text" name="username" placeholder="Usuario" required/>
           <input type="password" name="password" placeholder="Contraseña" required/>
           <button type="submit">Iniciar Sesión</button>
         </form>
 
         <a href="/crear_usuario">¿No tienes cuenta? Crear Usuario</a>
       </main>
     </div>
   );
 };