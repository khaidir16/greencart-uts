# Requirement Traceability Matrix

| Requirement | Proses bisnis | Test case terkait | Jenis test |
|---|---|---|---|
| FR-10 | Tambah produk ke keranjang | ST-CART-01, ST-CART-10 | State transition |
| FR-11 | Ubah jumlah produk | ST-CART-04, ST-CART-11 | State transition |
| FR-12 | Hapus produk | ST-CART-02 | State transition |
| FR-13 | Total keranjang | TDD-QTY-01–09 | Unit/domain |
| FR-14 | Validasi jumlah 1–10 dan stok | WB-QTY-01–06, TDD-QTY-01–09 | White-box/boundary |
| FR-15 | Checkout hanya untuk user login | ST-CART-06, ST-CART-08 | State transition |
| FR-16 | Validasi keranjang saat checkout | ST-CART-03, ST-CART-05, ST-CART-07 | State transition |
| FR-17 | Pesanan baru DRAFT | ST-ORD-01–02 | State transition |
| FR-20 | DRAFT menjadi CONFIRMED | ST-ORD-01, WB-STS-02 | State/white-box |
| FR-21 | CONFIRMED menjadi COMPLETED | ST-ORD-03 | State transition |
| FR-22 | DRAFT/CONFIRMED menjadi CANCELLED | ST-ORD-02, ST-ORD-04 | State transition |
| FR-23 | Tolak transisi ilegal | ST-ORD-05–14, WB-STS-01, WB-STS-03 | State/white-box |

Matrix akan diperluas ketika BDD, UI automation, dan API automation dibuat.
