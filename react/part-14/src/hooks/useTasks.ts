import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, deleteTask, getTasks, type ApiTask } from '../api/tasks';
import type { TaskFormValues } from '../schemas/taskSchema';

export const TASKS_KEY = ['tasks'] as const;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TaskFormValues) =>
      createTask({
        title: values.title,
        body: values.body,
        userId: values.userId,
        priority: values.priority,
        completed: false,
      }),
    onSuccess: (created) => {
      queryClient.setQueryData<ApiTask[]>(TASKS_KEY, (old = []) => {
        const maxId = old.reduce((max, t) => Math.max(max, t.id), 0);
        return [...old, { ...created, id: Math.max(created.id, maxId + 1) }];
      });
    },
  });
}

interface DeleteContext {
  previous?: ApiTask[];
}

export function useDeleteTask(simulateError: boolean) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, DeleteContext>({
    mutationFn: async (id) => {
      if (simulateError) {
        await wait(800);
        throw new Error('Сервер недоступен (имитация)');
      }
      await deleteTask(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: TASKS_KEY });
      const previous = queryClient.getQueryData<ApiTask[]>(TASKS_KEY);
      queryClient.setQueryData<ApiTask[]>(TASKS_KEY, (old = []) => old.filter((t) => t.id !== id));
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TASKS_KEY, context.previous);
      }
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ['tasks', String(id)] });
    },
  });
}
