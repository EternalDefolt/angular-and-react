import { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('auth:v1', null);

  const login = useCallback(
    (name) => {
      setUser({ name, loggedAt: new Date().toISOString() });
    },
    [setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
