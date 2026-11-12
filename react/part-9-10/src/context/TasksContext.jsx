import { createContext, useReducer, useEffect } from 'react';

export const ACTIONS = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE',
  DELETE: 'DELETE',
  HYDRATE: 'HYDRATE',
};

function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [action.payload, ...state];
    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);
    case ACTIONS.HYDRATE:
      return action.payload;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

const STORAGE_KEY = 'tasks-context:v1';

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.warn('Не удалось сохранить задачи', err);
    }
  }, [tasks]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
