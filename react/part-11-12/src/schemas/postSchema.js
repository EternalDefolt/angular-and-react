import { z } from 'zod';

export function todayString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseLocalDate(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов'),
  body: z
    .string()
    .trim()
    .min(10, 'Минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),
  userId: z.coerce
    .number({ invalid_type_error: 'Введите число' })
    .int('Только целое число')
    .positive('Должно быть больше 0'),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(2, 'Тег: минимум 2 символа')
        .max(20, 'Тег: максимум 20 символов')
    )
    .min(1, 'Добавьте хотя бы один тег')
    .max(5, 'Максимум 5 тегов'),
  status: z.enum(['draft', 'published'], {
    errorMap: () => ({ message: 'Выберите статус' }),
  }),
  publishDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат даты ГГГГ-ММ-ДД')
    .refine((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parseLocalDate(value).getTime() >= today.getTime();
    }, 'Дата не может быть в прошлом'),
});

export const defaultPostValues = {
  title: '',
  body: '',
  userId: 1,
  tags: [''],
  status: 'draft',
  publishDate: todayString(),
};

export function postToFormValues(post) {
  return {
    title: post.title ?? '',
    body: post.body ?? '',
    userId: post.userId ?? 1,
    tags: post.tags?.length ? post.tags : ['jsonplaceholder'],
    status: post.status ?? 'published',
    publishDate: post.publishDate ?? todayString(),
  };
}
