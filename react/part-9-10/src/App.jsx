import { NavLink, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ThemeToggle from './components/ThemeToggle';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import TodoPage from './pages/TodoPage';
import ThemePage from './pages/ThemePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import PreviousPage from './pages/PreviousPage';
import MemoListPage from './pages/MemoListPage';

const LINKS = [
  { to: '/', label: 'Todo' },
  { to: '/theme', label: 'Тема' },
  { to: '/profile', label: 'Профиль' },
  { to: '/cart', label: 'Корзина' },
  { to: '/search', label: 'Поиск' },
  { to: '/previous', label: 'usePrevious' },
  { to: '/memo', label: 'memo-список' },
];

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1 style={{ margin: 0, fontSize: 22 }}>Context API и хуки</h1>
      <div className="row">
        {user ? (
          <>
            <span className="muted">{user.name}</span>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <NavLink to="/login">Войти</NavLink>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="layout">
            <Header />
            <nav className="nav">
              {LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} end>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <Routes>
              <Route path="/" element={<TodoPage />} />
              <Route path="/theme" element={<ThemePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/previous" element={<PreviousPage />} />
              <Route path="/memo" element={<MemoListPage />} />
              <Route path="*" element={<p>Страница не найдена</p>} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
