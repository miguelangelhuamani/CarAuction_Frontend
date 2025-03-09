import React from "react";
import styles from "./styles.module.css";

const Search = () => {
    return (
        <div className={styles.search}>
            <input type="text" placeholder="Buscar..." />
            <button>Buscar</button>
        </div>
    );
}

export default Search;

