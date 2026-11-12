import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '../schemas/formSchemas';
import FieldError from '../components/FieldError';

const EMPTY_ITEM = { name: '', quantity: 1, price: '' };

function OrderTotal({ control }) {
  const items = useWatch({ control, name: 'items' }) ?? [];
  const total = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0
  );
  return <b>Итого: {total.toLocaleString('ru-RU')} ₽</b>;
}

function OrderForm() {
  const [order, setOrder] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: 'onChange',
    defaultValues: { customer: '', items: [EMPTY_ITEM] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  function onSubmit(data) {
    setOrder(data);
    reset({ customer: '', items: [EMPTY_ITEM] });
  }

  const itemsError = errors.items?.root ?? (errors.items?.message ? errors.items : null);

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Форма заказа</h2>
      <form className="form card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label>Заказчик</label>
          <input {...register('customer')} className={errors.customer ? 'invalid' : ''} />
          <FieldError error={errors.customer} />
        </div>

        <div>
          <label>Товары</label>
          {fields.map((field, index) => (
            <div key={field.id} className="row" style={{ alignItems: 'flex-start', marginTop: 8 }}>
              <div className="grow">
                <input
                  placeholder="Название"
                  style={{ width: '100%' }}
                  {...register(`items.${index}.name`)}
                  className={errors.items?.[index]?.name ? 'invalid' : ''}
                />
                <FieldError error={errors.items?.[index]?.name} />
              </div>
              <div style={{ width: 90 }}>
                <input
                  type="number"
                  placeholder="Кол-во"
                  style={{ width: '100%' }}
                  {...register(`items.${index}.quantity`)}
                  className={errors.items?.[index]?.quantity ? 'invalid' : ''}
                />
                <FieldError error={errors.items?.[index]?.quantity} />
              </div>
              <div style={{ width: 110 }}>
                <input
                  type="number"
                  placeholder="Цена"
                  style={{ width: '100%' }}
                  {...register(`items.${index}.price`)}
                  className={errors.items?.[index]?.price ? 'invalid' : ''}
                />
                <FieldError error={errors.items?.[index]?.price} />
              </div>
              <button type="button" onClick={() => remove(index)}>
                ✕
              </button>
            </div>
          ))}
          <FieldError error={itemsError} />
          <button type="button" style={{ marginTop: 8 }} onClick={() => append(EMPTY_ITEM)}>
            + Добавить товар
          </button>
        </div>

        <div className="row">
          <span className="grow">
            <OrderTotal control={control} />
          </span>
          <button type="submit" className="primary" disabled={!isValid || isSubmitting}>
            Оформить
          </button>
        </div>
      </form>

      {order && (
        <div className="success">
          ✅ Заказ для {order.customer}:{' '}
          {order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}
        </div>
      )}
    </div>
  );
}

export default OrderForm;
