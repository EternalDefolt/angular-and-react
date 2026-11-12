import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Некорректный email'),
    age: z.coerce
      .number({ invalid_type_error: 'Введите число' })
      .int('Только целое число')
      .min(18, 'Только с 18 лет'),
    role: z.enum(['admin', 'editor', 'viewer']),
    password: z.string().min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    bio: z.string().max(500, 'Максимум 500 символов').optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

export const orderSchema = z.object({
  customer: z.string().min(2, 'Укажите имя заказчика'),
  items: z
    .array(
      z.object({
        name: z.string().min(1, 'Название обязательно'),
        quantity: z.coerce
          .number({ invalid_type_error: 'Число' })
          .int('Целое число')
          .positive('Количество > 0'),
        price: z.coerce.number({ invalid_type_error: 'Число' }).positive('Цена > 0'),
      })
    )
    .min(1, 'Добавьте хотя бы один товар'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
});
