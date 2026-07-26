# GreenCart — Presentation Outline

## Slide 1 — Judul

- GreenCart: Botanical Commerce Application
- Advanced Software Testing and Quality Assurance
- Nama, NIM, kelas, dan dosen

## Slide 2 — Masalah dan tujuan

- Customer membutuhkan katalog, cart, checkout, dan pelacakan order.
- Admin membutuhkan CRUD produk, dashboard, dan pengelolaan status.
- Tujuan kualitas: fitur dapat ditelusuri ke requirement dan bukti test otomatis.

## Slide 3 — Arsitektur

- React/Vite → Express REST API → Prisma → PostgreSQL.
- JWT dan role guard untuk Customer/Admin.
- Swagger UI sebagai kontrak API.

## Slide 4 — Fitur utama

- Guest: katalog dan detail produk.
- Customer: cart, checkout, riwayat, dan detail pesanan.
- Admin: produk, dashboard, pesanan, dan state transition.

## Slide 5 — TDD

- Red: business rule quantity dan order transition gagal sebelum implementasi.
- Green: implementasi minimum membuat test lulus.
- Refactor: rule dipusatkan sebagai pure domain function.

## Slide 6 — BDD

- 2 feature file, positive/negative/boundary/Scenario Outline.
- 15 scenario dan 50 step lulus.

## Slide 7 — Advanced testing

- State transition cart dan order.
- White-box CFG untuk quantity validation dan status transition.
- Requirement Traceability Matrix menghubungkan FR dengan test case.

## Slide 8 — Automation result

- 75 API test dan 9 Web component test lulus.
- 9 Cypress E2E dengan empat Page Object lulus pada PostgreSQL nyata.
- Typecheck, lint, BDD, dan build lulus.

## Slide 9 — Database dan reliability

- Checkout menggunakan serializable transaction.
- Stok berkurang dan cart dibersihkan secara atomik.
- Order menyimpan snapshot produk dan harga.
- Smoke test database nyata berhasil.

## Slide 10 — Security dan quality

- bcrypt, JWT, role authorization, Zod, Helmet, dan CORS.
- Dependency audit: 0 critical; advisory tersisa dianalisis dan terdokumentasi.
- Environment production menolak secret lemah atau origin kosong.

## Slide 11 — Live demo

- Customer checkout satu produk.
- Admin menemukan order dan mengubah DRAFT → CONFIRMED.
- Tunjukkan Swagger UI dan evidence test.

## Slide 12 — Kesimpulan

- Seluruh fitur inti dan requirement testing tercakup.
- Bukti dapat dijalankan ulang melalui CLI.
- Pengembangan berikutnya: payment gateway, notification, dan production monitoring.
