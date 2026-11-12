import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, defaultTaskValues, type TaskFormValues } from '../schemas/taskSchema';

interface TaskFormProps {
  onSubmit: (data: TaskFormValues) => Promise<unknown>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: defaultTaskValues,
  });

  async function handleFormSubmit(data: TaskFormValues) {
    await onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="card"
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div>
        <input {...register('title')} placeholder="Заголовок" style={{ width: '100%' }} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <textarea {...register('body')} placeholder="Описание" rows={3} style={{ width: '100%' }} />
        {errors.body && <p className="error">{errors.body.message}</p>}
      </div>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div>
          <input type="number" {...register('userId')} placeholder="Автор (userId)" />
          {errors.userId && <p className="error">{errors.userId.message}</p>}
        </div>

        <select {...register('priority')}>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
}
