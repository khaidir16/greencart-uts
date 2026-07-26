# Evidence — Dependency Security Audit

Tanggal audit: 26 Juli 2026  
Perintah: `npm audit --json`

## Ringkasan

| Severity | Jumlah |
|---|---:|
| Critical | 0 |
| High | 9 |
| Moderate | 2 |
| Low | 0 |

## Analisis dan keputusan

- Advisory `react-router-dom` mengenai RSC actions; GreenCart adalah SPA Vite tanpa RSC/server actions.
- Advisory Prisma berada pada CLI/tooling development. Saran npm adalah downgrade major Prisma 7 ke 6.
- Advisory coverage hanya berjalan pada tooling test. Perbaikan memerlukan upgrade major yang belum selaras.

`npm audit fix --force` tidak dijalankan karena berisiko breaking change. Risiko diterima sementara:
dependency runtime/development dipisahkan, input divalidasi, endpoint privat memakai JWT/role guard,
dan advisory wajib diperiksa ulang sebelum deployment. Tidak ada vulnerability critical atau jalur
eksploit runtime yang terkonfirmasi pada konfigurasi GreenCart.
