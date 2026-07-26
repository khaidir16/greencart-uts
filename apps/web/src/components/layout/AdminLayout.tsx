import { BarChart3, Boxes, ChevronLeft, ClipboardList, Leaf, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from '../brand/Logo';

const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: BarChart3, end: true },
  { label: 'Produk', to: '/admin/products', icon: Boxes, end: false },
  { label: 'Pesanan', to: '/admin/orders', icon: ClipboardList, end: false },
];

export function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sage-50 lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className={`admin-sidebar ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex h-18 items-center justify-between border-b border-white/10 px-5">
          <Logo />
          <button className="icon-button-dark lg:hidden" onClick={() => setOpen(false)} aria-label="Tutup sidebar">
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="px-4 py-6">
          <p className="px-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/35">Workspace</p>
          <nav className="mt-3 grid gap-1" aria-label="Navigasi admin">
            {adminNav.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'admin-nav-link-active' : ''}`}
              >
                <Icon size={18} /> {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/7 p-3">
            <span className="grid size-10 place-items-center rounded-xl bg-leaf-500 text-forest-950"><Leaf size={18} /></span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Admin GreenCart</p>
              <p className="truncate text-xs text-white/45">admin@greencart.test</p>
            </div>
          </div>
          <NavLink to="/" className="admin-nav-link"><LogOut size={18} /> Kembali ke toko</NavLink>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-40 bg-forest-950/55 lg:hidden" onClick={() => setOpen(false)} aria-label="Tutup sidebar" />}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-sage-200 bg-white/85 px-4 backdrop-blur-xl sm:px-7">
          <button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label="Buka sidebar"><Menu size={20} /></button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-right sm:block"><span className="block text-xs font-semibold text-forest-950">Administrator</span><span className="block text-[0.68rem] text-slate-500">Online</span></span>
            <span className="grid size-10 place-items-center rounded-full bg-forest-900 text-sm font-bold text-white">AG</span>
          </div>
        </header>
        <main className="p-4 sm:p-7 lg:p-9"><Outlet /></main>
      </div>
    </div>
  );
}
