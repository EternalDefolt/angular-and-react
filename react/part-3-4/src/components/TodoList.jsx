import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>Здесь пусто 🎉</p>;
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
