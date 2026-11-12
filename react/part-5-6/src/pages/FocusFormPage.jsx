import { useRef, useState } from 'react';
import { validateContact } from '../utils/validation';
import FieldError from '../components/FieldError';

const EMPTY = { name: '', email: '', phone: '', message: '' };
const ORDER = ['name', 'email', 'phone', 'message'];
const LABELS = { name: 'Имя', email: 'Email', phone: 'Телефон', message: 'Сообщение' };

function FocusFormPage() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const refs = useRef({});

  const errors = validateContact(form);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const firstInvalid = ORDER.find((key) => errors[key]);
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus();
      return;
    }

    setSent(true);
    setSubmitted(false);
    setForm(EMPTY);
    refs.current.name?.focus();
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Фокус на первое невалидное поле</h2>
      <form className="form card" onSubmit={handleSubmit} noValidate>
        {ORDER.map((key) => {
          const Tag = key === 'message' ? 'textarea' : 'input';
          return (
            <div className="field" key={key}>
              <label htmlFor={`c-${key}`}>{LABELS[key]}</label>
              <Tag
                id={`c-${key}`}
                name={key}
                ref={(el) => {
                  refs.current[key] = el;
                }}
                rows={key === 'message' ? 3 : undefined}
                value={form[key]}
                onChange={handleChange}
                className={submitted && errors[key] ? 'invalid' : ''}
              />
              <FieldError show={submitted} message={errors[key]} />
            </div>
          );
        })}
        <button type="submit" className="primary">
          Отправить
        </button>
      </form>
      {sent && <div className="success">✅ Сообщение отправлено</div>}
      <p className="muted">
        Кнопка всегда активна. Нажми «Отправить» с пустыми или кривыми полями: фокус
        перейдёт на первое поле с ошибкой через ref.
      </p>
    </div>
  );
}

export default FocusFormPage;
