import { useState } from 'react';

const PRIORITY_COLORS = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  function startEdit() {
    setEditText(todo.text);
    setError('');
    setIsEditing(true);
  }

  function handleSave() {
    const trimmed = editText.trim();
    if (!trimmed) {
      setError('Название не может быть пустым');
      return;
    }
    onEdit(todo.id, trimmed);
    setError('');
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setError('');
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  function handleEditChange(e) {
    setEditText(e.target.value);
    if (error && e.target.value.trim()) setError('');
  }

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 12px 12px 8px',
        borderBottom: '1px solid #eee',
        borderLeft: `4px solid ${PRIORITY_COLORS[todo.priority]}`,
      }}
    >
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />

      {isEditing ? (
        <div style={{ flex: 1 }}>
          <input
            value={editText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: '100%',
              padding: 6,
              borderRadius: 6,
              border: `1px solid ${error ? '#ef4444' : '#ddd'}`,
            }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: 13, margin: '4px 0 0' }}>{error}</p>}
        </div>
      ) : (
        <span
          onDoubleClick={startEdit}
          title="Двойной клик для редактирования"
          style={{
            flex: 1,
            cursor: 'pointer',
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#999' : '#1e293b',
          }}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSave} disabled={!editText.trim()} style={{ cursor: 'pointer' }}>
            💾
          </button>
          <button onClick={handleCancel} style={{ cursor: 'pointer' }}>
            ✖️
          </button>
        </>
      ) : (
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18,
            color: '#ef4444',
          }}
        >
          ✕
        </button>
      )}
    </li>
  );
}

export default TodoItem;
