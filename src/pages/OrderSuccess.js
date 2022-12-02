import { Link } from 'react-router-dom';
import styles from '../styles/OrderSuccess.module.css';

const OrderSuccess = () => {
  return (
    <div className={styles.success}>
      <h2> Order Successful </h2>
      <p> Thank you for your order. </p>
      <Link to={'/'}> Continue Shopping </Link>
    </div>
  );
};
export default OrderSuccess;
