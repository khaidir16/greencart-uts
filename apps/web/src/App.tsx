import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';
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
            <PlaceholderPage
              eyebrow="Katalog botani"
              title="Temukan tanaman yang cocok dengan ruangmu"
              description="Pencarian, filter, pengurutan, tampilan grid, dan katalog interaktif akan hadir di tahap katalog."
            />
          }
        />
        <Route
          path="products/:slug"
          element={
            <PlaceholderPage
              eyebrow="Detail produk"
              title="Kenali setiap tanaman sebelum membawanya pulang"
              description="Galeri, informasi perawatan, stok, harga, kuantitas, dan rekomendasi produk akan tersedia di sini."
            />
          }
        />
        <Route
          path="cart"
          element={
            <PlaceholderPage
              eyebrow="Keranjang"
              title="Pilihan hijaumu, tersusun rapi"
              description="Kontrol kuantitas, validasi stok, subtotal, penghapusan item, dan ringkasan belanja akan dibangun pada tahap fitur keranjang."
            />
          }
        />
        <Route
          path="checkout"
          element={
            <PlaceholderPage
              eyebrow="Checkout bertahap"
              title="Satu langkah lagi menuju ruang yang lebih hidup"
              description="Data penerima, alamat, tinjauan pesanan, validasi, dan konfirmasi akan menggunakan stepper yang jelas."
            />
          }
        />
        <Route
          path="profile/orders"
          element={
            <PlaceholderPage
              eyebrow="Riwayat pesanan"
              title="Pantau perjalanan tanamanmu"
              description="Daftar pesanan dan status terkini akan ditampilkan dengan pencarian serta filter status."
            />
          }
        />
        <Route
          path="orders/:orderNumber"
          element={
            <PlaceholderPage
              eyebrow="Detail pesanan"
              title="Status pesanan dalam satu timeline"
              description="Timeline DRAFT, CONFIRMED, COMPLETED, atau CANCELLED akan memperjelas state transition aplikasi."
            />
          }
        />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
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

      <Route path="403" element={<Navigate to="/" replace />} />
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
