import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),

  body: z.string().min(10, 'Минимум 10 символов').max(500, 'Максимум 500 символов'),

  userId: z.coerce
    .number({ invalid_type_error: 'Введите число' })
    .int('Только целое')
    .positive('Должно быть положительным'),

  priority: z.enum(['low', 'medium', 'high']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export const defaultTaskValues: TaskFormValues = {
  title: '',
  body: '',
  userId: 1,
  priority: 'medium',
};
