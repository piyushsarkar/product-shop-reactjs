import { createContext, useContext, useReducer } from 'react';

const localCart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  cart: localCart,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    case 'REMOVE_ALL_FROM_CART':
      state.cart = [];
      return { ...state };
    default:
      return state;
  }
};

export const CartContext = createContext();
export const CardDispatchContext = createContext();

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={state}>
      <CardDispatchContext.Provider value={dispatch}>
        {children}
      </CardDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const { cart } = useContext(CartContext);
  const dispatch = useContext(CardDispatchContext);
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  const removeAllFromCart = () => {
    dispatch({ type: 'REMOVE_ALL_FROM_CART' });
  };
  return { cart, addToCart, removeFromCart, removeAllFromCart };
};
