import { useState } from 'react';
import { useTasksDispatch } from '../hooks/useTasks';
import { ACTIONS } from '../context/TasksContext';

function AddTask() {
  const dispatch = useTasksDispatch();
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        done: false,
      },
    });
    setText('');
  }

  console.log('render AddTask');

  return (
    <form onSubmit={handleSubmit} className="row" style={{ marginBottom: 16 }}>
      <input
        className="grow"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddTask;
