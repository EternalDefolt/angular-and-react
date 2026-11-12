import { TasksProvider } from '../context/TasksContext';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

function TodoPage() {
  return (
    <TasksProvider>
      <h2>Todo с Context</h2>
      <div className="card">
        <AddTask />
        <TaskList />
      </div>
      <p className="muted">
        Открой консоль: при переключении задачи рендерится только один TaskItem,
        а AddTask не перерисовывается при изменении списка.
      </p>
    </TasksProvider>
  );
}

export default TodoPage;
