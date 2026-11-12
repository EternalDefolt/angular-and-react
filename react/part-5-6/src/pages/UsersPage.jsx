import { useEffect, useState } from 'react';
import { getUsers, getUserById } from '../api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setUsersLoading(true);
    setUsersError(null);

    getUsers(controller.signal)
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setUsersError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setUsersLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedId === null) {
      setSelectedUser(null);
      return;
    }

    const controller = new AbortController();

    setUserLoading(true);
    setUserError(null);

    getUserById(selectedId, controller.signal)
      .then((data) => setSelectedUser(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setUserError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setUserLoading(false);
      });

    return () => controller.abort();
  }, [selectedId]);

  function renderUsersList() {
    if (usersLoading) return <p>Загрузка пользователей...</p>;
    if (usersError) return <p className="error">Ошибка: {usersError}</p>;
    if (users.length === 0) return <p>Пользователей нет</p>;

    return (
      <div>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedId(user.id)}
            className={selectedId === user.id ? 'pick selected' : 'pick'}
          >
            {user.name}
          </div>
        ))}
      </div>
    );
  }

  function renderUserDetails() {
    if (selectedId === null) {
      return <p className="muted">Выбери пользователя слева</p>;
    }
    if (userLoading) return <p>Загрузка...</p>;
    if (userError) return <p className="error">Ошибка: {userError}</p>;
    if (!selectedUser) return null;

    const { name, email, phone, website, company, address } = selectedUser;

    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Сайт:</strong> {website}</p>
        <p><strong>Компания:</strong> {company.name}</p>
        <p><strong>Город:</strong> {address.city}</p>
      </div>
    );
  }

  return (
    <div className="split">
      <aside>
        <h3>Пользователи</h3>
        {renderUsersList()}
      </aside>
      <main>
        <h3>Детали</h3>
        {renderUserDetails()}
      </main>
    </div>
  );
}

export default UsersPage;
