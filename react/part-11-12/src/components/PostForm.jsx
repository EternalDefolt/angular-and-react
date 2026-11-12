import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultPostValues, postSchema } from '../schemas/postSchema';
import FieldError from './FieldError';

function PostForm({ initialData, onSubmit, submitLabel = 'Сохранить', onCancel }) {
  const isEdit = Boolean(initialData);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: initialData ?? defaultPostValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

  async function handleFormSubmit(data) {
    try {
      await onSubmit(data);
    } catch (err) {
      if (err?.field) {
        setError(err.field, { type: 'server', message: err.message }, { shouldFocus: true });
      } else {
        setError('root.serverError', { type: 'server', message: err?.message || 'Ошибка сервера' });
      }
    }
  }

  const tagsError = errors.tags?.root ?? (errors.tags?.message ? errors.tags : null);
  const disabled = !isValid || isSubmitting || (isEdit && !isDirty);

  return (
    <form className="form card" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div className="field">
        <label htmlFor="title">Заголовок</label>
        <input id="title" {...register('title')} className={errors.title ? 'invalid' : ''} />
        <FieldError error={errors.title} />
      </div>

      <div className="field">
        <label htmlFor="body">Текст</label>
        <textarea id="body" rows={5} {...register('body')} className={errors.body ? 'invalid' : ''} />
        <FieldError error={errors.body} />
      </div>

      <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="field grow">
          <label htmlFor="userId">ID автора</label>
          <input
            id="userId"
            type="number"
            {...register('userId')}
            className={errors.userId ? 'invalid' : ''}
          />
          <FieldError error={errors.userId} />
        </div>

        <div className="field grow">
          <label htmlFor="status">Статус</label>
          <select id="status" {...register('status')} className={errors.status ? 'invalid' : ''}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликован</option>
          </select>
          <FieldError error={errors.status} />
        </div>

        <div className="field grow">
          <label htmlFor="publishDate">Дата публикации</label>
          <input
            id="publishDate"
            type="date"
            {...register('publishDate')}
            className={errors.publishDate ? 'invalid' : ''}
          />
          <FieldError error={errors.publishDate} />
        </div>
      </div>

      <div className="field">
        <label>Теги ({fields.length} из 5)</label>
        {fields.map((field, index) => (
          <div key={field.id} style={{ marginBottom: 6 }}>
            <div className="row">
              <input
                {...register(`tags.${index}`)}
                placeholder={`Тег ${index + 1}`}
                className={errors.tags?.[index] ? 'invalid grow' : 'grow'}
              />
              <button type="button" onClick={() => remove(index)}>
                Удалить тег
              </button>
            </div>
            <FieldError error={errors.tags?.[index]} />
          </div>
        ))}
        <button type="button" onClick={() => append('')} disabled={fields.length >= 5}>
          + Добавить тег
        </button>
        <FieldError error={tagsError} />
      </div>

      {errors.root?.serverError && <p className="error">{errors.root.serverError.message}</p>}

      <div className="row">
        <button type="submit" className="primary grow" disabled={disabled}>
          {isSubmitting ? 'Сохранение...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
      <p className="muted" style={{ margin: 0 }}>
        Проверка ошибки сервера: заголовок со словом «спам» сервер отклонит, ошибка появится под полем.
      </p>
    </form>
  );
}

export default PostForm;
