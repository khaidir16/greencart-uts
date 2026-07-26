import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../features/auth/auth.store';
import { ApiError } from '../services/api';

const loginFormSchema = z.object({
  identity: z.string().trim().min(1, 'Email atau username wajib diisi.'),
  password: z.string().min(1, 'Password wajib diisi.'),
});
type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginFormSchema) });

  async function submit(values: LoginForm) {
    setServerError('');
    try {
      const user = await login(values.identity, values.password);
      const requested = (location.state as { from?: string } | null)?.from;
      navigate(requested ?? (user.role === 'ADMIN' ? '/admin' : '/products'), { replace: true });
    } catch (error) {
      setServerError(error instanceof ApiError ? error.message : 'Tidak dapat terhubung ke server.');
    }
  }

  return (
    <section className="container-shell grid min-h-[calc(100vh-4.5rem)] items-stretch py-8 lg:grid-cols-2 lg:py-12">
      <div className="relative hidden overflow-hidden rounded-l-[2rem] bg-forest-950 p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="hero-grid absolute inset-0 opacity-25" /><div className="relative"><p className="section-kicker !text-leaf-400">Welcome back</p><h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-tight">Ruang hijau pilihanmu menunggu.</h1></div><div className="relative rounded-3xl border border-white/10 bg-white/7 p-6 backdrop-blur"><ShieldCheck className="text-leaf-400" /><p className="mt-4 text-sm leading-7 text-white/65">Autentikasi dilindungi hash bcrypt, JWT berumur terbatas, dan otorisasi role pada REST API.</p></div></div>
      <div className="flex items-center rounded-[2rem] border border-sage-200 bg-white p-7 shadow-panel lg:rounded-l-none sm:p-12">
        <form className="mx-auto w-full max-w-md" onSubmit={handleSubmit(submit)} noValidate>
          <p className="section-kicker">Masuk ke akun</p><h1 className="font-display text-4xl font-semibold text-forest-950">Selamat datang kembali.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Gunakan akun GreenCart untuk melanjutkan belanja atau membuka dashboard.</p>
          {serverError && <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>}
          <div className="mt-8 grid gap-5">
            <label className="field-label">Email atau username<div className="field-shell"><Mail size={18} /><input data-testid="login-identity" type="text" placeholder="nama@contoh.com" autoComplete="username" {...register('identity')} /></div>{errors.identity && <span className="field-error">{errors.identity.message}</span>}</label>
            <label className="field-label">Password<div className="field-shell"><LockKeyhole size={18} /><input data-testid="login-password" type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" autoComplete="current-password" {...register('password')} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.password && <span className="field-error">{errors.password.message}</span>}</label>
            <div className="rounded-xl bg-sage-50 px-4 py-3 text-xs leading-5 text-slate-600"><strong>Demo:</strong> admin / Admin123! atau customer / Customer123!</div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? 'Memverifikasi...' : 'Masuk'} {!loading && <ArrowRight size={17} />}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
