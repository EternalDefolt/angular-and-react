import { NavLink, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Layout() {
  const { favorites, clearFavorites } = useFavorites();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? '#fff' : '#374151',
    background: isActive ? '#3b82f6' : 'transparent',
  });

  function handleClear() {
    if (window.confirm('Очистить всё избранное?')) {
      clearFavorites();
    }
  }

  return (
    <div>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: 12,
          borderBottom: '1px solid #e5e7eb',
          background: 'white',
        }}
      >
        <NavLink to="/" style={linkStyle} end>
          Главная
        </NavLink>
        <NavLink to="/tasks" style={linkStyle}>
          Задачи
        </NavLink>
        <NavLink to="/users" style={linkStyle}>
          Пользователи
        </NavLink>
        <span className="row" style={{ marginLeft: 'auto', fontSize: 14 }}>
          ⭐ {favorites.length}
          {favorites.length > 0 && (
            <button className="btn-link" onClick={handleClear}>
              Очистить избранное
            </button>
          )}
        </span>
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
