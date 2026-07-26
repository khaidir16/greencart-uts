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
- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs/openapi.json`

## Database lokal

GreenCart menggunakan PostgreSQL. Salin `apps/api/.env.example` menjadi `apps/api/.env`, isi
`DATABASE_URL`, kemudian jalankan:

```bash
npm run db:migrate --workspace @greencart/api -- --name init
npm run db:seed --workspace @greencart/api
```

## Pemeriksaan dasar

```bash
npm run typecheck
npm run lint
npm run build
npm test
npm run bdd
npm run e2e
```

`npm run e2e` memerlukan Web pada port 5173 dan API pada port 3000. Jalankan `npm run dev` pada
terminal terpisah sebelum Cypress headless, atau gunakan `npm run e2e:open` untuk mode interaktif.

## Deployment

Blueprint Render, konfigurasi Vercel, environment production, dan checklist smoke test dijelaskan
pada [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

Konfigurasi environment tersedia pada file `.env.example` di masing-masing aplikasi.
