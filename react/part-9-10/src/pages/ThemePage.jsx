import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';

function Deep() {
  const { theme } = useTheme();
  return (
    <p>
      Компонент на глубине знает тему без пропсов: <b>{theme}</b>
    </p>
  );
}

function Middle() {
  return (
    <div className="card">
      <Deep />
    </div>
  );
}

function ThemePage() {
  return (
    <>
      <h2>Тема через Context</h2>
      <div className="card">
        <p>Тема сохраняется в localStorage и восстанавливается после перезагрузки.</p>
        <ThemeToggle />
      </div>
      <Middle />
    </>
  );
}

export default ThemePage;
