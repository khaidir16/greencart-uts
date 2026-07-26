# GreenCart Deployment Guide

## Opsi A — Render Blueprint

Repository menyediakan `render.yaml` untuk:

- PostgreSQL `greencart-db`;
- Express API `greencart-api`;
- React static site `greencart-web`.

Setelah membuat Blueprint dari repository GitHub:

1. Isi `WEB_ORIGIN` pada API dengan URL static site tanpa trailing slash.
2. Isi `VITE_API_BASE_URL` pada Web dengan `https://<api-host>/api`.
3. Deploy ulang Web setelah URL API tersedia.
4. Jalankan seed satu kali melalui Render Shell:
   `npm run db:seed --workspace @greencart/api`.
5. Periksa `/api/health`, `/api/docs`, login demo, dan checkout.

Migration dijalankan otomatis melalui `prisma migrate deploy` sebelum API dirilis.

## Opsi B — Render API + Vercel Web

`vercel.json` membangun workspace Web dan menyediakan SPA rewrite. Environment Vercel:

```text
VITE_API_BASE_URL=https://<render-api-host>/api
```

Environment API Render:

```text
NODE_ENV=production
DATABASE_URL=<managed PostgreSQL connection string>
AUTH_SECRET=<random secret minimal 32 karakter>
WEB_ORIGIN=https://<vercel-project>.vercel.app
```

## Verification checklist

- API health mengembalikan HTTP 200.
- Swagger UI dapat dibuka.
- Frontend tidak mengalami CORS error.
- Login Customer dan Admin berhasil.
- Cart, checkout, dan perubahan status tersimpan setelah restart service.
- Route SPA seperti `/products` dan `/admin/orders` dapat dibuka langsung.

Jangan memasukkan `.env`, token, atau connection string ke Git.
