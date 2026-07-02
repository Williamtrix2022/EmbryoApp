/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { AuthUser } from '../../domain/types/auth.types';
import { loginApi, logoutApi } from '../../infrastructure/api/auth.api';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('embryo_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Limpiar estado si el token no existe pero el usuario sí
    const token = localStorage.getItem('embryo_token');
    if (!token) {
      setUser(null);
      localStorage.removeItem('embryo_user');
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginApi({ email, password });
    localStorage.setItem('embryo_token', result.token);
    localStorage.setItem('embryo_user', JSON.stringify(result.user));
    setUser(result.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Si falla la red durante logout, se limpia igual el estado local
    } finally {
      localStorage.removeItem('embryo_token');
      localStorage.removeItem('embryo_user');
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  return ctx;
}
