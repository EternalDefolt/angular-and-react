import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.name.toLowerCase() === trimmed.toLowerCase());
      if (existing) {
        return prev.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id: Date.now(), name: trimmed, qty, bought: false }];
    });
    setName('');
    setQty(1);
  }

  function handleToggle(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, bought: !i.bought } : i)));
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const left = items.filter((i) => !i.bought).length;

  return (
    <div>
      <h2>🛒 Список покупок</h2>
      <form onSubmit={handleAdd} className="row" style={{ marginBottom: 16 }}>
        <input
          className="field"
          style={{ flex: 1 }}
          placeholder="Товар"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="field"
          type="number"
          min="1"
          style={{ width: 70 }}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
        <button type="submit" className="btn btn--primary">
          Добавить
        </button>
      </form>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>Список пуст</p>
      ) : (
        <>
          <p className="muted">Осталось купить: {left} из {items.length}</p>
          <ul className="list card" style={{ padding: '4px 16px' }}>
            {items.map((item) => (
              <li
                key={item.id}
                className="row"
                style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}
              >
                <input type="checkbox" checked={item.bought} onChange={() => handleToggle(item.id)} />
                <span
                  style={{
                    flex: 1,
                    textDecoration: item.bought ? 'line-through' : 'none',
                    color: item.bought ? '#999' : 'inherit',
                  }}
                >
                  {item.name}
                </span>
                <span className="muted">× {item.qty}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 18 }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn--danger"
            style={{ marginTop: 12 }}
            onClick={() => setItems((prev) => prev.filter((i) => !i.bought))}
            disabled={items.length === left}
          >
            Убрать купленное
          </button>
        </>
      )}
    </div>
  );
}

export default ShoppingList;
