import { useMemo } from 'react';
import { useCart, useCartDispatch } from '../hooks/useCart';
import { CART_ACTIONS } from '../context/CartContext';

const PRODUCTS = [
  { id: 'p1', title: 'Клавиатура', price: 3500 },
  { id: 'p2', title: 'Мышь', price: 1200 },
  { id: 'p3', title: 'Монитор', price: 18900 },
  { id: 'p4', title: 'Наушники', price: 4300 },
];

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₽`;

function Catalog() {
  const dispatch = useCartDispatch();

  return (
    <div className="card">
      <h3>Каталог</h3>
      <ul className="list">
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <span className="grow">{p.title}</span>
            <span>{formatPrice(p.price)}</span>
            <button onClick={() => dispatch({ type: CART_ACTIONS.ADD, payload: p })}>
              В корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cart() {
  const items = useCart();
  const dispatch = useCartDispatch();

  const { count, total } = useMemo(
    () =>
      items.reduce(
        (acc, i) => ({ count: acc.count + i.qty, total: acc.total + i.qty * i.price }),
        { count: 0, total: 0 }
      ),
    [items]
  );

  return (
    <div className="card">
      <h3>Корзина</h3>
      {items.length === 0 ? (
        <p className="muted">Корзина пуста</p>
      ) : (
        <>
          <ul className="list">
            {items.map((i) => (
              <li key={i.id}>
                <span className="grow">{i.title}</span>
                <button onClick={() => dispatch({ type: CART_ACTIONS.DECREMENT, payload: i.id })}>
                  −
                </button>
                <span>{i.qty}</span>
                <button onClick={() => dispatch({ type: CART_ACTIONS.INCREMENT, payload: i.id })}>
                  +
                </button>
                <span style={{ minWidth: 90, textAlign: 'right' }}>
                  {formatPrice(i.qty * i.price)}
                </span>
                <button onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: i.id })}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="row" style={{ marginTop: 12 }}>
            <b className="grow">
              Итого: {count} шт. на {formatPrice(total)}
            </b>
            <button onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}>Очистить</button>
          </div>
        </>
      )}
    </div>
  );
}

function CartPage() {
  return (
    <>
      <h2>Корзина через Context + useReducer</h2>
      <Catalog />
      <Cart />
    </>
  );
}

export default CartPage;
