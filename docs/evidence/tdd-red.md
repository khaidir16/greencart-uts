# Bukti TDD — Tahap Red

**Waktu eksekusi:** 2026-07-25 23:29:31  
**Tujuan:** Membuktikan unit test ditulis sebelum implementasi dua fungsi bisnis.

## Perintah

```bash
npm test --workspace @greencart/api -- --run \
  src/modules/cart/domain/validateCartQuantity.test.ts \
  src/modules/order/domain/transitionOrderStatus.test.ts
```

## Hasil

```text
Test Files  2 failed (2)
Tests       no tests

FAIL src/modules/cart/domain/validateCartQuantity.test.ts
Error: Cannot find module './validateCartQuantity.js'

FAIL src/modules/order/domain/transitionOrderStatus.test.ts
Error: Cannot find module './transitionOrderStatus.js'
```

## Analisis

Kegagalan sesuai harapan tahap Red. Kedua test suite sudah tersedia, tetapi fungsi
`validateCartQuantity` dan `transitionOrderStatus` belum dibuat. Dengan demikian, test benar-benar
mendahului kode produksi dan kegagalan bukan hasil rekayasa setelah implementasi selesai.
