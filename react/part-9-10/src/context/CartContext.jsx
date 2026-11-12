import { createContext, useEffect, useReducer } from 'react';

export const CART_ACTIONS = {
  ADD: 'ADD',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
};

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case CART_ACTIONS.INCREMENT:
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      );
    case CART_ACTIONS.DECREMENT:
      return state
        .map((i) => (i.id === action.payload ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case CART_ACTIONS.REMOVE:
      return state.filter((i) => i.id !== action.payload);
    case CART_ACTIONS.CLEAR:
      return [];
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);

const STORAGE_KEY = 'cart:v1';

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Не удалось сохранить корзину', err);
    }
  }, [items]);

  return (
    <CartContext.Provider value={items}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
