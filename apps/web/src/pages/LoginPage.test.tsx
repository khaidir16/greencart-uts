import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { RequireAuth } from '../components/auth/RequireAuth';
import { useAuthStore } from '../features/auth/auth.store';

const adminSession = {
  token: 'valid-jwt',
  user: { id: 'usr-1', email: 'admin@greencart.test', username: 'admin', name: 'GreenCart Admin', role: 'ADMIN' as const },
};

describe('GreenCart frontend authentication', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ token: null, user: null, loading: false });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('menolak form login kosong di sisi klien', async () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(await screen.findByText('Email atau username wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Password wajib diisi.')).toBeInTheDocument();
  });

  it('menyimpan sesi dan mengarahkan admin ke dashboard setelah login berhasil', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ data: adminSession }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<h1>Dashboard Admin</h1>} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByTestId('login-identity'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'Admin123!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(await screen.findByRole('heading', { name: 'Dashboard Admin' })).toBeInTheDocument();
    expect(useAuthStore.getState().user?.role).toBe('ADMIN');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('mengarahkan pengunjung tanpa sesi ke login dan mempertahankan tujuan awal', async () => {
    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Routes>
          <Route path="checkout" element={<RequireAuth><h1>Checkout</h1></RequireAuth>} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Selamat datang kembali.' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Checkout' })).not.toBeInTheDocument();
  });

  it('menolak customer yang mencoba membuka area admin', async () => {
    useAuthStore.setState({
      token: 'customer-jwt',
      user: { id: 'usr-2', email: 'customer@greencart.test', username: 'customer', name: 'Customer', role: 'CUSTOMER' },
    });
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="admin" element={<RequireAuth role="ADMIN"><h1>Admin</h1></RequireAuth>} />
          <Route path="403" element={<h1>Akses ditolak</h1>} />
        </Routes>
      </MemoryRouter>,
    );
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Akses ditolak' })).toBeInTheDocument());
  });
});
