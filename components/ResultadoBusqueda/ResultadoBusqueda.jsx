import React from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS
import ProductCard from '@/components/ProductCard/ProductCard'; // Importa el componente ProductCard

const ResultadoBusqueda = ({ products }) => {
  return (
    <main className={styles.main}>
    <h2>Resultados de la búsqueda</h2>
    <div className={styles.resultados_busqueda}>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={index} product={product}/>
        ))
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
    </main>
  );
};

export default ResultadoBusqueda;
