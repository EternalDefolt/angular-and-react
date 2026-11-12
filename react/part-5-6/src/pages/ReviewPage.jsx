import { useState } from 'react';
import { validateReview } from '../utils/validation';
import FieldError from '../components/FieldError';

const EMPTY = { name: '', rating: 0, text: '' };

function ReviewPage() {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);

  const errors = validateReview(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function setRating(value) {
    setForm((prev) => ({ ...prev, rating: value }));
    setTouched((prev) => ({ ...prev, rating: true }));
  }

  function reset() {
    setForm(EMPTY);
    setTouched({});
    setHover(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, rating: true, text: true });
    if (!isValid) return;

    setReviews((prev) => [{ ...form, id: crypto.randomUUID() }, ...prev]);
    reset();
  }

  const shown = hover || form.rating;

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Форма отзыва</h2>
      <form className="form card" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="r-name">Имя</label>
          <input
            id="r-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'invalid' : ''}
          />
          <FieldError show={touched.name} message={errors.name} />
        </div>

        <div className="field">
          <label>Оценка</label>
          <div className="stars" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                aria-label={`${n} из 5`}
              >
                {n <= shown ? '★' : '☆'}
              </button>
            ))}
            <span className="muted"> {form.rating ? `${form.rating} / 5` : ''}</span>
          </div>
          <FieldError show={touched.rating} message={errors.rating} />
        </div>

        <div className="field">
          <label htmlFor="r-text">Текст отзыва</label>
          <textarea
            id="r-text"
            name="text"
            rows={4}
            value={form.text}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.text && errors.text ? 'invalid' : ''}
          />
          <FieldError show={touched.text} message={errors.text} />
        </div>

        <div className="row">
          <button type="submit" className="primary grow" disabled={!isValid}>
            Отправить
          </button>
          <button type="button" onClick={reset}>
            Сбросить
          </button>
        </div>
      </form>

      {reviews.map((r) => (
        <div className="card" key={r.id}>
          <b>{r.name}</b> <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
          <p style={{ marginBottom: 0 }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewPage;
