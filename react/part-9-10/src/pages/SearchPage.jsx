import { useMemo, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар',
  'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Хабаровск',
  'Владивосток', 'Иркутск', 'Ярославль', 'Калининград', 'Томск', 'Сочи',
];

function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const isTyping = query !== debouncedQuery;

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    console.log('поиск:', q);
    return CITIES.filter((c) => c.toLowerCase().includes(q));
  }, [debouncedQuery]);

  return (
    <>
      <h2>Поиск с useDebounce</h2>
      <div className="card">
        <input
          style={{ width: '100%' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Начни вводить город"
        />
        <p className="muted" style={{ minHeight: 24 }}>
          {isTyping ? 'печатает...' : debouncedQuery && `Найдено: ${results.length}`}
        </p>
        {!isTyping && results.length > 0 && (
          <ul className="list">
            {results.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchPage;
