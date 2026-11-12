function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={todo.done ? 'grow muted' : 'grow'}
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>✕</button>
    </li>
  );
}

export default TodoItem;
