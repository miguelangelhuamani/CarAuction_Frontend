import React from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const ProductCard = ({ product, index }) => {
          return (
          <button className={styles.productCard}>
               <h3>{product.name}</h3>
               <p>${product.price}</p>
               <p>Año: {product.year}</p>
               <p>Kilometraje: {product.mileage} km</p>
               <p>Estado: {product.status}</p>
               <p>Mejor postor: {product.highestBidder}</p>
               <p>Fin de la subasta: {new Date(product.endTime).toLocaleString()}</p>
          </button>    
          );
};

export default ProductCard;
