import styles from './styles.module.css'; // Importa los estilos del módulo CSS

const ProductCard = ({ product}) => {

    const handleClick = () => {
        window.location.href = `/detalle/${product.id}`;
    };

    return (
        <button className={styles.productCard} onClick={handleClick}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Año: {product.closing_date}</p>
            <p>Estado: {product.isOpen ? 'Abierto' : 'Cerrado'}</p>
            <p>Fin de la subasta: {product.closing_date}</p>
        </button>
    );
};

export default ProductCard;
