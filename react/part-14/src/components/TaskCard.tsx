import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { ApiTask } from '../api/tasks';

interface TaskCardProps {
  task: ApiTask;
  favorite: boolean;
  deleting: boolean;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_LABELS = { low: 'низкий', medium: 'средний', high: 'высокий' } as const;

const TaskCard = memo(function TaskCard({
  task,
  favorite,
  deleting,
  onToggleFavorite,
  onDelete,
}: TaskCardProps) {
  if (import.meta.env.DEV) {
    console.log('render TaskCard', task.id);
  }

  return (
    <li className="task-item">
      <button
        className="icon-btn"
        onClick={() => onToggleFavorite(task.id)}
        aria-label={favorite ? 'Убрать из избранного' : 'В избранное'}
      >
        {favorite ? '⭐' : '☆'}
      </button>
      <Link
        to={`/tasks/${task.id}`}
        style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </Link>
      {task.priority && <span className="muted">{PRIORITY_LABELS[task.priority]}</span>}
      <button onClick={() => onDelete(task.id)} disabled={deleting} aria-label="Удалить задачу">
        Удалить
      </button>
    </li>
  );
});

export default TaskCard;
