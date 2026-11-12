import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd({ text: trimmed, priority });

    setText('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit} className="row" style={{ marginBottom: 16 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        className="field"
        style={{ flex: 1 }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="field">
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <button type="submit" className="btn btn--primary">
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;
