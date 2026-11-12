import { useEffect, useState } from 'react'
import { api, angularUrl, type User } from './api'
import LoginForm from './LoginForm'
import Notes from './Notes'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setChecking(false))
  }, [])

  async function handleLogout() {
    await api.logout()
    setUser(null)
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="grow">
          <h1>
            <span className="tag tag--react">React</span> HybridApp
          </h1>
          <p className="muted">Общий бэкенд ASP.NET Core и общая кука SharedAuth</p>
        </div>
        <a href={angularUrl}>Открыть Angular →</a>
      </header>

      {checking ? (
        <p className="muted">Проверка сессии...</p>
      ) : user ? (
        <>
          <div className="card row">
            <span className="grow">
              Вы вошли как <b>{user.displayName}</b> ({user.userName}, {user.role})
            </span>
            <button onClick={handleLogout}>Выйти</button>
          </div>
          <Notes user={user} />
        </>
      ) : (
        <LoginForm onLogin={setUser} />
      )}
    </div>
  )
}

export default App
