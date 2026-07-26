# DEF-API-001 — PATCH kosong diterima sebagai pembaruan produk

| Field | Nilai |
|---|---|
| Severity | Medium |
| Priority | High |
| Status | Closed |
| Test case | API-PROD-12 |

## Langkah reproduksi

1. Kirim `PATCH /api/products/:id` dengan ID valid.
2. Gunakan body `{}`.

## Expected

API menolak request dengan status `422` karena tidak ada field yang diperbarui.

## Actual

API mengembalikan `200`. Default `imageUrl: null` dan `isActive: true` dianggap sebagai field yang
tersedia setelah `createProductSchema.partial()` diproses.

## Penyebab

Schema update mewarisi default value dari schema create. Refinement `Object.keys(value).length > 0`
dijalankan setelah default diaplikasikan, sehingga object kosong berubah menjadi object dengan dua
field.

## Perbaikan

Field yang memiliki default dioverride pada update schema menjadi optional tanpa default. Dengan
demikian, hanya field yang benar-benar dikirim pengguna yang dihitung.

## Retest

Retest dijalankan pada 2026-07-25 23:55:24. Seluruh 14 test produk lulus dan request `PATCH {}`
sekarang menghasilkan `422` sesuai expected result.
