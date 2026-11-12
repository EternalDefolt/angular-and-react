import { useState } from 'react';
import { validateStep } from '../utils/validation';
import FieldError from '../components/FieldError';

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  street: '',
  house: '',
  zip: '',
  confirm: false,
};

const STEPS = ['Личные данные', 'Адрес', 'Подтверждение'];

function Input({ name, label, data, errors, showErrors, onChange }) {
  return (
    <div className="field">
      <label htmlFor={`w-${name}`}>{label}</label>
      <input
        id={`w-${name}`}
        name={name}
        value={data[name]}
        onChange={onChange}
        className={showErrors && errors[name] ? 'invalid' : ''}
      />
      <FieldError show={showErrors} message={errors[name]} />
    </div>
  );
}

function StepPersonal(props) {
  return (
    <>
      <Input {...props} name="firstName" label="Имя" />
      <Input {...props} name="lastName" label="Фамилия" />
      <Input {...props} name="email" label="Email" />
    </>
  );
}

function StepAddress(props) {
  return (
    <>
      <Input {...props} name="city" label="Город" />
      <Input {...props} name="street" label="Улица" />
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="grow">
          <Input {...props} name="house" label="Дом" />
        </div>
        <div className="grow">
          <Input {...props} name="zip" label="Индекс" />
        </div>
      </div>
    </>
  );
}

function StepConfirm({ data, errors, showErrors, onChange }) {
  return (
    <>
      <div>
        <p>
          <b>
            {data.firstName} {data.lastName}
          </b>
          <br />
          {data.email}
        </p>
        <p>
          {data.zip}, г. {data.city}, ул. {data.street}, д. {data.house}
        </p>
      </div>
      <label className="row">
        <input type="checkbox" name="confirm" checked={data.confirm} onChange={onChange} />
        Данные верны
      </label>
      <FieldError show={showErrors} message={errors.confirm} />
    </>
  );
}

function WizardPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [showErrors, setShowErrors] = useState(false);
  const [done, setDone] = useState(false);

  const errors = validateStep(step, data);
  const stepValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function next() {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => s + 1);
  }

  function back() {
    setShowErrors(false);
    setStep((s) => s - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (step < STEPS.length) {
      next();
      return;
    }
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setDone(true);
  }

  function restart() {
    setData(EMPTY);
    setStep(1);
    setShowErrors(false);
    setDone(false);
  }

  if (done) {
    return (
      <div style={{ maxWidth: 500 }}>
        <h2>Многошаговая форма</h2>
        <div className="success">
          <p>✅ Заявка отправлена, {data.firstName}!</p>
          <button onClick={restart}>Заполнить заново</button>
        </div>
      </div>
    );
  }

  const stepProps = { data, errors, showErrors, onChange: handleChange };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Многошаговая форма</h2>
      <div className="row" style={{ marginBottom: 12 }}>
        {STEPS.map((title, i) => (
          <span
            key={title}
            className={i + 1 === step ? '' : 'muted'}
            style={{ fontWeight: i + 1 === step ? 'bold' : 'normal' }}
          >
            {i + 1}. {title}
            {i < STEPS.length - 1 && ' →'}
          </span>
        ))}
      </div>
      <form className="form card" onSubmit={handleSubmit} noValidate>
        {step === 1 && <StepPersonal {...stepProps} />}
        {step === 2 && <StepAddress {...stepProps} />}
        {step === 3 && <StepConfirm {...stepProps} />}
        <div className="row">
          <button type="button" onClick={back} disabled={step === 1}>
            ← Назад
          </button>
          <span className="grow" />
          <button type="submit" className="primary">
            {step < STEPS.length ? 'Далее →' : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WizardPage;
