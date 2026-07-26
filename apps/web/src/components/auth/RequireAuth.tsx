import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/auth.store';

export function RequireAuth({ children, role }: { children: ReactNode; role?: 'CUSTOMER' | 'ADMIN' }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role) return <Navigate to="/403" replace />;
  return children;
}
