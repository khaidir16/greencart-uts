# Database GreenCart

Skema menggunakan PostgreSQL dan Prisma. Buat `DATABASE_URL` dari `.env.example`, lalu jalankan:

```bash
npm run db:format --workspace @greencart/api
npm run db:validate --workspace @greencart/api
npm run db:generate --workspace @greencart/api
npm run db:migrate --workspace @greencart/api -- --name init
npm run db:seed --workspace @greencart/api
```

Akun demo dibuat dengan hash bcrypt. Password development adalah `Admin123!` dan `Customer123!`;
credential tersebut wajib diganti jika aplikasi digunakan di luar kebutuhan demonstrasi UTS.

Constraint bisnis jumlah, harga, stok, dan transisi status akan diterapkan pada service layer serta diperkuat dengan migration SQL pada tahap implementasi domain.
