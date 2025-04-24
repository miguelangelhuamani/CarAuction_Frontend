'use client';
 
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { fetchCategories, fetchProducts} from './utils';
import CategorySelect from "@/components/CategorySelect/CategorySelect";


 
const SearchBar = ({ onSearchChange }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
 
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

    onSearchChange(searchTerm, category);
    
    // const fetchedProducts = await fetchProducts(category, searchTerm);
   
 
    // onFilteredProducts(fetchedProducts);
  };
 
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
    </div>
  );
};
 
export default SearchBar;