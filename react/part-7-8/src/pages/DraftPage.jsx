import { useEffect, useState } from 'react';

export const DRAFT_KEY = 'draft-v1';

function readDraft() {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : { text: '', savedAt: null };
  } catch {
    return { text: '', savedAt: null };
  }
}

function DraftPage() {
  const [initial] = useState(readDraft);
  const [text, setText] = useState(initial.text);
  const [savedAt, setSavedAt] = useState(initial.savedAt);
  const [savedText, setSavedText] = useState(initial.text);

  useEffect(() => {
    if (text === savedText) return;

    const timer = setTimeout(() => {
      const now = new Date().toISOString();
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ text, savedAt: now }));
        setSavedText(text);
        setSavedAt(now);
      } catch (err) {
        console.warn('Не удалось сохранить черновик', err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [text, savedText]);

  const status =
    text !== savedText
      ? 'Сохранение...'
      : savedAt
        ? `Сохранено в ${new Date(savedAt).toLocaleTimeString('ru-RU')}`
        : 'Черновик пуст';

  return (
    <div>
      <h2>Черновик заметки</h2>
      <div className="card">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Пиши, текст сохранится сам через 500 мс после паузы"
          rows={10}
          style={{
            width: '100%',
            font: 'inherit',
            color: 'var(--text)',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: 10,
            resize: 'vertical',
          }}
        />
        <div className="row" style={{ marginTop: 8 }}>
          <span className="muted grow">{status}</span>
          <span className="muted">{text.length} симв.</span>
        </div>
      </div>
    </div>
  );
}

export default DraftPage;
