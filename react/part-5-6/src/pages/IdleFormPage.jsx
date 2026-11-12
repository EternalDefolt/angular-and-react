import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE_MS = 30000;

function IdleFormPage() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [idle, setIdle] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(IDLE_MS / 1000);
  const timerRef = useRef(null);
  const tickRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const restartTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    lastActivityRef.current = Date.now();
    setIdle(false);
    setSecondsLeft(IDLE_MS / 1000);
    timerRef.current = setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  useEffect(() => {
    restartTimer();

    tickRef.current = setInterval(() => {
      const passed = Date.now() - lastActivityRef.current;
      setSecondsLeft(Math.max(0, Math.ceil((IDLE_MS - passed) / 1000)));
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(tickRef.current);
    };
  }, [restartTimer]);

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Таймер неактивности</h2>
      {idle && (
        <div className="card" style={{ borderColor: 'var(--accent)' }}>
          <p style={{ marginTop: 0 }}>👋 Всё ещё с нами?</p>
          <button onClick={restartTimer}>Да, я тут</button>
        </div>
      )}
      <form
        className="form card"
        onSubmit={(e) => e.preventDefault()}
        onInput={restartTimer}
        onKeyDown={restartTimer}
        onFocus={restartTimer}
        onMouseMove={restartTimer}
      >
        <div className="field">
          <label htmlFor="i-email">Email</label>
          <input id="i-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="i-text">Комментарий</label>
          <textarea id="i-text" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {idle ? 'Подсказка показана' : `Подсказка появится через ${secondsLeft} сек. без активности`}
        </p>
      </form>
    </div>
  );
}

export default IdleFormPage;
