# Evidence — Cypress End-to-End Testing

Tanggal eksekusi: 26 Juli 2026  
Browser: Electron 138 headless  
Database: PostgreSQL 17 lokal

## Struktur Page Object Model

| Page Object | Tanggung jawab utama |
|---|---|
| `LoginPage.ts` | Membuka login, mengisi credential, submit, dan memeriksa error |
| `ProductsPage.ts` | Membuka katalog, mencari, membuka detail, dan menambah produk |
| `CartPage.ts` | Membuka/mereset cart, mengubah jumlah, menghapus, dan menuju checkout |
| `CheckoutPage.ts` | Mengisi data penerima, submit, dan memeriksa hasil valid/invalid |

## Skenario

| Spec | Skenario | Hasil |
|---|---|---|
| `authentication.cy.ts` | Password salah ditolak dan pesan error tampil | Lulus |
| `authentication.cy.ts` | Field login kosong menampilkan dua validasi | Lulus |
| `authentication.cy.ts` | Login Customer valid diarahkan ke katalog | Lulus |
| `products.cy.ts` | Daftar produk tampil dan pencarian menemukan Monstera | Lulus |
| `cart.cy.ts` | Produk ditambahkan ke keranjang | Lulus |
| `cart.cy.ts` | Jumlah produk diubah dari satu menjadi dua | Lulus |
| `cart.cy.ts` | Produk dihapus hingga keranjang kosong | Lulus |
| `checkout.cy.ts` | Checkout dengan data penerima tidak valid ditolak | Lulus |
| `checkout.cy.ts` | Checkout dengan data penerima valid membuat nomor pesanan | Lulus |

## Hasil eksekusi

```text
4 specs passed
9 tests passed
0 failed
Duration 37 seconds
```

Seluruh test menggunakan assertion dan data positif/negatif. Setup cart membersihkan item sebelumnya
agar skenario dapat dijalankan berulang. Video setiap spec dibuat otomatis pada `cypress/videos/`.
Screenshot kegagalan diagnostik selama pengembangan tidak dimasukkan ke Git.
