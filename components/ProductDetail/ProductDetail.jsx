import React from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const ProductDetail = ({ product }) => {
          return (
        <div className={styles.ProductDetail}>
            <h2>{product.name}</h2>
            <section>
                <p>{product.description}</p>
                <p><strong>Año:</strong> {product.year}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Kilometraje:</strong> {product.mileage} km</p>
                <p><strong>Estado:</strong> {product.status}</p>
                <p><strong>Mejor postor:</strong> {product.highestBidder}</p>
                <p><strong>Fin de la subasta:</strong> {new Date(product.endTime).toLocaleString()}</p>
            </section>
            
        </div>
          );
};

export default ProductDetail;
