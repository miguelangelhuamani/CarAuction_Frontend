// components/SearchBar/SearchBar.jsx
'use client';

import { useState } from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Buscando:', searchTerm);
  };

  return (
    <div className={styles['search-bar-container']}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
        className={styles['search-bar']} // Aplica el estilo al input
      />
      <button
        className={styles['search-button']} // Aplica el estilo al botón
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;