import { ArrowRight, Eye, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  return (
    <section className="container-shell grid min-h-[calc(100vh-4.5rem)] items-stretch py-8 lg:grid-cols-2 lg:py-12">
      <div className="relative hidden overflow-hidden rounded-l-[2rem] bg-forest-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="hero-grid absolute inset-0 opacity-25" />
        <div className="relative"><p className="section-kicker !text-leaf-400">Welcome back</p><h1 className="mt-4 max-w-md font-display text-5xl font-semibold leading-tight">Ruang hijau pilihanmu menunggu.</h1></div>
        <div className="relative rounded-3xl border border-white/10 bg-white/7 p-6 backdrop-blur"><ShieldCheck className="text-leaf-400" /><p className="mt-4 text-sm leading-7 text-white/65">Autentikasi dan otorisasi akan dilindungi di frontend serta REST API.</p></div>
      </div>
      <div className="flex items-center rounded-[2rem] border border-sage-200 bg-white p-7 shadow-panel lg:rounded-l-none sm:p-12">
        <form className="mx-auto w-full max-w-md" onSubmit={(event) => event.preventDefault()} noValidate>
          <p className="section-kicker">Masuk ke akun</p><h1 className="font-display text-4xl font-semibold text-forest-950">Selamat datang kembali.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Form aktif akan diterapkan saat tahap autentikasi dan TDD.</p>
          <div className="mt-8 grid gap-5">
            <label className="field-label">Email atau username<div className="field-shell"><Mail size={18} /><input data-testid="login-identity" type="text" placeholder="nama@contoh.com" /></div></label>
            <label className="field-label">Password<div className="field-shell"><LockKeyhole size={18} /><input data-testid="login-password" type="password" placeholder="Masukkan password" /><button type="button" aria-label="Tampilkan password"><Eye size={18} /></button></div></label>
            <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="accent-forest-800" /> Ingat saya</label><span className="text-forest-800">Akun demo tersedia nanti</span></div>
            <Button type="submit" size="lg" className="w-full">Masuk <ArrowRight size={17} /></Button>
          </div>
          <p className="mt-7 text-center text-xs text-slate-500">Kembali menjelajah? <Link to="/products" className="font-semibold text-forest-800 hover:underline">Lihat koleksi</Link></p>
        </form>
      </div>
    </section>
  );
}
