# Perencanaan Proyek GreenCart

## 1. Identitas Proyek

**Nama aplikasi:** GreenCart  
**Tema:** Toko tanaman dan perlengkapan berkebun  
**Konsep visual:** Living Botanical Experience — toko botani modern dengan hero tanaman 3D, katalog interaktif, checkout bertahap, timeline pesanan, dan dashboard admin.  
**Tujuan:** Memudahkan pelanggan menemukan dan memesan tanaman serta perlengkapan berkebun sekaligus menjadi objek implementasi Advanced Test Design, TDD, BDD, UI Automation, dan REST API Automation.

### Permasalahan yang diselesaikan

1. Informasi tanaman, stok, dan kebutuhan perawatan sering tersebar dan tidak konsisten.
2. Pelanggan membutuhkan proses pemesanan yang jelas, tervalidasi, dan mudah digunakan.
3. Pengelola membutuhkan sarana untuk mengelola produk, stok, pesanan, dan perubahan status.
4. Kesalahan jumlah pembelian, stok, data penerima, dan perubahan status harus dicegah melalui aturan bisnis yang dapat diuji.

## 2. Ruang Lingkup

### Termasuk dalam proyek

- Autentikasi pelanggan dan admin.
- Katalog, pencarian, filter, pengurutan, dan detail produk.
- Keranjang belanja dan validasi jumlah.
- Checkout bertahap dan pembuatan pesanan.
- Detail dan timeline status pesanan.
- Dashboard admin untuk produk dan status pesanan.
- RESTful API untuk produk, keranjang, autentikasi, dan pesanan.
- Unit test, TDD, BDD, UI automation, API automation, dan laporan coverage.
- Antarmuka responsif serta elemen tanaman 3D yang memiliki fallback.

### Tidak termasuk dalam versi UTS

- Pembayaran melalui payment gateway nyata.
- Perhitungan ongkos kirim dari layanan ekspedisi nyata.
- Marketplace dengan banyak penjual.
- Chat, ulasan pengguna, dan notifikasi eksternal.
- Login sosial dan pemulihan password melalui email.

Pembayaran ditampilkan sebagai simulasi/konfirmasi pesanan agar ruang lingkup tetap selaras dengan soal UTS.

## 3. Aktor dan Hak Akses

### Guest

- Membuka beranda dan melihat produk.
- Mencari, memfilter, dan melihat detail produk.
- Membuka halaman login.
- Tidak dapat checkout.

### Customer

- Memiliki seluruh akses Guest.
- Menambah, mengubah, dan menghapus isi keranjang.
- Checkout menggunakan data penerima yang valid.
- Melihat detail dan status pesanannya.
- Logout.

### Admin

- Login ke dashboard admin.
- Melihat ringkasan produk, stok, dan pesanan.
- Menambah, memperbarui, dan menghapus produk.
- Melihat detail pesanan.
- Mengubah status pesanan sesuai aturan transisi.

## 4. Pilihan Teknologi

| Bagian | Teknologi | Alasan |
|---|---|---|
| Frontend | React + Vite + TypeScript | Cepat, terstruktur, dan mudah diuji dengan Cypress |
| Styling | Tailwind CSS | Konsistensi desain dan responsivitas |
| Komponen UI | Komponen internal + Radix primitives bila diperlukan | Kontrol aksesibilitas dan selector pengujian |
| 3D | React Three Fiber + Drei | Hero tanaman 3D dengan integrasi React |
| Animasi | Framer Motion | Transisi dan micro-interaction terkontrol |
| Grafik | Recharts | Visualisasi dashboard admin |
| State server | TanStack Query | Cache, loading, error, dan invalidasi data API |
| State lokal | Zustand | Autentikasi ringan dan UI state bila diperlukan |
| Form | React Hook Form + Zod | Validasi terstruktur dan pesan error konsisten |
| Backend | Node.js + Express + TypeScript | REST API eksplisit dan mudah diuji dengan Supertest |
| ORM | Prisma | Skema data, migrasi, dan validasi tipe |
| Database | PostgreSQL | Cocok untuk relasi produk, pesanan, dan detail pesanan |
| Unit test | Vitest | Mendukung siklus TDD dan coverage |
| API test | Supertest + Vitest | Otomatis melalui CLI dan dekat dengan implementasi API |
| BDD | Cucumber-JS | Gherkin, feature file, dan step definition |
| UI test | Cypress | POM, screenshot, video, dan laporan UI |
| API docs | OpenAPI/Swagger | Mendokumentasikan endpoint dan payload |
| Frontend hosting | Vercel | Deployment frontend |
| Backend hosting | Render | Deployment Express API |
| Database hosting | Neon PostgreSQL | PostgreSQL terkelola untuk aplikasi online |

