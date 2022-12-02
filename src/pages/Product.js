import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import styles from '../styles/Product.module.css';

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data, isLoading } = useFetch(`https://dummyjson.com/products/${id}`);
  const handleAddToCart = () => {
    addToCart({ id: data.id, quantity: 1, product: data });
    toast.success('Product added to cart');
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.image}>
            <img src={data.thumbnail} alt={data.name} />
          </div>
          <div className={styles.details}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <div>Rating: {data.rating}/5</div>
            <div>Price: ${data.price}</div>
            <div>Stock: {data.stock}</div>
            {data.stock < 50 && <p>Hurry! only a few items left</p>}
            <button className={styles.button} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
