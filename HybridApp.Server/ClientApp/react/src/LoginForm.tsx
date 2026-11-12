import { useState, type FormEvent } from 'react'
import { api, type User } from './api'

interface Props {
  onLogin: (user: User) => void
}

function LoginForm({ onLogin }: Props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const user = await api.login(userName, password)
      onLogin(user)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input
        placeholder="Логин"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" className="primary" disabled={loading || !userName || !password}>
        {loading ? 'Входим...' : 'Войти'}
      </button>
      <p className="muted">Тестовые пользователи: admin / admin123, student / student123</p>
    </form>
  )
}

export default LoginForm
