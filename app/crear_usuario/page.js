"use client";

import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
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

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      
      if (e.target.name === 'comunidad') {
        setProvincias(comunidades[e.target.value] || []);
        setFormData(prev => ({ ...prev, provincia: '' }));
      }
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      const requestData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        locality: formData.locality,
        municipality: formData.municipality,
      };
  
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
  
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  
        const createdUser = await response.json();
        console.log(createdUser);
  
        resetForm();
      } catch (error) {
        console.error("Error al crear usuario:", error);
      }
    };
  
    const resetForm = () => {
      setFormData({});
      document.getElementById("UserForm").reset();
    };
  
return (
  <div className={styles.page}>
    <main className={styles.main}>
    <h2>Crear usuario</h2>
        <form id="UserForm" onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Usuario" onChange={handleChange} />
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
          <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChange} />
          <input type="text" name="id" placeholder="DNI/NIE" onChange={handleChange} />
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} />

          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input type="date" id="birthdate" name="birthdate" onChange={handleChange} />

          <input type="text" name="adress" placeholder="Dirección" onChange={handleChange} />

          <select id="comunidad" name="comunidad" onChange={handleChange}>
            <option value="">Selecciona una comunidad</option>
            <option value="Madrid">Madrid</option>
            <option value="Cataluña">Cataluña</option>
            <option value="Andalucía">Andalucía</option>
            <option value="Valencia">Valencia</option>
            <option value="País Vasco">País Vasco</option>
            <option value="Galicia">Galicia</option>
            <option value="Castilla y León">Castilla y León</option>
            <option value="Castilla-La Mancha">Castilla-La Mancha</option>
            <option value="Extremadura">Extremadura</option>
            <option value="Aragón">Aragón</option>
            <option value="Asturias">Asturias</option>
            <option value="Cantabria">Cantabria</option>
            <option value="Murcia">Murcia</option>
            <option value="Navarra">Navarra</option>
            <option value="La Rioja">La Rioja</option>
            <option value="Baleares">Baleares</option>
            <option value="Canarias">Canarias</option>
            <option value="Ceuta y Melilla">Ceuta y Melilla</option>
          </select>

          <select id="provincia" name="provincia" onChange={handleChange}>
            <option value="">Selecciona una provincia</option>
            {provincias.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))}
          </select>

          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
          <input type="password" name="password2" placeholder="Repetir Contraseña" onChange={handleChange} />

          <button type="submit">Crear Usuario</button>
          <button type="button" onClick={resetForm}>Limpiar formulario</button>
        </form>
        <a href="/pagina_inicio_sesion">Volver a inicio sesión</a>
      </main>
  </div>
);
};