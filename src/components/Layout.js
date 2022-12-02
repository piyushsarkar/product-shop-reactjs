import { NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartIcon from '../icons/Cart';
import styles from '../styles/Layout.module.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Layout = () => {
  const { cart } = useCart();
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <NavLink to="/">Home</NavLink>
          </nav>
          <div className={styles.action}>
            <NavLink className={styles.cart} to="cart">
              <CartIcon />
              Cart{' '}
              {cart.length > 0 && (
                <span>
                  (
                  {cart.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)}
                  )
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </header>
      <ToastContainer
        autoClose={500}
        hideProgressBar={true}
        style={{ top: '3em' }}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
