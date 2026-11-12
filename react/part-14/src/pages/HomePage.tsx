import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTasks } from '../hooks/useTasks';

export default function HomePage() {
  const { data, isLoading, isError } = useTasks();
  const { favorites } = useFavorites();

  const stats = useMemo(() => {
    const tasks = data ?? [];
    const done = tasks.filter((t) => t.completed).length;
    return { total: tasks.length, done, active: tasks.length - done };
  }, [data]);

  return (
    <div>
      <h1>Трекер задач</h1>
      {isLoading && <p>Загрузка...</p>}
      {isError && <p className="error">Не удалось загрузить задачи</p>}
      {data && (
        <div className="stats">
          <div className="stat">
            <b>{stats.total}</b>
            <span className="muted">всего</span>
          </div>
          <div className="stat">
            <b>{stats.done}</b>
            <span className="muted">выполнено</span>
          </div>
          <div className="stat">
            <b>{stats.active}</b>
            <span className="muted">активно</span>
          </div>
          <div className="stat">
            <b>{favorites.length}</b>
            <span className="muted">в избранном</span>
          </div>
        </div>
      )}
      <div className="row">
        <Link to="/tasks">Перейти к задачам →</Link>
        <Link to="/tasks?filter=favorites">Избранные →</Link>
      </div>
    </div>
  );
}
