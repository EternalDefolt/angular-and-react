import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useDebounce } from '../hooks/useDebounce';
import { useCreateTask, useDeleteTask, useTasks } from '../hooks/useTasks';
import type { TaskFormValues } from '../schemas/taskSchema';

type Filter = 'all' | 'favorites';

export default function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter: Filter = searchParams.get('filter') === 'favorites' ? 'favorites' : 'all';

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [simulateError, setSimulateError] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();
  const { data, isLoading, isError, error, refetch } = useTasks();
  const createMutation = useCreateTask();
  const deleteMutation = useDeleteTask(simulateError);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const sorted = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.id - b.id);
  }, [data]);

  const visible = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return sorted.filter((task) => {
      if (filter === 'favorites' && !favoriteSet.has(task.id)) return false;
      if (q && !task.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sorted, filter, favoriteSet, debouncedSearch]);

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation.mutate]
  );

  const handleCreate = useCallback(
    (values: TaskFormValues) => createMutation.mutateAsync(values),
    [createMutation.mutateAsync]
  );

  function setFilter(next: Filter) {
    const params = new URLSearchParams(searchParams);
    if (next === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', next);
    }
    setSearchParams(params);
  }

  function renderList() {
    if (sorted.length === 0) {
      return <EmptyState title="Задач пока нет. Создай первую!" />;
    }
    if (filter === 'favorites' && favoriteSet.size === 0) {
      return (
        <EmptyState
          title="Ты пока ничего не добавил в избранное ⭐"
          hint="Нажми на звёздочку рядом с задачей"
        />
      );
    }
    if (visible.length === 0) {
      return <EmptyState title="Ничего не найдено" hint={`По запросу «${debouncedSearch.trim()}» задач нет`} />;
    }
    return (
      <ul className="task-list">
        {visible.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            favorite={favoriteSet.has(task.id)}
            deleting={deleteMutation.isPending && deleteMutation.variables === task.id}
            onToggleFavorite={toggleFavorite}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    );
  }

  if (isLoading) return <p>Загрузка...</p>;
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
      <h1>Задачи</h1>
      <TaskForm onSubmit={handleCreate} />
      {createMutation.isError && <p className="error">Ошибка: {createMutation.error.message}</p>}

      <div className="row" style={{ flexWrap: 'wrap', marginBottom: 12 }}>
        <div className="segmented">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            Все
          </button>
          <button
            className={filter === 'favorites' ? 'active' : ''}
            onClick={() => setFilter('favorites')}
          >
            Избранные ({favorites.length})
          </button>
        </div>
        <input
          style={{ flex: 1, minWidth: 180 }}
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <label className="row muted" style={{ marginBottom: 8 }}>
        <input
          type="checkbox"
          checked={simulateError}
          onChange={(e) => setSimulateError(e.target.checked)}
        />
        Имитировать ошибку сервера при удалении
      </label>
      {deleteMutation.isError && (
        <p className="error">Не удалось удалить: {deleteMutation.error.message}. Задача возвращена.</p>
      )}

      <div className="card" style={{ padding: 0 }}>
        {renderList()}
      </div>
    </div>
  );
}
