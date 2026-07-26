# Bukti Eksekusi Advanced Test Design

**Waktu:** 2026-07-25 23:39:17  
**Perintah:** `npm run test:coverage --workspace @greencart/api`

```text
PASS transitionCartState.test.ts       12 tests
PASS transitionOrderStatus.test.ts     14 tests
PASS validateCartQuantity.test.ts       11 tests
PASS health.test.ts                      2 tests

Test Files  4 passed (4)
Tests       39 passed (39)
Duration    1.94s
```

## Coverage fungsi domain

| Fungsi | Statement | Branch | Function | Line |
|---|---:|---:|---:|---:|
| `transitionCartState` | 100% | 100% | 100% | 100% |
| `validateCartQuantity` | 100% | 100% | 100% | 100% |
| `transitionOrderStatus` | 100% | 100% | 100% | 100% |

## Analisis

- Seluruh transisi valid menghasilkan target state yang benar.
- Seluruh transisi tidak valid ditolak dan tidak mengubah state asal.
- Terminal state ORDERED, COMPLETED, dan CANCELLED tidak dapat diaktifkan kembali.
- Seluruh independent path dua fungsi white-box telah dieksekusi.
- Tidak ditemukan defect pada aturan domain dalam eksekusi ini.

Coverage global tidak digunakan sebagai indikator untuk bagian ini karena memasukkan seed,
bootstrap server, dan konfigurasi database yang bukan objek Advanced Test Design.
