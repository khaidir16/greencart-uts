import { AtSign, Leaf, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../brand/Logo';

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-forest-950 text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            Tanaman pilihan, perlengkapan berkualitas, dan pengalaman belanja yang dirancang untuk
            membuat setiap ruang terasa lebih hidup.
          </p>
        </div>
        <div>
          <p className="footer-title">Jelajahi</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link to="/products" className="footer-link">Koleksi tanaman</Link>
            <Link to="/products?category=tools" className="footer-link">Alat berkebun</Link>
            <Link to="/profile/orders" className="footer-link">Lacak pesanan</Link>
            <Link to="/admin" className="footer-link">Dashboard admin</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Terhubung</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <span className="flex items-center gap-2"><Mail size={16} /> hello@greencart.test</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Makassar, Indonesia</span>
            <span className="flex items-center gap-2"><AtSign size={16} /> greencart.id</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GreenCart. Proyek Advanced Software Testing.</span>
          <span className="inline-flex items-center gap-1.5"><Leaf size={13} /> Dirancang dengan penuh perhatian.</span>
        </div>
      </div>
    </footer>
  );
}
