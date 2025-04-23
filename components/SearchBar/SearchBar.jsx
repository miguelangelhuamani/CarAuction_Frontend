'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ResultadoBusqueda from '@/components/ResultadoBusqueda/ResultadoBusqueda';
import { fetchCategories } from './utils';
import CategorySelect from "@/components/CategorySelect/CategorySelect";

const SearchBar = ({ onFilteredProducts = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = products.filter(product =>
      product.title?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    onFilteredProducts(filtered);
  };

  const fetchProducts = async () => {
    try {
      let response;
      if (category) {
        console.log('Fetching products of category:', category);
        response = await fetch(`http://127.0.0.1:8000/api/auctions/categories/${category}/auctions`);
      } else {
        console.log('Fetching all products');
        response = await fetch('http://127.0.0.1:8000/api/auctions/');
      }

      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      const items = data.results;

      if (Array.isArray(items)) {
        setProducts(items);
        setFilteredProducts(items);
        return items; 
      } else {
        console.error('Datos obtenidos no son un array:', items);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  };

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
  };

  const handleSearch = async () => {
    const fetchedProducts = await fetchProducts();
    const filtered = fetchedProducts.filter(product =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
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
      <CategorySelect categories={categories} onChange={handleCategoryChange} />
    </div>
  );
};

export default SearchBar;
