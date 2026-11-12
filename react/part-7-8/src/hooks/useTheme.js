import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const THEME_KEY = 'theme-v1';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return { theme, toggleTheme };
}
