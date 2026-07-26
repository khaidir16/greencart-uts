# GreenCart

GreenCart adalah aplikasi toko tanaman dan perlengkapan berkebun untuk proyek UTS Advanced
Software Testing and Quality Assurance.

## Workspace

- `apps/web` — React, Vite, dan TypeScript.
- `apps/api` — Express REST API dan TypeScript.
- `features` — spesifikasi BDD Gherkin dan step definition.
- `docs` — diagram, bukti eksekusi, test case, dan defect.

## Akun demo development

- Admin: `admin` / `Admin123!`
- Customer: `customer` / `Customer123!`

Credential tersebut hanya untuk pengujian lokal/demo UTS.

## Menjalankan proyek

```bash
npm install
npm run dev
```

- Web: `http://localhost:5173`
- API: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`

## Pemeriksaan dasar

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

Konfigurasi environment tersedia pada file `.env.example` di masing-masing aplikasi.
