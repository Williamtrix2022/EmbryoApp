import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../application/context/auth.context';

interface Props {
  children: ReactNode;
}

// Rutas protegidas: redirige al login si no hay sesión activa
export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Rutas públicas: redirige al dashboard si ya hay sesión activa
export function PublicRoute({ children }: Props) {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