## 5. Kebutuhan Fungsional

| ID | Kebutuhan |
|---|---|
| FR-01 | Sistem menampilkan beranda GreenCart dan hero tanaman 3D atau fallback visual. |
| FR-02 | Sistem menerima login menggunakan email/username dan password. |
| FR-03 | Sistem menolak login dengan kredensial salah atau field kosong serta menampilkan pesan yang sesuai. |
| FR-04 | Sistem membedakan hak akses Guest, Customer, dan Admin. |
| FR-05 | Sistem menampilkan daftar produk beserta nama, harga, stok, kategori, dan deskripsi ringkas. |
| FR-06 | Pengguna dapat mencari, memfilter, mengurutkan, dan membuka detail produk. |
| FR-07 | Admin dapat menambahkan produk dengan data valid. |
| FR-08 | Admin dapat memperbarui produk yang ditemukan. |
| FR-09 | Admin dapat menghapus produk sesuai aturan integritas data. |
| FR-10 | Customer dapat menambahkan produk dengan jumlah valid ke keranjang. |
| FR-11 | Customer dapat mengubah jumlah produk dalam keranjang. |
| FR-12 | Customer dapat menghapus produk dari keranjang. |
| FR-13 | Sistem menghitung subtotal dan total keranjang secara otomatis. |
| FR-14 | Sistem memvalidasi jumlah pembelian: bilangan bulat 1–10 dan tidak melebihi stok. |
| FR-15 | Sistem hanya mengizinkan Customer yang sudah login melakukan checkout. |
| FR-16 | Sistem memvalidasi keranjang, stok, nama penerima, alamat, dan nomor telepon saat checkout. |
| FR-17 | Sistem membuat pesanan berstatus DRAFT dan nomor pesanan unik setelah checkout berhasil. |
| FR-18 | Sistem menyimpan snapshot produk, jumlah, harga, total, dan data penerima pada pesanan. |
| FR-19 | Customer dapat melihat detail dan timeline status pesanannya. |
| FR-20 | Admin dapat mengubah DRAFT menjadi CONFIRMED. |
| FR-21 | Admin dapat mengubah CONFIRMED menjadi COMPLETED. |
| FR-22 | Admin dapat mengubah DRAFT atau CONFIRMED menjadi CANCELLED. |
| FR-23 | Sistem menolak pembatalan COMPLETED dan pengaktifan kembali CANCELLED. |
| FR-24 | Sistem menyediakan RESTful API dengan status code, response body, dan pesan error yang sesuai. |
| FR-25 | Admin dapat melihat ringkasan jumlah produk, stok menipis, dan pesanan berdasarkan status. |
| FR-26 | Pengguna dapat logout dan sesi aksesnya dihentikan. |

## 6. Kebutuhan Nonfungsional

| ID | Kebutuhan |
|---|---|
| NFR-01 | UI responsif pada desktop, tablet, dan ponsel. |
| NFR-02 | Interaksi utama tetap dapat digunakan ketika model 3D gagal dimuat. |
| NFR-03 | Sistem menghormati preferensi `prefers-reduced-motion`. |
| NFR-04 | Form memiliki label, pesan error, fokus keyboard, dan kontras yang memadai. |
| NFR-05 | Password disimpan sebagai hash dan endpoint privat memerlukan autentikasi/otorisasi. |
| NFR-06 | Input divalidasi pada frontend dan backend. |
| NFR-07 | API mengembalikan JSON dan format error yang konsisten. |
| NFR-08 | Pengujian dapat dijalankan berulang dengan data uji yang dapat di-reset. |
| NFR-09 | Elemen penting memiliki selector `data-testid` yang stabil. |
| NFR-10 | Daftar produk normal ditargetkan tampil dalam waktu maksimal 3 detik pada koneksi wajar. |
| NFR-11 | API utama ditargetkan merespons di bawah 2 detik pada kondisi pengujian normal. |
| NFR-12 | Kode menggunakan TypeScript, linting, format konsisten, dan pemisahan tanggung jawab. |
| NFR-13 | Model 3D dan gambar menggunakan lazy loading serta aset yang dioptimalkan. |
| NFR-14 | Aplikasi memberikan loading, empty, success, dan error state yang jelas. |

