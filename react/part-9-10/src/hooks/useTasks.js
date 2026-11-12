import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from '../context/TasksContext';

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (ctx === null) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return ctx;
}

export function useTasksDispatch() {
  const ctx = useContext(TasksDispatchContext);
  if (ctx === null) {
    throw new Error('useTasksDispatch must be used within TasksProvider');
  }
  return ctx;
}
