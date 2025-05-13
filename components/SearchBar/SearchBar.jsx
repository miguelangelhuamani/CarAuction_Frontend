'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { fetchCategories, fetchProducts } from './utils';
import CategorySelect from "@/components/CategorySelect/CategorySelect";
import IsOpen from "@/components/IsOpen/IsOpen";

const SearchBar = ({ setFetchedProducts }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");

    const products = await fetchProducts(category, searchTerm, open);
    setFetchedProducts(products);
  };

  const handleOpenChange = (selectedOpen) => {
    setOpen(selectedOpen)
  }

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          className={styles.searchBar}
        />
        <button className={styles.searchButton} type="submit">
          Buscar
        </button>
      </form>
      <CategorySelect categories={categories} onChange={handleCategoryChange} />
      <IsOpen onChange= {handleOpenChange}></IsOpen>
    </div>
  );
};

export default SearchBar;
