import { useState } from 'react';

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleStepChange(e) {
    const value = e.target.value.replace(/\D/g, '');
    setStep(value === '' ? '' : Number(value));
  }

  const safeStep = Number(step) || 0;

  return (
    <div>
      <h2>Счётчик с шагом</h2>
      <div className="card">
        <p style={{ fontSize: 48, margin: '0 0 16px', textAlign: 'center' }}>{count}</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="btn" onClick={() => setCount((prev) => prev - safeStep)} disabled={!safeStep}>
            −{safeStep}
          </button>
          <label className="row muted">
            шаг
            <input
              className="field"
              value={step}
              onChange={handleStepChange}
              style={{ width: 80, textAlign: 'center' }}
            />
          </label>
          <button className="btn" onClick={() => setCount((prev) => prev + safeStep)} disabled={!safeStep}>
            +{safeStep}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn btn--danger" onClick={() => setCount(0)}>
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepCounter;
