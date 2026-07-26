# Database GreenCart

Skema menggunakan PostgreSQL dan Prisma. Buat `DATABASE_URL` dari `.env.example`, lalu jalankan:

```bash
npm run db:format --workspace @greencart/api
npm run db:validate --workspace @greencart/api
npm run db:generate --workspace @greencart/api
npm run db:migrate --workspace @greencart/api -- --name init
npm run db:seed --workspace @greencart/api
```

`passwordHash` pada seed masih berupa placeholder. Hash password yang sebenarnya akan dibuat pada tahap autentikasi, menggunakan satu fungsi hashing yang diuji melalui TDD.

Constraint bisnis jumlah, harga, stok, dan transisi status akan diterapkan pada service layer serta diperkuat dengan migration SQL pada tahap implementasi domain.