## 7. Aturan Bisnis

### Akun dan autentikasi

1. Email/username dan password wajib diisi.
2. Kredensial salah menghasilkan pesan umum agar tidak membocorkan keberadaan akun.
3. Endpoint admin hanya dapat diakses oleh pengguna dengan peran ADMIN.
4. Pengguna harus login sebelum checkout atau melihat pesanan privat.

### Produk

1. Nama wajib diisi dan tidak boleh hanya berupa spasi.
2. Harga harus berupa angka dan lebih besar dari nol.
3. Stok harus berupa bilangan bulat dan tidak boleh negatif.
4. Kategori dan deskripsi wajib menggunakan nilai yang valid.
5. Produk yang sudah menjadi bagian dari riwayat pesanan tidak mengubah snapshot pada pesanan lama.

### Keranjang

1. Jumlah minimal adalah 1 unit.
2. Jumlah maksimal adalah 10 unit per produk.
3. Jumlah tidak boleh melebihi stok terkini.
4. Jumlah harus berupa bilangan bulat, bukan nol, negatif, pecahan, atau teks.
5. Produk yang sama digabung menjadi satu baris selama jumlah akhirnya valid.
6. Total adalah jumlah `harga × kuantitas` dari seluruh item.

### Checkout dan stok

1. Checkout memerlukan autentikasi dan keranjang yang tidak kosong.
2. Nama penerima, alamat, dan nomor telepon wajib diisi.
3. Validasi stok diulangi pada server ketika checkout untuk mencegah data usang.
4. Pembuatan pesanan dan pengurangan stok dilakukan dalam satu transaksi database.
5. Kegagalan satu validasi membatalkan seluruh transaksi.
6. Pesanan berhasil selalu memiliki nomor unik dan status awal DRAFT.

### Status pesanan

| Dari | Ke | Diizinkan |
|---|---|---|
| DRAFT | CONFIRMED | Ya |
| DRAFT | CANCELLED | Ya |
| CONFIRMED | COMPLETED | Ya |
| CONFIRMED | CANCELLED | Ya |
| COMPLETED | CANCELLED/DRAFT/CONFIRMED | Tidak |
| CANCELLED | DRAFT/CONFIRMED/COMPLETED | Tidak |
| Status sama | Status sama | Tidak; tidak ada perubahan |

Transisi yang tidak tercantum sebagai valid harus ditolak dengan `409 Conflict` dan pesan yang menjelaskan transisi tidak diperbolehkan.

## 8. Alur Utama Pengguna

### Alur belanja

1. Guest membuka beranda.
2. Guest menjelajahi atau mencari produk.
3. Guest membuka detail produk.
4. Pengguna login sebagai Customer.
5. Customer menambahkan produk dengan jumlah valid ke keranjang.
6. Customer meninjau serta mengubah keranjang.
7. Customer membuka checkout dan mengisi data penerima.
8. Server memvalidasi pengguna, keranjang, jumlah, dan stok.
9. Sistem membuat pesanan DRAFT, mengurangi stok, dan membersihkan keranjang.
10. Customer melihat nomor dan detail pesanan.

### Alur pengelolaan admin

1. Admin login dan membuka dashboard.
2. Admin mengelola data produk melalui form tervalidasi.
3. Admin membuka daftar/detail pesanan.
4. Admin memilih status tujuan yang diizinkan.
5. Server memvalidasi transisi dan menyimpan perubahan atau menolaknya.

## 9. Struktur Halaman

### Area publik/customer

- `/` — hero 3D, kategori, produk unggulan, manfaat, dan CTA.
- `/login` — login dengan validasi.
- `/products` — katalog, pencarian, filter, sort, grid/list, pagination.
- `/products/:slug` — detail, galeri, care information, jumlah, produk terkait.
- `/cart` — item, kontrol jumlah, hapus, subtotal, total, empty state.
- `/checkout` — stepper data penerima, review, dan konfirmasi.
- `/orders/:orderNumber` — detail dan timeline status.
- `/profile/orders` — riwayat pesanan Customer.
- `/403` dan `/*` — forbidden dan not found.

