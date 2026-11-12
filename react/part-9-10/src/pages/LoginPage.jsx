import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/profile';

  if (user) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    login(trimmed);
    navigate(from, { replace: true });
  }

  return (
    <>
      <h2>Вход</h2>
      <form className="card row" onSubmit={handleSubmit}>
        <input
          className="grow"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя пользователя"
        />
        <button type="submit">Войти</button>
      </form>
      <p className="muted">Страница «Профиль» доступна только после входа.</p>
    </>
  );
}

export default LoginPage;
