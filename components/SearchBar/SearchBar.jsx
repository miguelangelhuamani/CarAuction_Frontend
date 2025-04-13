'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ResultadoBusqueda from '@/components/ResultadoBusqueda/ResultadoBusqueda';

const SearchBar = ({ onFilteredProducts = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auctions/');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const items = data.results;

        if (Array.isArray(items)) {
          setProducts(items);
          setFilteredProducts(items);
        } else {
          console.error('Fetched data is not an array:', items);
        }
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = products.filter(product =>
      product.title && product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    onFilteredProducts(filtered);
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilteredProducts(filtered);
    localStorage.setItem('filteredProducts', JSON.stringify(filtered));
    window.location.href = `/resultados_busqueda?searchTerm=${searchTerm}`;
  };

  return (
    <div className={styles['search-bar-container']}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
        className={styles['search-bar']}
      />
      <button
        className={styles['search-button']}
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
