import React from 'react';
import styles from './styles.module.css';
import Comment from '../Comment/Comment';

const ProductDetail = ({ product }) => {
  return (
    <div className={styles.ProductDetail}>
      <h2>{product.title}</h2>

      <section>
        {product.image && (
            <img
              src={`${product.image}`}
              alt="Imagen de la subasta"
              style={{
                  maxWidth: "650px",
                  borderRadius: "10px",
                  display: "block",
                  marginBottom: "1rem"
                }}
            />
          )}
        <p>{product.description}</p>
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Precio inicial:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p>Valoración: {product.avg_rating ? product.avg_rating : "Sin valorar"}</p>
        <p><strong>Estado:</strong> {product.isOpen ? 'Abierta' : 'Cerrada'}</p>
        <p><strong>Pujas actualmente:</strong> {product.bid_counts}</p>
        <p><strong>Fecha de creación:</strong> {new Date(product.creation_date).toLocaleString()}</p>  
        <p><strong>Fecha de cierre:</strong> {new Date(product.closing_date).toLocaleString()}</p>
        <p><strong>Tiempo restante:</strong> {product.time_left}</p>
        <p><strong>Subastador:</strong> {product.auctioneer ?? 'No asignado'}</p>
        <Comment productoId={product.id} />
      </section>
    </div>
  );
};

export default ProductDetail;
