import { memo, useCallback, useMemo, useRef, useState } from 'react';

const INITIAL = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Элемент ${i + 1}`,
  likes: 0,
}));

const ListItem = memo(function ListItem({ item, onLike, onRemove }) {
  const renders = useRef(0);
  renders.current += 1;
  console.log('render ListItem', item.id);

  return (
    <li>
      <span className="grow">{item.title}</span>
      <span>❤ {item.likes}</span>
      <button onClick={() => onLike(item.id)}>Лайк</button>
      <button onClick={() => onRemove(item.id)}>✕</button>
      <span className="muted" style={{ minWidth: 90, textAlign: 'right' }}>
        рендеров: {renders.current}
      </span>
    </li>
  );
});

function MemoListPage() {
  const [items, setItems] = useState(INITIAL);
  const [counter, setCounter] = useState(0);
  const [sortDesc, setSortDesc] = useState(false);

  const handleLike = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, likes: i.likes + 1 } : i))
    );
  }, []);

  const handleRemove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const sorted = useMemo(() => {
    if (!sortDesc) return items;
    return [...items].sort((a, b) => b.likes - a.likes);
  }, [items, sortDesc]);

  return (
    <>
      <h2>Оптимизация списка: memo + useCallback + useMemo</h2>
      <div className="card row">
        <button onClick={() => setCounter((c) => c + 1)}>
          Посторонний счётчик: {counter}
        </button>
        <button onClick={() => setSortDesc((s) => !s)}>
          {sortDesc ? 'Без сортировки' : 'Сортировать по лайкам'}
        </button>
        <button onClick={() => setItems(INITIAL)}>Сбросить</button>
      </div>
      <div className="card">
        <ul className="list">
          {sorted.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onLike={handleLike}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      </div>
      <p className="muted">
        Посторонний счётчик не перерисовывает элементы списка. Лайк перерисовывает
        только один элемент. Проверка через console.log и счётчик рендеров.
      </p>
    </>
  );
}

export default MemoListPage;
