import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import CartProvider from './context/CartContext';
import Cart from './pages/Cart';
import Home from './pages/Home';
import OrderSuccess from './pages/OrderSuccess';
import Product from './pages/Product';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <Product />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order-successful',
        element: <OrderSuccess />,
      },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
