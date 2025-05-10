import React from 'react';
import styles from './styles.module.css';

const ProductDetail = ({ product }) => {
  return (
    <div className={styles.ProductDetail}>
      <h2>{product.title}</h2>

      <section>
        <p>{product.description}</p>
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Precio inicial:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Valoración:</strong> {product.rating}/5</p>
        <p><strong>Estado:</strong> {product.isOpen ? 'Abierta' : 'Cerrada'}</p>
        <p><strong>Fecha de cierre:</strong> {new Date(product.closing_date).toLocaleString()}</p>
        <p><strong>Subastador:</strong> {product.auctioneer ?? 'No asignado'}</p>
      </section>
    </div>
  );
};

export default ProductDetail;
