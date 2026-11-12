import { useLocalStorage } from '../hooks/useLocalStorage';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

export const TODOS_KEY = 'todos-v1';

function TodoPage() {
  const [todos, setTodos] = useLocalStorage(TODOS_KEY, []);

  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearAll() {
    if (confirm('Удалить все задачи?')) {
      setTodos([]);
    }
  }

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div>
      <h2>📝 Todo (сохраняется)</h2>
      <div className="card">
        <TodoForm onAdd={addTodo} />

        <p className="muted">
          Всего: {todos.length} | Выполнено: {doneCount}
        </p>

        {todos.length === 0 ? (
          <p className="muted" style={{ textAlign: 'center', padding: 40 }}>
            Задач пока нет. Добавь первую, она переживёт перезагрузку!
          </p>
        ) : (
          <>
            <ul className="list">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
            <button onClick={clearAll} style={{ marginTop: 16 }}>
              Очистить всё
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
