import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';
import UserForm from './practice/UserForm';
import LoginForm from './practice/LoginForm';
import OrderForm from './practice/OrderForm';
import SignupForm from './practice/SignupForm';
import QueryPractice from './practice/QueryPractice';

const LINKS = [
  { to: '/posts', label: 'Блог', end: false },
  { to: '/practice/user', label: 'Пользователь' },
  { to: '/practice/login', label: 'Логин' },
  { to: '/practice/order', label: 'Заказ' },
  { to: '/practice/signup', label: 'Регистрация' },
  { to: '/practice/query', label: 'Посты (ч. 12)' },
];

function Layout() {
  return (
    <div className="layout" style={{ maxWidth: 860 }}>
      <header className="header">
        <h1 style={{ margin: 0, fontSize: 22 }}>React Hook Form, Zod и TanStack Query</h1>
      </header>
      <nav className="nav">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end ?? true}>
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
        <Route path="/practice/user" element={<UserForm />} />
        <Route path="/practice/login" element={<LoginForm />} />
        <Route path="/practice/order" element={<OrderForm />} />
        <Route path="/practice/signup" element={<SignupForm />} />
        <Route path="/practice/query" element={<QueryPractice />} />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Route>
    </Routes>
  );
}

export default App;
