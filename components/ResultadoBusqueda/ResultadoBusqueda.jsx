import React from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const ResultadoBusqueda = ({ products }) => {
  return (
    <div className={styles['resultado-busqueda-container']}>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className={styles['producto-item']}>
            <p>{product.name}</p>
            {/* Agrega más detalles del producto aquí */}
          </div>
        ))
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ResultadoBusqueda;
