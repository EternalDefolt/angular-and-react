import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/tasks';
import EmptyState from '../components/EmptyState';

export default function UsersPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Загрузка пользователей...</p>;
  if (isError) {
    return (
      <div>
        <p className="error">Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Пользователи</h1>
      <p className="muted" style={{ minHeight: 20 }}>
        {isFetching ? 'Обновление...' : ''}
      </p>
      <div className="card" style={{ padding: 0 }}>
        {data && data.length > 0 ? (
          <ul className="task-list">
            {data.map((user) => (
              <li className="task-item" key={user.id}>
                <Link to={`/users/${user.id}`} style={{ flex: 1 }}>
                  {user.name}
                </Link>
                <span className="muted">{user.address.city}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Пользователей нет" />
        )}
      </div>
    </div>
  );
}
