import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

function PreviousPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const prevCount = usePrevious(count);
  const prevText = usePrevious(text);

  const trend =
    prevCount === undefined || prevCount === count
      ? ''
      : count > prevCount
        ? '↑ выросло'
        : '↓ уменьшилось';

  return (
    <>
      <h2>Хук usePrevious</h2>
      <div className="card">
        <div className="row">
          <button onClick={() => setCount((c) => c - 1)}>−1</button>
          <button onClick={() => setCount((c) => c + 1)}>+1</button>
          <button onClick={() => setCount(0)}>Сброс</button>
        </div>
        <p>
          Сейчас: <b>{count}</b>, было: <b>{prevCount ?? '—'}</b> {trend}
        </p>
      </div>
      <div className="card">
        <input
          style={{ width: '100%' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введи текст"
        />
        <p>
          Сейчас: «{text}», было: «{prevText ?? ''}»
        </p>
      </div>
    </>
  );
}

export default PreviousPage;
