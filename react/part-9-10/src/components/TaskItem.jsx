import { memo, useCallback } from 'react';
import { useTasksDispatch } from '../hooks/useTasks';
import { ACTIONS } from '../context/TasksContext';

const TaskItem = memo(function TaskItem({ task }) {
  const dispatch = useTasksDispatch();

  const handleToggle = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE, payload: task.id });
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: ACTIONS.DELETE, payload: task.id });
  }, [dispatch, task.id]);

  console.log('render TaskItem', task.text);

  return (
    <li>
      <input type="checkbox" checked={task.done} onChange={handleToggle} />
      <span
        className="grow"
        style={{ textDecoration: task.done ? 'line-through' : 'none' }}
      >
        {task.text}
      </span>
      <button onClick={handleDelete}>✕</button>
    </li>
  );
});

export default TaskItem;