### Area admin

- `/admin` — statistik dan grafik.
- `/admin/products` — tabel serta CRUD produk.
- `/admin/products/new` — tambah produk.
- `/admin/products/:id/edit` — edit produk.
- `/admin/orders` — tabel/filter pesanan.
- `/admin/orders/:id` — detail dan perubahan status.

## 10. Rancangan Data

### User

- `id`: UUID, primary key
- `email`: unik
- `username`: unik
- `passwordHash`
- `name`
- `role`: CUSTOMER atau ADMIN
- `createdAt`, `updatedAt`

### Category

- `id`: UUID
- `name`: unik
- `slug`: unik
- `description`

### Product

- `id`: UUID
- `name`
- `slug`: unik
- `description`
- `price`: decimal positif
- `stock`: integer nonnegatif
- `imageUrl`
- `categoryId`: foreign key
- `careLevel`: EASY, MEDIUM, HARD
- `lightRequirement`
- `wateringFrequency`
- `isActive`
- `createdAt`, `updatedAt`

### Cart

- `id`: UUID
- `userId`: unik, foreign key
- `createdAt`, `updatedAt`

### CartItem

- `id`: UUID
- `cartId`: foreign key
- `productId`: foreign key
- `quantity`: integer
- unique constraint: `cartId + productId`

### Order

- `id`: UUID
- `orderNumber`: unik
- `userId`: foreign key
- `recipientName`
- `phone`
- `shippingAddress`
- `totalAmount`: decimal
- `status`: DRAFT, CONFIRMED, COMPLETED, CANCELLED
- `createdAt`, `updatedAt`

### OrderItem

- `id`: UUID
- `orderId`: foreign key
- `productId`: nullable foreign key
- `productName`: snapshot
- `unitPrice`: snapshot decimal
- `quantity`: integer
- `subtotal`: decimal

### OrderStatusHistory

- `id`: UUID
- `orderId`: foreign key
- `fromStatus`: nullable untuk status awal
- `toStatus`
- `changedById`: foreign key User
- `note`: opsional
- `createdAt`

Relasi utama: User memiliki Cart dan banyak Order; Category memiliki banyak Product; Cart memiliki banyak CartItem; Order memiliki banyak OrderItem dan OrderStatusHistory.

## 11. Rancangan RESTful API

Semua response menggunakan format konsisten:

```json
{
  "success": true,
  "message": "Deskripsi hasil",
  "data": {}
}
```

Error menggunakan `success: false`, `message`, dan bila relevan `errors` berisi detail field.

### Authentication

| Method | Endpoint | Akses | Hasil utama |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Token/sesi dan data user |
| POST | `/api/auth/logout` | Login | Mengakhiri sesi |
| GET | `/api/auth/me` | Login | User aktif |

### Products

| Method | Endpoint | Akses | Status utama |
|---|---|---|---|
| GET | `/api/products` | Public | 200 |
| GET | `/api/products/:id` | Public | 200, 404 |
| POST | `/api/products` | Admin | 201, 400/422 |
| PATCH | `/api/products/:id` | Admin | 200, 404, 400/422 |
| DELETE | `/api/products/:id` | Admin | 204, 404, 409 |

`PATCH` dipilih secara konsisten untuk pembaruan parsial.

### Cart

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| GET | `/api/cart` | Customer | Mengambil keranjang |
| POST | `/api/cart/items` | Customer | Menambahkan item |
| PATCH | `/api/cart/items/:itemId` | Customer | Mengubah jumlah |
| DELETE | `/api/cart/items/:itemId` | Customer | Menghapus item |

### Orders

| Method | Endpoint | Akses | Status utama |
|---|---|---|---|
| POST | `/api/orders` | Customer | 201, 400/422, 409 |
| GET | `/api/orders` | Login | Daftar sesuai hak akses |
| GET | `/api/orders/:id` | Login | 200, 403, 404 |
| PATCH | `/api/orders/:id/status` | Admin | 200, 404, 409 |

### Dashboard

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin | Statistik produk dan pesanan |

## 12. Strategi Pengujian

### Advanced Test Design

- State Transition 1: perubahan status pesanan.
- State Transition 2: siklus keranjang menuju checkout (EMPTY, ACTIVE, VALIDATED, ORDERED).
- Cyclomatic Complexity 1: `validateCheckout`.
- Cyclomatic Complexity 2: `transitionOrderStatus`.
- Setiap FR dipetakan ke test case melalui Requirement Traceability Matrix.

