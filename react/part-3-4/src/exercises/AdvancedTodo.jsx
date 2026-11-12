import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import Filters from '../components/Filters';
import TodoList from '../components/TodoList';
import ProgressBar from '../components/ProgressBar';
import BulkActions from '../components/BulkActions';

const SORTS = {
  date: 'По дате добавления',
  alpha: 'По алфавиту',
};

function AdvancedTodo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true, priority: 'high' },
    { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium' },
    { id: 3, text: 'Сделать todo', done: false, priority: 'low' },
  ]);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sort, setSort] = useState('date');
  const [search, setSearch] = useState('');

  function addTodo({ text, priority }) {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  }

  function completeAll() {
    setTodos((prev) => {
      const allDone = prev.every((t) => t.done);
      return prev.map((t) => ({ ...t, done: !allDone }));
    });
  }

  function deleteDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function clearAll() {
    if (window.confirm('Удалить все задачи?')) {
      setTodos([]);
    }
  }

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  const priorityCounts = {
    all: todos.length,
    high: todos.filter((t) => t.priority === 'high').length,
    medium: todos.filter((t) => t.priority === 'medium').length,
    low: todos.filter((t) => t.priority === 'low').length,
  };

  const query = search.trim().toLowerCase();

  const visibleTodos = todos
    .filter((t) => {
      if (filter === 'active') return !t.done;
      if (filter === 'done') return t.done;
      return true;
    })
    .filter((t) => priorityFilter === 'all' || t.priority === priorityFilter)
    .filter((t) => !query || t.text.toLowerCase().includes(query))
    .sort((a, b) => (sort === 'alpha' ? a.text.localeCompare(b.text, 'ru') : a.id - b.id));

  return (
    <div>
      <h2>📝 Todo List (Часть 4)</h2>

      <TodoForm onAdd={addTodo} />

      <ProgressBar done={counts.done} total={counts.all} />

      <div className="row" style={{ marginBottom: 12 }}>
        <input
          className="field"
          style={{ flex: 1 }}
          placeholder="🔍 Поиск по задачам"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => setSort((prev) => (prev === 'date' ? 'alpha' : 'date'))}
          title="Переключить сортировку"
        >
          ⇅ {SORTS[sort]}
        </button>
      </div>

      <Filters
        current={filter}
        onChange={setFilter}
        counts={counts}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        priorityCounts={priorityCounts}
      />

      {filter === 'done' && visibleTodos.length === 0 && counts.all > 0 && (
        <p style={{ color: '#f59e0b', fontStyle: 'italic' }}>
          Пока нет выполненных задач. Отметь что-нибудь ✅
        </p>
      )}

      {query && visibleTodos.length > 0 && (
        <p className="muted">Найдено по «{search.trim()}»: {visibleTodos.length}</p>
      )}

      <div className="card" style={{ padding: 0 }}>
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>

      <BulkActions
        counts={counts}
        onCompleteAll={completeAll}
        onDeleteDone={deleteDone}
        onClearAll={clearAll}
      />

      <p className="muted" style={{ marginTop: 16 }}>
        Двойной клик по задаче включает редактирование. Enter сохраняет, Esc отменяет.
      </p>
    </div>
  );
}

export default AdvancedTodo;
