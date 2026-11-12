import { useState } from 'react';
import { TODOS_KEY } from './TodoPage';
import { COUNTER_KEY } from './CounterPage';
import { DRAFT_KEY } from './DraftPage';
import { THEME_KEY } from '../hooks/useTheme';

const KEYS = [
  { key: TODOS_KEY, label: 'Задачи' },
  { key: COUNTER_KEY, label: 'Счётчик' },
  { key: DRAFT_KEY, label: 'Черновик' },
  { key: THEME_KEY, label: 'Тема' },
];

function readSizes() {
  return KEYS.map((k) => {
    let value = null;
    try {
      value = localStorage.getItem(k.key);
    } catch {
      value = null;
    }
    return { ...k, size: value ? value.length : 0 };
  });
}

function SettingsPage() {
  const [items, setItems] = useState(readSizes);

  function resetAll() {
    if (!confirm('Сбросить все сохранённые данные? Это действие нельзя отменить.')) {
      return;
    }
    KEYS.forEach((k) => {
      try {
        localStorage.removeItem(k.key);
      } catch (err) {
        console.warn(`Не удалось удалить ${k.key}`, err);
      }
    });
    window.location.reload();
  }

  return (
    <div>
      <h2>Очистка с подтверждением</h2>
      <div className="card">
        <ul className="list">
          {items.map((i) => (
            <li key={i.key}>
              <span className="grow">{i.label}</span>
              <code className="muted">{i.key}</code>
              <span style={{ minWidth: 90, textAlign: 'right' }}>
                {i.size ? `${i.size} симв.` : 'пусто'}
              </span>
            </li>
          ))}
        </ul>
        <div className="row" style={{ marginTop: 12 }}>
          <button onClick={() => setItems(readSizes())}>Обновить</button>
          <button onClick={resetAll}>Сбросить всё</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
