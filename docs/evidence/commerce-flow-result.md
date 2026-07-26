# Evidence — Commerce Flow GreenCart

## Ruang lingkup

Implementasi mencakup katalog Guest, detail produk, keranjang Customer, checkout transaksional,
riwayat pesanan, state transition pesanan, CRUD produk Admin, dan dashboard operasional.

## Traceability implementasi

| Requirement | Implementasi | Verifikasi otomatis |
|---|---|---|
| FR-05–FR-06 | Katalog, pencarian, filter stok, sort, pagination, detail slug | `ProductsPage.test.tsx`, `product.route.test.ts` |
| FR-07–FR-09 | Form create/update dan delete produk khusus Admin | `product.route.test.ts` |
| FR-10–FR-14 | REST API dan halaman keranjang, validasi jumlah/stok, subtotal/total | `cart.route.test.ts`, domain quantity tests |
| FR-15–FR-18 | Checkout Customer, snapshot order, pengurangan stok dan pembersihan cart dalam transaksi | `order.route.test.ts` |
| FR-19 | Riwayat dan detail pesanan milik Customer | `order.route.test.ts` |
| FR-20–FR-23 | Transisi status Admin dengan aturan domain | `order.route.test.ts`, `transitionOrderStatus.test.ts` |
| FR-25 | Dashboard ringkasan produk, stok, dan status pesanan | Typecheck, lint, production build |

## Quality gate

```bash
npm test
npm run typecheck
npm run lint
npm run bdd
npm run build
```

## Hasil akhir

- API: 71 unit/integration test lulus.
- Web: 9 component test lulus.
- BDD: 15 scenario dan 50 step lulus.
- Typecheck: lulus.
- ESLint: lulus.
- Production build API dan Web: lulus.

Build Web memberikan peringatan ukuran chunk untuk visual 3D, tetapi tidak menggagalkan build.
