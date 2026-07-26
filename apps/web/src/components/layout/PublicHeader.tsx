import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { ButtonLink } from '../ui/Button';

const navigation = [
  { label: 'Beranda', to: '/' },
  { label: 'Koleksi', to: '/products' },
  { label: 'Panduan', to: '/products?view=care' },
  { label: 'Pesanan', to: '/profile/orders' },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-cream-50/85 backdrop-blur-xl">
      <div className="container-shell flex h-18 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-1 sm:flex">
          <NavLink to="/products" className="icon-button" aria-label="Cari produk">
            <Search size={19} />
          </NavLink>
          <NavLink to="/cart" className="icon-button relative" aria-label="Keranjang, kosong">
            <ShoppingBag size={19} />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold-500 ring-2 ring-cream-50" />
          </NavLink>
          <NavLink to="/login" className="icon-button" aria-label="Akun">
            <UserRound size={19} />
          </NavLink>
          <ButtonLink to="/login" size="sm" className="ml-2">
            Masuk
          </ButtonLink>
        </div>
        <button
          type="button"
          className="icon-button sm:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-navigation" className="border-t border-sage-200 bg-white p-4 sm:hidden">
          <div className="container-shell grid gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-sage-100"
              >
                {item.label}
              </NavLink>
            ))}
            <ButtonLink to="/login" className="mt-2" size="lg">
              Masuk ke GreenCart
            </ButtonLink>
          </div>
        </nav>
      )}
    </header>
  );
}