### TDD

- Fungsi 1: validasi jumlah produk (`validateCartQuantity`).
- Fungsi 2: validasi transisi status (`transitionOrderStatus`).
- Bukti Red, Green, dan Refactor direkam sejak awal, bukan dibuat ulang setelah implementasi.

### BDD

- `cart-quantity.feature` untuk positif, negatif, boundary, dan Scenario Outline.
- `order-status.feature` untuk transisi valid dan tidak valid.
- Minimal lima skenario; target proyek enam sampai delapan skenario.

### UI Automation

- Cypress dengan Page Object untuk Login, Products, Cart, Checkout; ditambah Order dan Admin bila diperlukan.
- Delapan test wajib ditambah test boundary dan akses admin.
- Data fixture, selector stabil, reset data, screenshot/video, dan laporan CLI.

### API Automation

- Supertest + Vitest dengan minimal 12 test wajib; target 16 test.
- Validasi status, header, content type, body, schema, tipe, required field, payload, response time, dan pesan error tersebar pada suite.
- Database test terisolasi dan dapat di-reset.

## 13. Struktur Folder yang Direncanakan

```text
greencart/
|-- apps/
|   |-- web/
|   |   |-- src/
|   |   |   |-- components/
|   |   |   |-- features/
|   |   |   |-- pages/
|   |   |   |-- routes/
|   |   |   |-- services/
|   |   |   |-- store/
|   |   |   `-- test/
|   |   `-- cypress/
|   |       |-- e2e/
|   |       |-- fixtures/
|   |       `-- pages/
|   `-- api/
|       |-- prisma/
|       `-- src/
|           |-- config/
|           |-- middleware/
|           |-- modules/
|           |-- routes/
|           |-- shared/
|           `-- tests/
|-- features/
|   |-- cart-quantity.feature
|   |-- order-status.feature
|   `-- step-definitions/
|-- docs/
|   |-- diagrams/
|   |-- evidence/
|   |-- test-cases/
|   `-- defects/
|-- package.json
`-- README.md
```

Struktur berupa monorepo agar aplikasi, pengujian, dokumentasi, dan perintah CLI berada dalam satu ZIP tetapi tetap terpisah secara logis.

## 14. Strategi Deployment

1. Frontend dipasang di Vercel.
2. Backend Express dipasang di Render.
3. Database PostgreSQL dipasang di Neon.
4. Environment production menyimpan URL API, database URL, secret autentikasi, dan konfigurasi CORS.
5. Swagger/API documentation tersedia dari backend.
6. Akun demo Customer dan Admin disediakan di README/PPT tanpa menggunakan data pribadi.
7. Model 3D memiliki gambar fallback apabila WebGL atau aset gagal dimuat.

## 15. Bukti yang Harus Dikumpulkan Selama Pengerjaan

- Screenshot requirement dan rancangan UI.
- Screenshot kode dengan keterangan fungsi.
- Diagram database, state transition, dan control flow graph.
- Log Red, Green, dan Refactor untuk dua fungsi TDD.
- File feature, step definition, serta hasil BDD.
- Struktur POM dan hasil minimal delapan UI test.
- Implementasi serta laporan minimal 12 API test.
- Unit coverage dan independent path.
- Daftar defect, severity, priority, penyebab, perbaikan, dan retest.
- Screenshot aplikasi desktop dan mobile.
- URL frontend, API, dan dokumentasi endpoint.
- Kontribusi setiap anggota kelompok.

## 16. Kriteria Selesai Tahap Fondasi

- Tema, ruang lingkup, teknologi, aktor, dan hak akses telah ditetapkan.
- Kebutuhan fungsional memiliki ID yang dapat ditelusuri.
- Aturan bisnis memenuhi dan memperjelas ketentuan soal.
- Entitas dan endpoint mendukung seluruh alur wajib.
- Strategi test mencakup seluruh nilai minimum UTS.
- Struktur proyek mendukung pemisahan frontend, backend, BDD, UI test, API test, dan bukti laporan.

Dokumen ini menjadi baseline. Perubahan selanjutnya harus tetap menjaga keterlacakan antara kebutuhan, implementasi, test case, hasil pengujian, dan defect.
