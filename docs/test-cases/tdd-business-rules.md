# Test Case TDD GreenCart

## Fungsi 1 — Validasi kuantitas

| ID | Input kuantitas | Stok | Hasil yang diharapkan |
|---|---:|---:|---|
| TDD-QTY-01 | 1 | 10 | Valid |
| TDD-QTY-02 | 10 | 10 | Valid, batas atas |
| TDD-QTY-03 | teks | 10 | `QUANTITY_TYPE` |
| TDD-QTY-04 | NaN | 10 | `QUANTITY_TYPE` |
| TDD-QTY-05 | 1.5 | 10 | `QUANTITY_INTEGER` |
| TDD-QTY-06 | 0 | 10 | `QUANTITY_MIN` |
| TDD-QTY-07 | -1 | 10 | `QUANTITY_MIN` |
| TDD-QTY-08 | 11 | 20 | `QUANTITY_MAX` |
| TDD-QTY-09 | 6 | 5 | `QUANTITY_STOCK` |

## Fungsi 2 — Transisi status pesanan

| ID | Dari | Ke | Hasil yang diharapkan |
|---|---|---|---|
| TDD-STS-01 | DRAFT | CONFIRMED | Valid |
| TDD-STS-02 | DRAFT | CANCELLED | Valid |
| TDD-STS-03 | CONFIRMED | COMPLETED | Valid |
| TDD-STS-04 | CONFIRMED | CANCELLED | Valid |
| TDD-STS-05 | DRAFT | COMPLETED | `INVALID_STATUS_TRANSITION` |
| TDD-STS-06 | COMPLETED | CANCELLED | `INVALID_STATUS_TRANSITION` |
| TDD-STS-07 | CANCELLED | DRAFT | `INVALID_STATUS_TRANSITION` |
| TDD-STS-08 | Status apa pun | Status sama | `STATUS_UNCHANGED` |
