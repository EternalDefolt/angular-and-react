import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <>
      <h2>Профиль</h2>
      <div className="card">
        <p>
          Привет, <b>{user.name}</b>!
        </p>
        <p className="muted">
          Вход выполнен: {new Date(user.loggedAt).toLocaleString('ru-RU')}
        </p>
        <button onClick={logout}>Выйти</button>
      </div>
    </>
  );
}

export default ProfilePage;
