import { useState } from 'react';

const THEMES = {
  light: { background: '#ffffff', color: '#1e293b', border: '#e5e7eb', label: 'Светлая' },
  dark: { background: '#0f172a', color: '#f1f5f9', border: '#334155', label: 'Тёмная' },
};

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const current = THEMES[theme];

  return (
    <div>
      <h2>Переключатель темы</h2>
      <div
        style={{
          background: current.background,
          color: current.color,
          border: `1px solid ${current.border}`,
          borderRadius: 12,
          padding: 24,
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        <p style={{ marginTop: 0 }}>
          Сейчас тема: <b>{current.label}</b>
        </p>
        <p>Фон и цвет текста этого блока зависят от состояния theme.</p>
        <button
          onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: `1px solid ${current.border}`,
            background: current.color,
            color: current.background,
            cursor: 'pointer',
          }}
        >
          {theme === 'light' ? '🌙 Включить тёмную' : '☀️ Включить светлую'}
        </button>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
