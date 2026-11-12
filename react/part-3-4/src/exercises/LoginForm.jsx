import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim() !== '' && password !== '';

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    alert(`Вход: ${email}`);
    setPassword('');
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Форма логина</h2>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <input
          type="email"
          className="field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="field"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
          Войти
        </button>
        {!canSubmit && <p className="muted" style={{ margin: 0 }}>Заполни оба поля</p>}
      </form>
    </div>
  );
}

export default LoginForm;
