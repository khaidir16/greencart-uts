import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { RequireAuth } from './components/auth/RequireAuth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="products"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Katalog botani"
              title="Temukan tanaman yang cocok dengan ruangmu"
              description="Pencarian, filter, pengurutan, tampilan grid, dan katalog interaktif akan hadir di tahap katalog."
            /></RequireAuth>
          }
        />
        <Route
          path="products/:slug"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Detail produk"
              title="Kenali setiap tanaman sebelum membawanya pulang"
              description="Galeri, informasi perawatan, stok, harga, kuantitas, dan rekomendasi produk akan tersedia di sini."
            /></RequireAuth>
          }
        />
        <Route
          path="cart"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Keranjang"
              title="Pilihan hijaumu, tersusun rapi"
              description="Kontrol kuantitas, validasi stok, subtotal, penghapusan item, dan ringkasan belanja akan dibangun pada tahap fitur keranjang."
            /></RequireAuth>
          }
        />
        <Route
          path="checkout"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Checkout bertahap"
              title="Satu langkah lagi menuju ruang yang lebih hidup"
              description="Data penerima, alamat, tinjauan pesanan, validasi, dan konfirmasi akan menggunakan stepper yang jelas."
            /></RequireAuth>
          }
        />
        <Route
          path="profile/orders"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Riwayat pesanan"
              title="Pantau perjalanan tanamanmu"
              description="Daftar pesanan dan status terkini akan ditampilkan dengan pencarian serta filter status."
            /></RequireAuth>
          }
        />
        <Route
          path="orders/:orderNumber"
          element={
            <RequireAuth><PlaceholderPage
              eyebrow="Detail pesanan"
              title="Status pesanan dalam satu timeline"
              description="Timeline DRAFT, CONFIRMED, COMPLETED, atau CANCELLED akan memperjelas state transition aplikasi."
            /></RequireAuth>
          }
        />
      </Route>

      <Route path="admin" element={<RequireAuth role="ADMIN"><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboardPlaceholder />} />
        <Route
          path="products"
          element={<AdminSectionPlaceholder title="Manajemen Produk" subtitle="CRUD produk" />}
        />
        <Route
          path="products/new"
          element={<AdminSectionPlaceholder title="Tambah Produk" subtitle="Form produk" />}
        />
        <Route
          path="products/:id/edit"
          element={<AdminSectionPlaceholder title="Edit Produk" subtitle="Perbarui data produk" />}
        />
        <Route
          path="orders"
          element={<AdminSectionPlaceholder title="Manajemen Pesanan" subtitle="Daftar pesanan" />}
        />
        <Route
          path="orders/:id"
          element={<AdminSectionPlaceholder title="Detail Pesanan" subtitle="Transisi status" />}
        />
      </Route>

      <Route path="403" element={<PlaceholderPage eyebrow="Akses ditolak" title="Area ini membutuhkan izin berbeda" description="Akun yang digunakan tidak memiliki hak akses ke halaman tersebut." />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function AdminDashboardPlaceholder() {
  return (
    <section className="space-y-6">
      <div>
        <p className="section-kicker">Command center</p>
        <h1 className="font-display text-3xl font-semibold text-forest-950 sm:text-4xl">
          Dashboard GreenCart
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Statistik produk, stok, pesanan, dan grafik akan ditambahkan setelah model data siap.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {['Total produk', 'Stok menipis', 'Pesanan aktif', 'Pesanan selesai'].map((item) => (
          <article key={item} className="panel min-h-36 p-5">
            <div className="skeleton h-10 w-10 rounded-xl" />
            <div className="skeleton mt-5 h-3 w-24 rounded-full" />
            <div className="skeleton mt-3 h-7 w-16 rounded-lg" />
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminSectionPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="panel min-h-[32rem] p-6 sm:p-8">
      <p className="section-kicker">{subtitle}</p>
      <h1 className="font-display text-3xl font-semibold text-forest-950">{title}</h1>
      <div className="mt-10 grid gap-4">
        <div className="skeleton h-12 rounded-xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    </section>
  );
}
