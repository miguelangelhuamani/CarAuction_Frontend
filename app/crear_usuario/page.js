"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { registerUser } from './utils';
import { useRouter } from "next/navigation";

export default function Register() {
  const comunidades = {
    "Madrid": ["Madrid", "Alcalá de Henares", "Leganés", "Getafe"],
    "Cataluña": ["Barcelona", "Girona", "Tarragona", "Lleida"],
    "Andalucía": ["Sevilla", "Málaga", "Granada", "Córdoba"],
    "Valencia": ["Valencia", "Alicante", "Castellón"],
    "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
    "Galicia": ["Santiago de Compostela", "A Coruña", "Vigo", "Lugo"],
    "Castilla y León": ["Valladolid", "León", "Salamanca", "Burgos"],
    "Castilla-La Mancha": ["Toledo", "Ciudad Real", "Cuenca", "Albacete"],
    "Extremadura": ["Mérida", "Cáceres", "Badajoz"],
    "Aragón": ["Zaragoza", "Huesca", "Teruel"],
    "Asturias": ["Oviedo", "Gijón", "Avilés"],
    "Cantabria": ["Santander"],
    "Murcia": ["Murcia"],
    "Navarra": ["Pamplona"],
    "La Rioja": ["Logroño"],
    "Baleares": ["Palma", "Ibiza", "Mahón"],
    "Canarias": ["Las Palmas", "Tenerife", "Santa Cruz de Tenerife"],
    "Ceuta y Melilla": ["Ceuta", "Melilla"]
  };

  const [formData, setFormData] = useState({});
  const [provincias, setProvincias] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'municipality') {
      setProvincias(comunidades[e.target.value] || []);
      setFormData(prev => ({ ...prev, locality: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username: formData.user,
      email: formData.email,
      password: formData.password,
      first_name: formData.name,
      last_name: formData.lastname,
      birth_date: formData.birthdate,
      municipality: formData.municipality,
      locality: formData.locality,
    };

    const response = await registerUser(requestData);

    if (response && response.user) {
      setSuccessMessage("Usuario creado exitosamente!");  // Mensaje de éxito
      resetForm();
      router.push("/inicio")
    } else if (response && response.errors) {
      setError("Hubo un error en el registro. Inténtalo nuevamente.");  // Manejo de error
    }
  };

  const resetForm = () => {
    setFormData({});
    setProvincias([]);
    document.getElementById("UserForm").reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Crear usuario</h2>
        <form id="UserForm" onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Usuario" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChange} required />
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input type="date" id="birthdate" name="birthdate" onChange={handleChange} required />

          <select id="municipality" name="municipality" onChange={handleChange} required>
            <option value="">Selecciona una comunidad</option>
            {Object.keys(comunidades).map((com, index) => (
              <option key={index} value={com}>{com}</option>
            ))}
          </select>

          <select id="locality" name="locality" onChange={handleChange} required>
            <option value="">Selecciona una provincia</option>
            {provincias.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))}
          </select>

          <button type="submit">Crear Usuario</button>
          <button type="button" onClick={resetForm}>Limpiar formulario</button>
        </form>
      </main>
    </div>
  );
};
