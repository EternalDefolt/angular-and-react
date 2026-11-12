import { useState } from 'react';
import { COUNTRIES, validateLocation } from '../utils/validation';
import FieldError from '../components/FieldError';

const EMPTY = { country: '', city: '', zip: '' };

function LocationPage() {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [saved, setSaved] = useState(null);

  const errors = validateLocation(form);
  const isValid = Object.keys(errors).length === 0;
  const rules = COUNTRIES[form.country];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ country: true, city: true, zip: true });
    if (!isValid) return;
    setSaved(form);
    setForm(EMPTY);
    setTouched({});
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Форма с зависимыми полями</h2>
      <form className="form card" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="country">Страна</label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.country && errors.country ? 'invalid' : ''}
          >
            <option value="">Выберите страну</option>
            {Object.entries(COUNTRIES).map(([code, c]) => (
              <option key={code} value={code}>
                {c.label}
              </option>
            ))}
          </select>
          <FieldError show={touched.country} message={errors.country} />
        </div>

        <div className="field">
          <label htmlFor="city">Город</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!rules}
            placeholder={rules ? rules.cityHint : 'Сначала выберите страну'}
            className={touched.city && errors.city ? 'invalid' : ''}
          />
          <FieldError show={touched.city && rules} message={errors.city} />
        </div>

        <div className="field">
          <label htmlFor="zip">Индекс</label>
          <input
            id="zip"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!rules}
            placeholder={rules ? rules.zipHint : ''}
            className={touched.zip && errors.zip ? 'invalid' : ''}
          />
          <FieldError show={touched.zip && rules} message={errors.zip} />
        </div>

        <button type="submit" className="primary" disabled={!isValid}>
          Сохранить
        </button>
      </form>

      {saved && (
        <div className="success">
          ✅ {COUNTRIES[saved.country].label}, {saved.city}, {saved.zip}
        </div>
      )}
    </div>
  );
}

export default LocationPage;
