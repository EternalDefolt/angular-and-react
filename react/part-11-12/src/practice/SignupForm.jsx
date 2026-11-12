import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas/formSchemas';
import FieldError from '../components/FieldError';

const TAKEN_EMAILS = ['admin@mail.ru', 'test@mail.ru', 'user@example.com'];

async function fakeRegister(data) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (TAKEN_EMAILS.includes(data.email.trim().toLowerCase())) {
    const error = new Error('Уже используется');
    error.field = 'email';
    throw error;
  }
  return { id: Date.now(), ...data };
}

function SignupForm() {
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });

  async function onSubmit(data) {
    try {
      const created = await fakeRegister(data);
      setUser(created);
      reset();
    } catch (err) {
      if (err.field) {
        setError(err.field, { type: 'server', message: err.message }, { shouldFocus: true });
      } else {
        setError('root.serverError', { type: 'server', message: err.message });
      }
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Регистрация с ошибкой сервера</h2>
      <form className="form card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label>Имя</label>
          <input {...register('name')} className={errors.name ? 'invalid' : ''} />
          <FieldError error={errors.name} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" {...register('email')} className={errors.email ? 'invalid' : ''} />
          <FieldError error={errors.email} />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input type="password" {...register('password')} className={errors.password ? 'invalid' : ''} />
          <FieldError error={errors.password} />
        </div>
        {errors.root?.serverError && <p className="error">{errors.root.serverError.message}</p>}
        <button type="submit" className="primary" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Проверяем...' : 'Зарегистрироваться'}
        </button>
        <p className="muted" style={{ margin: 0 }}>
          Заняты: {TAKEN_EMAILS.join(', ')}
        </p>
      </form>
      {user && <div className="success">✅ Зарегистрирован {user.name} ({user.email})</div>}
    </div>
  );
}

export default SignupForm;
