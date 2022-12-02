import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const { cart, removeAllFromCart, removeFromCart } = useCart();

  const handleOrder = () => {
    removeAllFromCart();
  };
  return (
    <div>
      <h1>Cart</h1>
      {cart.length < 1 ? (
        <p>Cart is empty</p>
      ) : (
        <div className={styles.grid}>
          <div className={styles.cart}>
            {cart.map((item) => (
              <div key={item.id} className={styles.card}>
                <h3>
                  <Link to={`/product/${item.id}`}>{item.product.title}</Link>
                </h3>
                Quantity: {item.quantity} <br />
                Price: ${item.product.price}
                <button
                  className={styles.button}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h3>Summary</h3>
            <div>Total Items: {cart.length}</div>
            <div>
              Total Price: $
              {cart.reduce((total, item) => {
                return total + item.product.price * item.quantity;
              }, 0)}
              <Link
                className={styles.order}
                to="/order-successful"
                onClick={handleOrder}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
