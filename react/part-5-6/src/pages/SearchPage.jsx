import { useEffect, useState } from 'react';
import { searchPosts } from '../api';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      setError(null);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);
    console.log('запрос:', debounced);

    searchPosts(debounced, controller.signal)
      .then(setResults)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debounced]);

  const typing = query.trim() !== debounced;

  return (
    <div>
      <h2>Поиск постов с debounce</h2>
      <input
        style={{ width: '100%', marginBottom: 8 }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Например: qui, dolor, sunt"
      />
      <p className="muted" style={{ minHeight: 24 }}>
        {typing && 'печатает...'}
        {!typing && loading && 'Поиск...'}
        {!typing && !loading && debounced && !error && `Найдено: ${results.length}`}
      </p>
      {error && <p className="error">Ошибка: {error}</p>}
      {!loading && results.length > 0 && (
        <div className="card">
          <ul className="list">
            {results.slice(0, 20).map((post) => (
              <li key={post.id}>
                <span className="muted" style={{ minWidth: 32 }}>
                  #{post.id}
                </span>
                <span className="grow">{post.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
