import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const COUNTER_KEY = 'counter-v1';

function CounterPage() {
  const [count, setCount] = useLocalStorage(COUNTER_KEY, 0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Счётчик с сохранением</h2>
      <div className="card">
        <p style={{ fontSize: 40, margin: '8px 0' }}>{count}</p>
        <div className="row">
          <button onClick={() => setCount((c) => c - step)}>−{step}</button>
          <button onClick={() => setCount((c) => c + step)}>+{step}</button>
          <button onClick={() => setCount(0)}>Сброс</button>
          <label className="row muted">
            шаг
            <input
              type="number"
              min="1"
              value={step}
              onChange={(e) => setStep(Math.max(1, Number(e.target.value) || 1))}
              style={{ width: 70 }}
            />
          </label>
        </div>
        <p className="muted">
          Значение счётчика хранится в localStorage, шаг живёт только в useState.
          Обнови страницу: счётчик останется, шаг вернётся к 1.
        </p>
      </div>
    </div>
  );
}

export default CounterPage;
