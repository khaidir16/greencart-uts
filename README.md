# GreenCart

GreenCart adalah aplikasi toko tanaman dan perlengkapan berkebun untuk proyek UTS Advanced
Software Testing and Quality Assurance.

## Anggota Kelompok

| Nama               | NIM          | Pembagian Tugas                                                                           |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------- |
| Muh Yahya Al Qadri | 105841120523 | Pengembangan kode frontend, integrasi antarmuka, dan implementasi fitur aplikasi          |
| Muh. Khaidir Nur   | 105841119323 | Pengembangan kode backend, database, API, autentikasi, dan integrasi sistem               |
| Nursyahlan Ruslan  | 105841118823 | Perancangan test case, pengujian fungsional, BDD, dan quality assurance                   |
| Mustapiah          | 105841120423 | Dokumentasi proyek, pencatatan hasil pengujian, penyusunan laporan, dan materi presentasi |

## Tentang Aplikasi

GreenCart memakai arsitektur monorepo yang memisahkan aplikasi web dan REST API. Pengunjung dapat
melihat serta memfilter katalog. Customer dapat login, mengelola keranjang, checkout, dan melihat
riwayat pesanan. Admin memiliki dashboard untuk mengelola produk serta memproses status pesanan.

Alur utama aplikasi:

1. React mengirim request HTTP ke Express API.
2. API memvalidasi request menggunakan Zod dan memeriksa JWT untuk endpoint yang dilindungi.
3. Service menjalankan aturan bisnis seperti validasi stok dan transisi status pesanan.
4. Repository mengakses PostgreSQL melalui Prisma.
5. API mengembalikan response JSON yang kemudian ditampilkan oleh React.

## Teknologi

- Frontend: React 19, Vite, TypeScript, React Router, Zustand, Tailwind CSS, dan Framer Motion.
- Backend: Express 5, TypeScript, Zod, JWT (`jose`), dan bcrypt.
- Database: PostgreSQL dan Prisma ORM.
- Testing: Vitest, Testing Library, Supertest, Cucumber/BDD, dan Cypress E2E.
- Dokumentasi API: Swagger UI dan OpenAPI.

## Struktur dan Penjelasan Kode

```text
greencart/
├── apps/
│   ├── api/
│   │   ├── prisma/             # Schema, migration, dan seed database
│   │   └── src/
│   │       ├── config/         # Environment dan koneksi database
│   │       ├── docs/           # Spesifikasi OpenAPI
│   │       ├── modules/        # Auth, product, cart, dan order
│   │       ├── routes/         # Health check
│   │       ├── app.ts          # Konfigurasi Express dan middleware
│   │       └── server.ts       # Entry point API
│   └── web/
│       └── src/
│           ├── components/     # UI, layout, auth guard, dan animasi 3D
│           ├── features/       # State dan tipe data per fitur
│           ├── pages/          # Halaman guest, customer, dan admin
│           ├── services/       # Client untuk berkomunikasi dengan API
│           ├── styles/         # Style global
│           ├── App.tsx         # Routing aplikasi
│           └── main.tsx        # Entry point React
├── features/                   # Feature Gherkin dan step definition BDD
├── docs/                       # Test case, bukti pengujian, dan deployment
├── cypress/                    # Skenario end-to-end
└── package.json                # Script utama monorepo
```

Setiap modul backend menggunakan pemisahan tanggung jawab:

- `*.route.ts` mendefinisikan endpoint dan response HTTP.
- `*.schema.ts` memvalidasi body, parameter, dan query.
- `*.service.ts` berisi proses serta aturan bisnis.
- `*.repository.ts` mendefinisikan kontrak akses data.
- `prisma-*.repository.ts` menjalankan akses database produksi.
- `in-memory-*.repository.ts` menyediakan data terisolasi untuk pengujian.
- Folder `domain/` berisi aturan bisnis murni yang dapat diuji secara unit.

## Prasyarat

- Node.js 22 atau lebih baru.
- npm.
- PostgreSQL yang sedang berjalan.
- Git jika proyek diambil dari repository.

## Cara Menjalankan Proyek

### 1. Instal dependency

```bash
npm install
```

### 2. Siapkan environment

Salin `apps/api/.env.example` menjadi `apps/api/.env`, kemudian sesuaikan nilainya:

```env
NODE_ENV=development
PORT=3000
WEB_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/greencart
AUTH_SECRET=ganti-dengan-secret-acak-yang-panjang
```

Salin `apps/web/.env.example` menjadi `apps/web/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Jangan memasukkan file `.env` ke Git karena dapat berisi credential.

### 3. Siapkan database

Buat database PostgreSQL bernama `greencart`, kemudian jalankan:

```bash
npm run db:generate --workspace @greencart/api
npm run db:migrate --workspace @greencart/api -- --name init
npm run db:seed --workspace @greencart/api
```

Seed memasukkan kategori, produk contoh, serta akun admin dan customer.

### 4. Jalankan web dan API

```bash
npm run dev
```

Perintah tersebut menjalankan frontend dan backend secara bersamaan. Akses layanan melalui:

- Web: `http://localhost:5173`
- API: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`
- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs/openapi.json`

Untuk menjalankannya secara terpisah gunakan dua terminal:

```bash
npm run dev:api
npm run dev:web
```

## Akun Demo Development

| Role     | Username   | Password       |
| -------- | ---------- | -------------- |
| Admin    | `admin`    | `Admin123!`    |
| Customer | `customer` | `Customer123!` |

Credential tersebut hanya digunakan untuk pengujian lokal atau demo UTS.

## Cara Menggunakan

1. Buka halaman web dan jelajahi katalog tanpa login.
2. Login sebagai customer untuk menambahkan produk, membuka keranjang, dan checkout.
3. Login sebagai admin untuk membuka dashboard, mengelola produk, dan memperbarui pesanan.

## Menjalankan Pengujian

```bash
npm test            # Unit, integration, dan component test
npm run bdd         # Skenario bisnis Cucumber/Gherkin
npm run typecheck   # Pemeriksaan tipe TypeScript
npm run lint        # Pemeriksaan kualitas kode
npm run build       # Build production API dan web
npm run e2e         # End-to-end test Cypress
```

`npm run e2e` memerlukan Web pada port 5173 dan API pada port 3000. Jalankan `npm run dev` pada
terminal terpisah sebelum Cypress headless, atau gunakan `npm run e2e:open` untuk mode interaktif.

## Deployment

Blueprint Render, konfigurasi Vercel, environment production, dan checklist smoke test dijelaskan
pada [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Konfigurasi environment tersedia pada file `.env.example` di masing-masing aplikasi.
