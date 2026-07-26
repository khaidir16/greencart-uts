# Evidence — PostgreSQL Database Smoke Test

Tanggal eksekusi: 26 Juli 2026  
Database: PostgreSQL 17 lokal  
Schema: Prisma migration `20260726094610_init`

## Persiapan

- Service PostgreSQL aktif pada port 5432.
- Database dan role aplikasi: `greencart`.
- Migration awal berhasil diterapkan.
- Seed berhasil: 5 produk, 5 kategori, dan 2 akun demo.

## Alur yang diuji

1. Health check API mengembalikan status `UP`.
2. Customer login dengan akun demo.
3. Customer mengambil katalog dan menambahkan satu produk ke cart.
4. Checkout membuat pesanan berstatus `DRAFT`.
5. Cart kosong setelah transaksi berhasil.
6. Stok produk berkurang dari 30 menjadi 29.
7. Admin login dan mengubah status `DRAFT → CONFIRMED → COMPLETED`.

## Hasil

| Pemeriksaan | Hasil |
|---|---|
| API health | UP |
| Persistensi cart | Lulus |
| Checkout transaction | Lulus |
| Snapshot dan nomor order | Lulus |
| Cart cleanup | Lulus |
| Stock decrement | Lulus |
| Admin state transition | Lulus |

Nomor order evidence: `GC-2026-MS1M68VR-F6C8`.
