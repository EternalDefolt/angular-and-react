import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';

const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'done', label: 'Выполненные' },
];

function TaskList() {
  const tasks = useTasks();
  const [filter, setFilter] = useState('all');

  const visibleTasks = useMemo(() => {
    console.log('пересчёт фильтрации');
    if (filter === 'active') return tasks.filter((t) => !t.done);
    if (filter === 'done') return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <div>
      <div className="row" style={{ marginBottom: 12 }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{ fontWeight: filter === f.key ? 'bold' : 'normal' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="muted">Задач нет</p>
      ) : (
        <ul className="list">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
