# Bukti TDD — Tahap Refactor

**Waktu eksekusi:** 2026-07-25 23:34:15  
**Tujuan:** Memperbaiki struktur kode tanpa mengubah perilaku yang telah lulus pada tahap Green.

## Perubahan `validateCartQuantity`

Sebelum refactor:

- Batas `1` dan `10` ditulis langsung di dalam percabangan.
- Setiap cabang membuat object error dan pesan secara berulang.
- Kode error masih bertipe `string` umum.

Setelah refactor:

- Batas dipusatkan pada konstanta immutable `CART_QUANTITY_LIMIT`.
- Kode error menggunakan union type `CartQuantityErrorCode`.
- Pesan dipusatkan dalam `errorMessages`.
- Pembuatan hasil gagal menggunakan helper `invalidQuantity`.

## Perubahan `transitionOrderStatus`

Sebelum refactor:

- Transisi DRAFT dan CONFIRMED ditulis sebagai kondisi gabungan yang terpisah.

Setelah refactor:

- Seluruh aturan valid dipusatkan pada `VALID_ORDER_TRANSITIONS`.
- Fungsi menggunakan satu lookup sehingga aturan lebih mudah diaudit dan diperluas.
- Status terminal COMPLETED dan CANCELLED terlihat eksplisit melalui array kosong.

Kode tahap Green dapat dibandingkan melalui commit `84cdb3b`, sedangkan kode hasil refactor
berada pada commit tahap Refactor.

## Hasil setelah refactor

```text
PASS validateCartQuantity.test.ts (11 tests)
PASS transitionOrderStatus.test.ts (14 tests)

Test Files  2 passed (2)
Tests       25 passed (25)
```

## Code coverage

```text
File                       Statements  Branches  Functions  Lines
validateCartQuantity.ts       100%       100%       100%     100%
transitionOrderStatus.ts      100%       100%       100%     100%
```

Keseluruhan API menjalankan 27 test pada tiga test suite. Persentase global lebih rendah karena
file konfigurasi, server bootstrap, dan seed ikut dihitung tetapi tidak relevan dengan target dua
fungsi TDD. Kedua fungsi yang menjadi objek TDD mencapai 100% pada seluruh metrik.

## Kesimpulan

Refactor tidak mengubah hasil observable. Semua test tahap Green tetap berhasil, sementara kode
menjadi lebih konsisten, typed, mudah ditelusuri, dan siap digunakan oleh service API.
