import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTask, type ApiTask } from '../api/tasks';
import { useFavorites } from '../context/FavoritesContext';
import { TASKS_KEY } from '../hooks/useTasks';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => getTask(id!),
    enabled: !!id,
    retry: false,
    initialData: () =>
      queryClient.getQueryData<ApiTask[]>(TASKS_KEY)?.find((t) => String(t.id) === id),
    initialDataUpdatedAt: () => queryClient.getQueryState(TASKS_KEY)?.dataUpdatedAt,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (!data) {
    return (
      <div className="card">
        <p>Задача не найдена</p>
        <Link to="/tasks">← К списку</Link>
      </div>
    );
  }

  const fav = isFavorite(data.id);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <div className="card" style={{ marginTop: 12 }}>
        <h1 style={{ marginTop: 0 }}>{data.title}</h1>
        <p>{data.body ?? 'Описания нет'}</p>
        <p className="muted">
          Автор: userId {data.userId} · {data.completed ? 'выполнена' : 'активна'}
        </p>
        <button onClick={() => toggleFavorite(data.id)}>
          {fav ? '⭐ В избранном' : '☆ В избранное'}
        </button>
      </div>
    </div>
  );
}
