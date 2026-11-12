import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/formSchemas';
import FieldError from '../components/FieldError';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function LoginForm() {
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data) {
    await wait(600);
    setUser(data.email);
  }

  if (user) {
    return (
      <div style={{ maxWidth: 400 }}>
        <h2>Вход</h2>
        <div className="success">
          <p style={{ marginTop: 0 }}>✅ Вы вошли как {user}</p>
          <button onClick={() => setUser(null)}>Выйти</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Вход</h2>
      <form className="form card" onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <button type="submit" className="primary" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
