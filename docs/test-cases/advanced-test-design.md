# Advanced Test Design GreenCart

## 1. Pemilihan proses bisnis

| Proses | Kebutuhan | Teknik | Alasan |
|---|---|---|---|
| Perubahan status pesanan | FR-20–FR-23 | State Transition dan White-Box | Memiliki state terminal dan transisi valid/invalid |
| Siklus keranjang dan validasi jumlah | FR-10–FR-16 | State Transition dan White-Box | Memiliki perubahan state dan banyak aturan batas |

## 2. State Transition Testing — Pesanan

### State dan event

| State | Makna |
|---|---|
| DRAFT | Pesanan baru dan belum dikonfirmasi |
| CONFIRMED | Pesanan diterima dan sedang diproses |
| COMPLETED | Pesanan selesai; terminal state |
| CANCELLED | Pesanan dibatalkan; terminal state |

| Event | Makna |
|---|---|
| CONFIRM | Admin mengonfirmasi DRAFT |
| COMPLETE | Admin menyelesaikan CONFIRMED |
| CANCEL | Admin membatalkan DRAFT/CONFIRMED |
| CHANGE/REACTIVATE | Percobaan transisi lain atau mengaktifkan kembali |

### Tabel transisi

| Current | Target | Valid | Expected result | Test ID |
|---|---|---:|---|---|
| DRAFT | CONFIRMED | Ya | `changed: true` | ST-ORD-01 |
| DRAFT | CANCELLED | Ya | `changed: true` | ST-ORD-02 |
| CONFIRMED | COMPLETED | Ya | `changed: true` | ST-ORD-03 |
| CONFIRMED | CANCELLED | Ya | `changed: true` | ST-ORD-04 |
| DRAFT | COMPLETED | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-05 |
| CONFIRMED | DRAFT | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-06 |
| COMPLETED | CANCELLED | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-07 |
| CANCELLED | DRAFT | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-08 |
| CANCELLED | CONFIRMED | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-09 |
| CANCELLED | COMPLETED | Tidak | `INVALID_STATUS_TRANSITION` | ST-ORD-10 |
| Setiap state | State yang sama | Tidak | `STATUS_UNCHANGED` | ST-ORD-11–14 |

Diagram: `docs/diagrams/order-state-transition.md`. Implementasi test otomatis memiliki 14 case.

## 3. State Transition Testing — Keranjang

### State dan event

| State | Makna |
|---|---|
| EMPTY | Belum memiliki item |
| ACTIVE | Memiliki item dan masih dapat berubah |
| VALIDATED | Jumlah dan stok sudah divalidasi |
| ORDERED | Checkout selesai; terminal state |

### Tabel transisi

| Current | Event | Target | Valid | Test ID |
|---|---|---|---:|---|
| EMPTY | ADD_VALID_ITEM | ACTIVE | Ya | ST-CART-01 |
| ACTIVE | REMOVE_LAST_ITEM | EMPTY | Ya | ST-CART-02 |
| ACTIVE | VALIDATE_CART | VALIDATED | Ya | ST-CART-03 |
| VALIDATED | UPDATE_ITEM | ACTIVE | Ya | ST-CART-04 |
| VALIDATED | CHECKOUT | ORDERED | Ya | ST-CART-05 |
| EMPTY | CHECKOUT | EMPTY | Tidak | ST-CART-06 |
| EMPTY | VALIDATE_CART | EMPTY | Tidak | ST-CART-07 |
| ACTIVE | CHECKOUT | ACTIVE | Tidak | ST-CART-08 |
| VALIDATED | ADD_VALID_ITEM | VALIDATED | Tidak | ST-CART-09 |
| ORDERED | ADD_VALID_ITEM | ORDERED | Tidak | ST-CART-10 |
| ORDERED | UPDATE_ITEM | ORDERED | Tidak | ST-CART-11 |
| ORDERED | CHECKOUT | ORDERED | Tidak | ST-CART-12 |

Diagram: `docs/diagrams/cart-state-transition.md`. Implementasi otomatis memiliki 12 case.

## 4. Cyclomatic Complexity — validateCartQuantity

### Perhitungan

- Decision nodes: 5
- `V(G) = jumlah decision + 1 = 5 + 1 = 6`
- Dari CFG: edge `E = 17`, node `N = 13`, connected component `P = 1`
- `V(G) = E - N + 2P = 17 - 13 + 2 = 6`

### Independent path

| Path | Jalur node | Input | Expected | Test ID |
|---|---|---|---|---|
| P1 | 1-2-3-13 | `"dua"`, stok 10 | QUANTITY_TYPE | WB-QTY-01 |
| P2 | 1-2-4-5-13 | `1.5`, stok 10 | QUANTITY_INTEGER | WB-QTY-02 |
| P3 | 1-2-4-6-7-13 | `0`, stok 10 | QUANTITY_MIN | WB-QTY-03 |
| P4 | 1-2-4-6-8-9-13 | `11`, stok 20 | QUANTITY_MAX | WB-QTY-04 |
| P5 | 1-2-4-6-8-10-11-13 | `6`, stok 5 | QUANTITY_STOCK | WB-QTY-05 |
| P6 | 1-2-4-6-8-10-12-13 | `5`, stok 10 | Valid | WB-QTY-06 |

Input `NaN` ditambahkan untuk membuktikan sisi internal kedua pada composite predicate pertama.
Diagram: `docs/diagrams/cfg-validate-cart-quantity.md`.

## 5. Cyclomatic Complexity — transitionOrderStatus

### Perhitungan

- Decision nodes: 2
- `V(G) = jumlah decision + 1 = 2 + 1 = 3`
- Dari CFG: edge `E = 8`, node `N = 7`, connected component `P = 1`
- `V(G) = E - N + 2P = 8 - 7 + 2 = 3`

### Independent path

| Path | Jalur node | Input | Expected | Test ID |
|---|---|---|---|---|
| P1 | 1-2-3-7 | DRAFT → DRAFT | STATUS_UNCHANGED | WB-STS-01 |
| P2 | 1-2-4-5-7 | DRAFT → CONFIRMED | Changed true | WB-STS-02 |
| P3 | 1-2-4-6-7 | COMPLETED → CANCELLED | INVALID_STATUS_TRANSITION | WB-STS-03 |

Diagram: `docs/diagrams/cfg-transition-order-status.md`.

## 6. Hasil pengujian

| Suite | Case | Hasil |
|---|---:|---|
| State transition pesanan | 14 | 14 lulus |
| State transition keranjang | 12 | 12 lulus |
| White-box kuantitas | 11 | 11 lulus |

Eksekusi final pada 2026-07-25 23:39:17 menghasilkan 39 test API lulus dalam empat test
suite, termasuk dua health/API foundation test. Ketiga fungsi domain memperoleh 100% statement,
branch, function, dan line coverage.
