# GreenCart Project Handoff

Dokumen ini menyimpan status terakhir proyek agar pekerjaan dapat dilanjutkan pada sesi atau akun
lain tanpa bergantung pada riwayat percakapan.

## Status Terakhir

- Source code tersimpan pada repository public:
  `https://github.com/khaidir16/greencart-uts`.
- Branch production: `master`.
- Full-stack production berjalan di Vercel:
  `https://greencart-uts.vercel.app`.
- PostgreSQL production menggunakan Neon.
- Vercel menjalankan React static output dan Express sebagai serverless function.
- Prisma migration dan seed dijalankan melalui build command Vercel.

## Verifikasi Production

Smoke test terakhir berhasil untuk:

- homepage: HTTP 200;
- API health: HTTP 200;
- katalog: 5 produk seed terbaca;
- login customer: HTTP 200;
- login admin: HTTP 200.

Verifikasi lokal terakhir:

- 75 API tests lulus;
- 9 Web component tests lulus;
- TypeScript typecheck lulus;
- production build lulus.

## Environment Production

Vercel memerlukan variabel berikut. Nilainya tidak boleh disimpan di Git:

- `DATABASE_URL`: connection string PostgreSQL Neon;
- `AUTH_SECRET`: secret acak minimal 32 karakter;
- `WEB_ORIGIN`: `https://greencart-uts.vercel.app`.

Frontend menggunakan `/api` pada domain yang sama sehingga `VITE_API_BASE_URL` tidak wajib di
production.

## Catatan Keamanan Wajib

Connection string Neon pernah tampil dalam percakapan saat proses setup. Password role database
harus dirotasi melalui Neon, kemudian nilai `DATABASE_URL` yang baru harus diperbarui di Vercel dan
deployment dijalankan ulang. Jangan menaruh connection string, password, atau token dalam chat,
README, commit, maupun screenshot.

Token Vercel sementara yang pernah dibuat harus dicabut. Deployment berikutnya dapat dilakukan
melalui sesi Vercel CLI yang sudah login atau dari dashboard.

## Melanjutkan Pekerjaan

Pada sesi baru:

1. Clone atau buka repository `khaidir16/greencart-uts`.
2. Baca `README.md`, `docs/DEPLOYMENT.md`, dan dokumen ini.
3. Jalankan `git status` dan `git log -5 --oneline`.
4. Pastikan deployment production masih sehat melalui `/api/health`.
5. Jangan membaca atau menampilkan file `.env` dan nilai environment production.
