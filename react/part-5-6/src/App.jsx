import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import RegisterPage from './pages/RegisterPage';
import CatFactsPage from './pages/CatFactsPage';
import WeatherPage from './pages/WeatherPage';
import PostsPage from './pages/PostsPage';
import SearchPage from './pages/SearchPage';
import ReviewPage from './pages/ReviewPage';
import LocationPage from './pages/LocationPage';
import FocusFormPage from './pages/FocusFormPage';
import FilePage from './pages/FilePage';
import IdleFormPage from './pages/IdleFormPage';
import WizardPage from './pages/WizardPage';

const GROUPS = [
  {
    title: 'Часть 5',
    links: [
      { to: '/users', label: 'Пользователи' },
      { to: '/cats', label: 'Кошки' },
      { to: '/weather', label: 'Погода' },
      { to: '/posts', label: 'Пагинация' },
      { to: '/search', label: 'Поиск' },
    ],
  },
  {
    title: 'Часть 6',
    links: [
      { to: '/register', label: 'Регистрация' },
      { to: '/review', label: 'Отзыв' },
      { to: '/location', label: 'Страна и город' },
      { to: '/focus', label: 'Фокус' },
      { to: '/file', label: 'Файл' },
      { to: '/idle', label: 'Неактивность' },
      { to: '/wizard', label: 'Шаги' },
    ],
  },
];

function Layout() {
  return (
    <div className="layout" style={{ maxWidth: 860 }}>
      <header className="header">
        <h1 style={{ margin: 0, fontSize: 22 }}>useEffect, API и формы</h1>
      </header>
      {GROUPS.map((g) => (
        <nav className="nav" key={g.title} style={{ marginBottom: 8, alignItems: 'center' }}>
          <span className="muted" style={{ minWidth: 70 }}>
            {g.title}
          </span>
          {g.links.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      ))}
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/cats" element={<CatFactsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/focus" element={<FocusFormPage />} />
        <Route path="/file" element={<FilePage />} />
        <Route path="/idle" element={<IdleFormPage />} />
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Route>
    </Routes>
  );
}

export default App;
