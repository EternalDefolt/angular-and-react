import { useEffect, useState } from 'react';
import { findCity, getCurrentWeather } from '../api';

function WeatherPage() {
  const [input, setInput] = useState('Москва');
  const [query, setQuery] = useState('Москва');
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setWeather(null);

        const city = await findCity(query, controller.signal);
        if (!city) {
          setPlace(null);
          setError(`Город «${query}» не найден`);
          return;
        }
        setPlace(city);

        const current = await getCurrentWeather(city.latitude, city.longitude, controller.signal);
        setWeather(current);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) setQuery(trimmed);
  }

  return (
    <div>
      <h2>🌤 Погода</h2>
      <form className="row" onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          className="grow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Город"
        />
        <button type="submit" disabled={loading}>
          Узнать
        </button>
      </form>

      <div className="card">
        {loading && <p>Загрузка...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && place && weather && (
          <>
            <h3 style={{ marginTop: 0 }}>
              {place.name}
              {place.country ? `, ${place.country}` : ''}
            </h3>
            <p style={{ fontSize: 40, margin: '8px 0' }}>
              {Math.round(weather.temperature_2m)}°C
            </p>
            <p className="muted">
              Ощущается как {Math.round(weather.apparent_temperature)}°C · влажность{' '}
              {weather.relative_humidity_2m}% · ветер {weather.wind_speed_10m} км/ч
            </p>
            <p className="muted">
              Координаты: {place.latitude.toFixed(2)}, {place.longitude.toFixed(2)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
