import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '../../services/api';

export type SessionUser = { id: string; email: string; username: string; name: string; role: 'CUSTOMER' | 'ADMIN' };

type AuthState = {
  token: string | null;
  user: SessionUser | null;
  loading: boolean;
  login: (identity: string, password: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      async login(identity, password) {
        set({ loading: true });
        try {
          const session = await apiRequest<{ token: string; user: SessionUser }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ identity, password }),
          });
          set({ token: session.token, user: session.user, loading: false });
          return session.user;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },
      async logout() {
        const token = get().token;
        try {
          if (token) await apiRequest('/auth/logout', { method: 'POST' }, token);
        } finally {
          set({ token: null, user: null, loading: false });
        }
      },
    }),
    { name: 'greencart-session', partialize: ({ token, user }) => ({ token, user }) },
  ),
);
