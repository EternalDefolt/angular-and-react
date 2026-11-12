import { useContext } from 'react';
import { CartContext, CartDispatchContext } from '../context/CartContext';

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === null) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === null) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return ctx;
}
