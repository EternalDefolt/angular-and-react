import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О нас' },
  { to: '/todo', label: 'Todo' },
  { to: '/counter', label: 'Счётчик' },
  { to: '/draft', label: 'Черновик' },
  { to: '/settings', label: 'Сброс' },
  { to: '/users', label: 'Пользователи' },
  { to: '/posts', label: 'Блог' },
  { to: '/admin', label: 'Админка' },
];

function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <header className="header">
        <h1 style={{ margin: 0, fontSize: 22 }}>localStorage и React Router</h1>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Тёмная тема' : '☀️ Светлая тема'}
        </button>
      </header>
      <nav className="nav">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
