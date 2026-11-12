import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/formSchemas';
import FieldError from '../components/FieldError';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function UserForm() {
  const [created, setCreated] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      age: '',
      role: 'viewer',
      password: '',
      confirmPassword: '',
      bio: '',
    },
  });

  async function handleFormSubmit(data) {
    await wait(800);
    setCreated(data);
    reset();
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Создание пользователя</h2>
      <form className="form card" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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
          <label>Возраст</label>
          <input type="number" {...register('age')} className={errors.age ? 'invalid' : ''} />
          <FieldError error={errors.age} />
        </div>

        <div className="field">
          <label>Роль</label>
          <select {...register('role')}>
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="field">
          <label>Пароль</label>
          <input type="password" {...register('password')} className={errors.password ? 'invalid' : ''} />
          <FieldError error={errors.password} />
        </div>

        <div className="field">
          <label>Повтор пароля</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'invalid' : ''}
          />
          <FieldError error={errors.confirmPassword} />
        </div>

        <div className="field">
          <label>О себе</label>
          <textarea {...register('bio')} rows={3} className={errors.bio ? 'invalid' : ''} />
          <FieldError error={errors.bio} />
        </div>

        <button type="submit" className="primary" disabled={!isValid || isSubmitting || !isDirty}>
          {isSubmitting ? 'Отправка...' : 'Создать'}
        </button>
      </form>

      {created && (
        <div className="success">
          ✅ Создан пользователь {created.name} ({created.email}), роль {created.role}, возраст{' '}
          {created.age} (тип: {typeof created.age})
        </div>
      )}
    </div>
  );
}

export default UserForm;
