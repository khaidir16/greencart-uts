# Evidence — Cypress End-to-End Testing

Tanggal eksekusi: 26 Juli 2026  
Browser: Electron 138 headless  
Database: PostgreSQL 17 lokal

## Skenario

| Spec | Skenario | Hasil |
|---|---|---|
| `authentication.cy.ts` | Login dengan password salah ditolak dan pesan error tampil | Lulus |
| `authentication.cy.ts` | Login Admin diarahkan ke dashboard | Lulus |
| `commerce-flow.cy.ts` | Customer checkout kemudian Admin mengubah status ke CONFIRMED | Lulus |

## Cakupan commerce flow

1. Login Customer melalui UI.
2. Membuka katalog dan detail produk.
3. Menambahkan produk ke keranjang.
4. Mengisi data checkout dan membuat pesanan.
5. Membaca nomor pesanan yang dihasilkan sistem.
6. Login Admin melalui UI.
7. Menemukan pesanan tersebut pada tabel Admin.
8. Menjalankan transisi `DRAFT → CONFIRMED`.

Video eksekusi dibuat otomatis pada `cypress/videos/`. Screenshot kegagalan diagnostik dibuat
selama pengembangan test dan direktori artefaknya tidak dimasukkan ke Git.
