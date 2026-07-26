# Bukti Eksekusi BDD GreenCart

**Framework:** Cucumber-JS  
**Waktu eksekusi:** 2026-07-25 23:45:58  
**Perintah:** `npm run bdd`

## Hasil

```text
15 scenarios (15 passed)
50 steps (50 passed)
0m 0.55s (0m 0.5s executing your code)
```

Laporan mesin tersedia pada `docs/evidence/cucumber-report.json` dengan ukuran sekitar 25 KB.

## Klasifikasi skenario

| Kategori | Contoh |
|---|---|
| Positif | Jumlah 5; DRAFT → CONFIRMED |
| Negatif | Jumlah teks/pecahan; COMPLETED → CANCELLED |
| Boundary | 0, 1, 10, dan 11 |
| Stok | Jumlah 4 ketika stok 3 |
| Perubahan status | Empat transisi valid dan tiga transisi ditolak |
| Scenario Outline | Batas kuantitas dan transisi status valid |

## Analisis

- Seluruh langkah Gherkin terhubung ke step definition; tidak ada undefined atau pending step.
- Step definition memanggil kode domain production, bukan implementasi duplikat.
- Seluruh skenario positif memberikan hasil berhasil.
- Seluruh skenario negatif menghasilkan kode error yang tepat.
- Nilai batas minimum/maksimum dan nilai tepat di luar batas sudah diuji.
- Status terminal COMPLETED dan CANCELLED terbukti menolak transisi ilegal.

Tidak ditemukan defect pada aturan domain selama eksekusi BDD.
