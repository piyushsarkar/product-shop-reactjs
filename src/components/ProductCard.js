import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({ id: product.id, quantity: 1, product });
    toast.success('Product added to cart');
  };

  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className={styles.body}>
        <Link className={styles.link} to={`/product/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <p className={styles.description}>{product.description}</p>
        <div>Rating: {product.rating}/5</div>
        <div>
          Price: ${product.price} ({product.discountPercentage}% off)
        </div>
        {product.stock < 50 && (
          <p className={styles.lessStock}>Hurry! only a few items left</p>
        )}
        <button className={styles.button} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
