import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="row">
      <input
        className="grow"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default TodoForm;
