import { useEffect, useState } from 'react';
import { getCatFact } from '../api';

function CatFactsPage() {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    getCatFact(controller.signal)
      .then((data) => setFact(data.fact))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <div>
      <h2>🐱 Факты о кошках</h2>
      <div className="card" style={{ minHeight: 100 }}>
        {loading && <p>Загрузка...</p>}
        {!loading && error && <p className="error">Ошибка: {error}</p>}
        {!loading && !error && fact && <p style={{ fontSize: 18 }}>{fact}</p>}
      </div>
      <button onClick={() => setReloadKey((k) => k + 1)} disabled={loading}>
        Ещё
      </button>
    </div>
  );
}

export default CatFactsPage;
