import { useRef, useState } from 'react';
import { validateForm } from '../utils/validation';
import FieldError from './FieldError';

const EMPTY = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  agree: false,
};

function RegistrationForm({ onSuccess }) {
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef(null);

  const errors = validateForm(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const allTouched = Object.keys(form).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    onSuccess?.(form);

    setForm(EMPTY);
    setTouched({});
    setShowPassword(false);
    nameRef.current?.focus();
  }

  const cls = (field) => (touched[field] && errors[field] ? 'invalid' : '');

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="field">
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          name="name"
          ref={nameRef}
          autoFocus
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cls('name')}
        />
        <FieldError show={touched.name} message={errors.name} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cls('email')}
        />
        <FieldError show={touched.email} message={errors.email} />
      </div>

      <div className="field">
        <label htmlFor="password">Пароль</label>
        <div className="row">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls('password')}
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <FieldError show={touched.password} message={errors.password} />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Повтор пароля</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cls('confirmPassword')}
        />
        <FieldError show={touched.confirmPassword} message={errors.confirmPassword} />
      </div>

      <div className="field">
        <label htmlFor="age">Возраст</label>
        <input
          id="age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cls('age')}
        />
        <FieldError show={touched.age} message={errors.age} />
      </div>

      <div>
        <label className="row">
          <input
            name="agree"
            type="checkbox"
            checked={form.agree}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Согласен с условиями
        </label>
        <FieldError show={touched.agree} message={errors.agree} />
      </div>

      <button type="submit" className="primary" disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
  );
}

export default RegistrationForm;
