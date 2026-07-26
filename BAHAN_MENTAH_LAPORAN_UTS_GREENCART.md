# BAHAN MENTAH LAPORAN/PRESENTASI UTS GREENCART

> Dokumen sumber sangat lengkap untuk diberikan kepada GPT Plus dan diolah menjadi PPT/PPTX final.
> Struktur BAB I-IX mengikuti bagian **F. Format Laporan** pada soal UTS secara persis.
> Jangan menghapus bagian wajib, jangan mengarang bukti, dan jangan memasukkan credential rahasia.

---

## 0. PETUNJUK UNTUK GPT PLUS YANG AKAN MENYUSUN PPT

Gunakan dokumen ini sebagai sumber fakta utama. Buat laporan dalam bentuk **PowerPoint (PPT/PPTX)**,
bukan makalah Word, karena soal menyatakan laporan proyek berbentuk PowerPoint. Gunakan struktur BAB
I sampai BAB IX di bawah tanpa mengubah urutan. Setiap pembahasan teknis harus disertai bukti berupa
screenshot aplikasi, screenshot source code, tabel, diagram, atau hasil eksekusi test. Jangan
menampilkan password, token, `DATABASE_URL`, isi `.env`, atau credential production.

Ketentuan desain PPT yang disarankan:

- Rasio slide 16:9, latar putih/krem, aksen hijau botani, kontras tinggi.
- Satu gagasan utama per slide; judul 28-34 pt dan isi minimal 18 pt.
- Potongan kode dipilih seperlunya, bukan satu file penuh, dan diberi anotasi fungsi.
- Setiap gambar diberi nomor serta caption, misalnya “Gambar 3.1 Diagram State Pesanan”.
- Setiap tabel diberi nomor serta judul.
- Berikan sumber file lokal/repository pada catatan pembicara atau teks kecil.
- Gunakan tautan aktif website, API health, Swagger, dan repository pada slide awal/akhir.
- Jangan menyatakan otomatisasi UI sudah memenuhi 8 test/POM sebelum gap pada Bagian 12 diselesaikan.

Format nama berkas sesuai soal:

`Kelas_NamaKelompok_Nama_NIM.pptx`

Tugas diunggah setiap anggota secara individu berupa PPT/PPTX dan source code ZIP. Tugas tidak
dipresentasikan, sehingga setiap slide harus dapat dipahami dosen tanpa penjelasan lisan.

---

## 1. IDENTITAS PROYEK DAN KELOMPOK

### 1.1 Identitas akademik

| Item | Isi |
|---|---|
| Mata kuliah | Advanced Software Testing and Quality Assurance |
| Jenis tugas | Ujian Tengah Semester (UTS) |
| Semester/Kelas | Semester VI, RPL A/RPL B - **pilih kelas yang benar** |
| Tahun ajaran | 2025-2026 |
| Institusi | Universitas Muhammadiyah Makassar |
| Fakultas | Fakultas Teknik |
| Program studi | Informatika |
| Dosen | **ISI NAMA DOSEN SESUAI KELAS** |
| Nama kelompok | **ISI NAMA KELOMPOK** |

### 1.2 Anggota dan pembagian tugas

| Nama | NIM | Kontribusi utama |
|---|---|---|
| Muh Yahya Al Qadri | 105841120523 | Pengembangan frontend, integrasi antarmuka, dan implementasi fitur aplikasi |
| Muh. Khaidir Nur | 105841119323 | Backend, database, REST API, autentikasi, dan integrasi sistem |
| Nursyahlan Ruslan | 105841118823 | Test case, pengujian fungsional, BDD, dan quality assurance |
| Mustapiah | 105841120423 | Dokumentasi, bukti pengujian, laporan, dan materi presentasi |

Catatan: pembagian di atas merupakan fokus utama. Jelaskan bahwa seluruh anggota tetap berpartisipasi
dalam pengembangan, pengujian, pemeriksaan hasil, dan penyusunan laporan.

### 1.3 Tautan proyek

| Sumber | URL |
|---|---|
| Website production | https://greencart-uts.vercel.app |
| API health | https://greencart-uts.vercel.app/api/health |
| Swagger UI | https://greencart-uts.vercel.app/api/docs |
| Repository public | https://github.com/khaidir16/greencart-uts |

---

# BAB I PENDAHULUAN

## 1.1 Latar Belakang

Transformasi digital mendorong kegiatan perdagangan untuk beralih dari proses konvensional ke
aplikasi web. Pada bisnis tanaman dan perlengkapan berkebun, pelanggan membutuhkan informasi produk,
harga, stok, kategori, serta panduan perawatan yang konsisten. Pelanggan juga memerlukan proses
pemesanan yang mudah, mulai dari pencarian produk, pengelolaan keranjang, checkout, hingga pemantauan
status pesanan. Di sisi pengelola, data produk, stok, pesanan, dan perubahan status harus dapat
dikelola secara akurat.

Keberadaan fitur saja belum menjamin kualitas aplikasi. Kesalahan pada jumlah pembelian, validasi
stok, data penerima, perhitungan total, autentikasi, atau perubahan status pesanan dapat menimbulkan
data yang tidak konsisten dan pengalaman pengguna yang buruk. Karena itu, pengujian perangkat lunak
perlu diterapkan sejak analisis kebutuhan sampai aplikasi siap digunakan. Pengujian terstruktur
membantu menemukan defect lebih awal, memastikan implementasi sesuai kebutuhan, dan memberikan bukti
objektif bahwa aturan bisnis berjalan sebagaimana mestinya.

Proyek ini mengembangkan **GreenCart**, aplikasi web toko tanaman dan perlengkapan berkebun. Proyek
tidak hanya menghasilkan frontend dan RESTful API, tetapi juga menerapkan State Transition Testing,
Cyclomatic Complexity, Test-Driven Development (TDD), Behavior-Driven Development (BDD), pengujian
UI dengan Cypress, pengujian API dengan Supertest, serta analisis defect dan evaluasi kualitas.
Dengan pendekatan tersebut, requirement, implementasi, test case, hasil eksekusi, dan defect dapat
ditelusuri secara sistematis.

## 1.2 Rumusan Masalah

1. Bagaimana membangun aplikasi toko tanaman yang menyediakan login, katalog, detail produk,
   keranjang, checkout, riwayat pesanan, dan pengelolaan oleh Admin?
2. Bagaimana memastikan jumlah pembelian hanya berupa bilangan bulat 1-10 dan tidak melebihi stok?
3. Bagaimana memastikan checkout hanya terjadi ketika pengguna, keranjang, stok, dan data penerima
   valid?
4. Bagaimana memastikan perubahan status DRAFT, CONFIRMED, COMPLETED, dan CANCELLED mengikuti aturan?
5. Bagaimana merancang black-box dan white-box test yang dapat ditelusuri ke kebutuhan fungsional?
6. Bagaimana menerapkan siklus Red-Green-Refactor pada aturan bisnis utama?
7. Bagaimana menerjemahkan perilaku bisnis ke Gherkin dan menjalankannya dengan Cucumber-JS?
8. Bagaimana mengotomatisasi validasi UI dan RESTful API secara berulang?
9. Bagaimana mencatat defect, menganalisis penyebab, memperbaiki, dan melakukan retest?

## 1.3 Tujuan Proyek

1. Menghasilkan aplikasi GreenCart full-stack yang dapat dijalankan secara lokal dan online.
2. Menerapkan autentikasi serta otorisasi Guest, Customer, dan Admin.
3. Memvalidasi katalog, keranjang, checkout, stok, pesanan, dan perubahan status.
4. Merancang State Transition Testing untuk siklus keranjang dan status pesanan.
5. Menghitung Cyclomatic Complexity dan menguji independent path dua fungsi bercabang.
6. Mengembangkan dua fungsi bisnis melalui siklus TDD Red-Green-Refactor.
7. Menulis minimal dua feature BDD dengan skenario positif, negatif, batas, dan perubahan status.
8. Mengotomatisasi pengujian UI dan API menggunakan framework yang sesuai.
9. Membuat Requirement Traceability Matrix dan bukti hasil eksekusi.
10. Menganalisis defect dan mengevaluasi kualitas serta keterbatasan aplikasi.

## 1.4 Batasan Proyek

Ruang lingkup mencakup login, hak akses, katalog, pencarian/filter/sort, detail produk, keranjang,
checkout, riwayat dan detail pesanan, CRUD produk Admin, dashboard Admin, status pesanan, PostgreSQL,
REST API, Swagger, TDD, BDD, advanced test design, UI automation, dan API automation.

Batasan implementasi:

- Pembayaran hanya simulasi; tidak terhubung payment gateway.
- Ongkos kirim tidak dihitung dari API ekspedisi nyata.
- Tidak mendukung marketplace banyak penjual, chat, ulasan, notifikasi eksternal, login sosial,
  atau pemulihan password melalui email.
- Akun demo digunakan hanya untuk development/demonstrasi UTS.
- Pengujian UI terakhir hanya pada Electron headless dan PostgreSQL lokal; cross-browser dan mobile
  device farm belum dilakukan.
- Model 3D memiliki fallback; optimasi chunk 3D masih menjadi ruang pengembangan.

**Bukti yang dipasang pada BAB I:** screenshot homepage production, logo GreenCart, URL aplikasi,
dan ringkasan arsitektur.

---

# BAB II ANALISIS DAN PERANCANGAN APLIKASI

## 2.1 Deskripsi Aplikasi

GreenCart adalah aplikasi botanical commerce berbasis web yang menghubungkan katalog tanaman,
transaksi pelanggan, dan pengelolaan Admin. Guest dapat menjelajahi produk. Customer dapat login,
menambah atau memperbarui isi keranjang, checkout, dan melihat riwayat pesanan. Admin dapat mengelola
produk, melihat dashboard, mengakses seluruh pesanan, dan mengubah status sesuai workflow.

Arsitektur aplikasi berupa monorepo:

`React/Vite -> Express REST API -> Prisma ORM -> PostgreSQL`

Frontend mengirim request JSON ke API. Express melakukan validasi Zod, autentikasi JWT, dan pemeriksaan
role. Service menjalankan aturan bisnis. Repository memisahkan akses in-memory untuk test dan Prisma
untuk production. PostgreSQL menyimpan data relasional. Production berjalan full-stack pada Vercel
dengan database Neon PostgreSQL.

Teknologi:

| Bagian | Teknologi |
|---|---|
| Frontend | React 19, Vite, TypeScript, React Router, Zustand, TanStack Query |
| UI | Tailwind CSS, Framer Motion, React Three Fiber, Drei, Recharts |
| Backend | Node.js, Express 5, TypeScript, Zod, JOSE/JWT, bcrypt |
| Database | PostgreSQL, Prisma ORM |
| Unit/integration | Vitest, Testing Library, Supertest |
| BDD | Cucumber-JS dan Gherkin |
| UI E2E | Cypress |
| Dokumentasi API | OpenAPI 3.1 dan Swagger UI |

## 2.2 Permasalahan yang Diselesaikan

1. Informasi tanaman, stok, dan perawatan yang tersebar disatukan dalam katalog.
2. Pelanggan memperoleh proses pemesanan yang tervalidasi dan dapat dilacak.
3. Admin memperoleh sarana pengelolaan produk, stok, pesanan, dan status.
4. Aturan jumlah dan stok mencegah pembelian nol, negatif, pecahan, teks, lebih dari 10, atau lebih
   besar daripada stok.
5. State machine pesanan mencegah pembatalan order selesai dan reaktivasi order batal.
6. Otomatisasi pengujian membuat verifikasi dapat diulang dan menghasilkan evidence.

## 2.3 Aktor dan Hak Akses

| Aktor | Hak akses |
|---|---|
| Guest | Homepage, katalog, pencarian/filter, detail produk, halaman login |
| Customer | Semua akses Guest; kelola keranjang; checkout; riwayat/detail pesanan; logout |
| Admin | Login dashboard; CRUD produk; daftar/detail semua pesanan; ubah status; statistik |

Endpoint privat menggunakan Bearer JWT. Mutasi produk dan pengelolaan seluruh pesanan memerlukan role
ADMIN. Password disimpan sebagai bcrypt hash dan tidak pernah dikembalikan pada response.

## 2.4 Kebutuhan Fungsional

| ID | Kebutuhan fungsional |
|---|---|
| FR-01 | Menampilkan homepage dan hero tanaman 3D/fallback. |
| FR-02 | Login menggunakan email/username dan password. |
| FR-03 | Menolak credential salah atau field kosong dengan pesan tepat. |
| FR-04 | Membedakan akses Guest, Customer, dan Admin. |
| FR-05 | Menampilkan produk: nama, harga, stok, kategori, dan deskripsi. |
| FR-06 | Mencari, memfilter, mengurutkan, dan membuka detail produk. |
| FR-07 | Admin menambahkan produk valid. |
| FR-08 | Admin memperbarui produk. |
| FR-09 | Admin menghapus produk sesuai integritas data. |
| FR-10 | Customer menambah produk berjumlah valid ke keranjang. |
| FR-11 | Customer mengubah jumlah item. |
| FR-12 | Customer menghapus item. |
| FR-13 | Sistem menghitung subtotal dan total otomatis. |
| FR-14 | Jumlah harus integer 1-10 dan tidak melebihi stok. |
| FR-15 | Hanya Customer login dapat checkout. |
| FR-16 | Checkout memvalidasi keranjang, stok, nama, alamat, dan telepon. |
| FR-17 | Checkout membuat nomor unik dan status awal DRAFT. |
| FR-18 | Pesanan menyimpan snapshot produk, harga, jumlah, total, dan penerima. |
| FR-19 | Customer melihat riwayat, detail, dan timeline pesanan sendiri. |
| FR-20 | Admin mengubah DRAFT menjadi CONFIRMED. |
| FR-21 | Admin mengubah CONFIRMED menjadi COMPLETED. |
| FR-22 | Admin mengubah DRAFT/CONFIRMED menjadi CANCELLED. |
| FR-23 | Menolak pembatalan COMPLETED dan reaktivasi CANCELLED. |
| FR-24 | REST API memberikan status, body, dan error konsisten. |
| FR-25 | Dashboard menampilkan statistik produk, stok, dan pesanan. |
| FR-26 | Pengguna logout dan sesi lokal dihentikan. |

## 2.5 Kebutuhan Nonfungsional

| ID | Kebutuhan nonfungsional |
|---|---|
| NFR-01 | UI responsif desktop, tablet, dan ponsel. |
| NFR-02 | Fitur utama tetap dapat digunakan jika WebGL/model 3D gagal. |
| NFR-03 | Menghormati `prefers-reduced-motion`. |
| NFR-04 | Form memiliki label, error, fokus keyboard, dan kontras memadai. |
| NFR-05 | Password di-hash; endpoint privat memakai autentikasi/otorisasi. |
| NFR-06 | Input divalidasi di frontend dan backend. |
| NFR-07 | Response dan format error API konsisten dalam JSON. |
| NFR-08 | Test dapat diulang dengan data terisolasi/resettable. |
| NFR-09 | Interaksi penting memiliki selector stabil. |
| NFR-10 | Daftar produk ditargetkan tampil maksimal 3 detik pada koneksi wajar. |
| NFR-11 | API utama ditargetkan merespons di bawah 2 detik pada test normal. |
| NFR-12 | TypeScript, lint, format, dan separation of concerns. |
| NFR-13 | Aset gambar/3D dioptimalkan dan dimuat secara tepat. |
| NFR-14 | Loading, empty, success, dan error state terlihat jelas. |

## 2.6 Aturan Bisnis

### Autentikasi

- Identity dan password wajib.
- Credential salah menghasilkan pesan umum agar keberadaan akun tidak bocor.
- Endpoint Admin hanya dapat diakses role ADMIN.
- Customer harus login sebelum checkout atau melihat pesanan privat.

### Produk

- Nama dan deskripsi wajib; harga lebih dari nol; stok integer nonnegatif.
- Kategori, care level, cahaya, dan frekuensi penyiraman harus valid.
- `PATCH` kosong ditolak.
- Snapshot order lama tidak berubah ketika produk diperbarui/dihapus.

### Keranjang dan checkout

- Kuantitas harus angka finite, integer, minimal 1, maksimal 10, dan <= stok.
- Produk sama digabung selama jumlah akhir valid.
- Total adalah jumlah `harga x kuantitas` seluruh item.
- Checkout memerlukan sesi Customer, cart tidak kosong, stok cukup, serta nama, telepon, alamat valid.
- Order, pengurangan stok, riwayat status awal, dan pembersihan cart dilakukan atomik/transaksional.
- Pesanan baru selalu DRAFT dan memiliki nomor unik.

### Status pesanan

| Dari | Ke | Hasil |
|---|---|---|
| DRAFT | CONFIRMED | Diizinkan |
| DRAFT | CANCELLED | Diizinkan |
| CONFIRMED | COMPLETED | Diizinkan |
| CONFIRMED | CANCELLED | Diizinkan |
| COMPLETED | status lain | Ditolak, 409 |
| CANCELLED | status lain | Ditolak, 409 |
| Status sama | Status sama | Ditolak (`STATUS_UNCHANGED`) |

## 2.7 Alur Penggunaan Aplikasi

Alur Customer:

1. Guest membuka homepage/katalog.
2. Pengguna mencari atau membuka detail produk.
3. Pengguna login sebagai Customer.
4. Customer menambah item valid dan meninjau cart.
5. Customer memperbarui/menghapus item bila perlu.
6. Customer mengisi nama, telepon, dan alamat checkout.
7. Server memvalidasi ulang cart dan stok.
8. Sistem membuat order DRAFT, mengurangi stok, menyimpan snapshot, dan mengosongkan cart.
9. Customer melihat nomor, detail, dan timeline order.

Alur Admin:

1. Admin login dan diarahkan ke dashboard.
2. Admin mengelola produk melalui form tervalidasi.
3. Admin membuka daftar/detail pesanan.
4. Admin memilih status tujuan.
5. Server menerima transisi valid atau menolak transisi ilegal dengan 409.

## 2.8 Rancangan Antarmuka

| Route | Halaman/fungsi |
|---|---|
| `/` | Homepage, hero botani, kategori, produk unggulan, CTA |
| `/login` | Form identity/password dan validasi |
| `/products` | Katalog, search, filter, sort, pagination |
| `/products/:slug` | Detail produk, perawatan, jumlah, tambah cart |
| `/cart` | Item, quantity, hapus, subtotal, total, empty state |
| `/checkout` | Data penerima, review, konfirmasi |
| `/profile/orders` | Riwayat order Customer |
| `/orders/:orderNumber` | Detail dan timeline order |
| `/admin` | Statistik operasional |
| `/admin/products` | Tabel CRUD produk |
| `/admin/products/new` | Form produk baru |
| `/admin/products/:id/edit` | Form edit produk |
| `/admin/orders` | Tabel/filter order |
| `/admin/orders/:id` | Detail dan perubahan status |
| `/*` | Not found |

Screenshot wajib: login, katalog, detail, cart, checkout valid/error, order berhasil, riwayat, dashboard,
CRUD produk, daftar order, dan perubahan status.

## 2.9 Rancangan Data

Entitas utama: User, Category, Product, Cart, CartItem, Order, OrderItem, dan OrderStatusHistory.
Relasi: satu User memiliki maksimal satu Cart dan banyak Order; Category memiliki banyak Product;
Cart memiliki banyak CartItem; Order memiliki banyak OrderItem dan OrderStatusHistory. OrderItem
menyimpan snapshot nama dan harga agar histori transaksi stabil.

Ringkasan atribut:

| Entitas | Atribut penting |
|---|---|
| User | id, email, username, passwordHash, name, role, timestamps |
| Category | id, name, slug, description |
| Product | id, name, slug, description, price, stock, imageUrl, categoryId, care fields, isActive |
| Cart | id, userId, timestamps |
| CartItem | id, cartId, productId, quantity; unik cartId+productId |
| Order | id, orderNumber, userId, recipientName, phone, address, totalAmount, status |
| OrderItem | orderId, nullable productId, productName, unitPrice, quantity, subtotal |
| OrderStatusHistory | orderId, fromStatus, toStatus, changedById, note, createdAt |

Sumber diagram: `docs/diagrams/greencart-erd.md`.

## 2.10 Rancangan RESTful API

Semua response sukses mengikuti konsep `{ success, message, data }`; error menggunakan
`{ success: false, message, errors? }`.

| Method | Endpoint | Akses | Fungsi/status utama |
|---|---|---|---|
| GET | `/api/health` | Public | Health, 200 |
| POST | `/api/auth/login` | Public | Login, 200/401/422 |
| GET | `/api/auth/me` | Login | Profil, 200/401 |
| POST | `/api/auth/logout` | Login | Logout, 204 |
| GET | `/api/products` | Public | List/search/filter/sort/page, 200 |
| GET | `/api/products/:id` | Public | Detail, 200/404/422 |
| POST | `/api/products` | Admin | Create, 201/403/422 |
| PATCH | `/api/products/:id` | Admin | Update, 200/404/422 |
| DELETE | `/api/products/:id` | Admin | Delete, 204/404/409 |
| GET | `/api/cart` | Customer | Cart, 200/401 |
| POST | `/api/cart/items` | Customer | Add item, 201/409/422 |
| PATCH | `/api/cart/items/:itemId` | Customer | Update quantity, 200 |
| DELETE | `/api/cart/items/:itemId` | Customer | Remove, 200 |
| POST | `/api/orders` | Customer | Checkout, 201/409/422 |
| GET | `/api/orders` | Customer | Riwayat, 200 |
| GET | `/api/orders/number/:orderNumber` | Customer | Detail, 200/404 |
| GET | `/api/admin/orders` | Admin | Semua order, 200/403 |
| GET | `/api/admin/orders/:id` | Admin | Detail order, 200/404 |
| PATCH | `/api/admin/orders/:id/status` | Admin | Transisi, 200/409 |

Method pembaruan dipilih **PATCH** dan digunakan konsisten. Dokumentasi lengkap berada pada Swagger.

---

# BAB III ADVANCED TEST DESIGN

## 3.1 Pemilihan Proses Bisnis

| Objek | Requirement | Teknik | Alasan |
|---|---|---|---|
| Perubahan status pesanan | FR-20-FR-23 | State Transition + White-Box | Memiliki state terminal dan transisi valid/invalid |
| Siklus cart & validasi jumlah | FR-10-FR-16 | State Transition + White-Box | Memiliki state, event, boundary, dan banyak cabang |

## 3.2 State Transition Testing

### 3.2.1 Pesanan

State: DRAFT (baru), CONFIRMED (diproses), COMPLETED (terminal), CANCELLED (terminal).
Event: CONFIRM, COMPLETE, CANCEL, CHANGE/REACTIVATE.

| ID | Current | Target | Valid | Expected |
|---|---|---|---|---|
| ST-ORD-01 | DRAFT | CONFIRMED | Ya | changed true |
| ST-ORD-02 | DRAFT | CANCELLED | Ya | changed true |
| ST-ORD-03 | CONFIRMED | COMPLETED | Ya | changed true |
| ST-ORD-04 | CONFIRMED | CANCELLED | Ya | changed true |
| ST-ORD-05 | DRAFT | COMPLETED | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-06 | CONFIRMED | DRAFT | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-07 | COMPLETED | CANCELLED | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-08 | CANCELLED | DRAFT | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-09 | CANCELLED | CONFIRMED | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-10 | CANCELLED | COMPLETED | Tidak | INVALID_STATUS_TRANSITION |
| ST-ORD-11-14 | setiap state | state yang sama | Tidak | STATUS_UNCHANGED |

Diagram tersedia di `docs/diagrams/order-state-transition.md`. Hasil: 14/14 test lulus.

### 3.2.2 Keranjang

State: EMPTY, ACTIVE, VALIDATED, ORDERED. ORDERED adalah terminal. Perubahan setelah VALIDATED
mengembalikan cart ke ACTIVE supaya validasi dijalankan ulang.

| ID | Current | Event | Target | Valid |
|---|---|---|---|---|
| ST-CART-01 | EMPTY | ADD_VALID_ITEM | ACTIVE | Ya |
| ST-CART-02 | ACTIVE | REMOVE_LAST_ITEM | EMPTY | Ya |
| ST-CART-03 | ACTIVE | VALIDATE_CART | VALIDATED | Ya |
| ST-CART-04 | VALIDATED | UPDATE_ITEM | ACTIVE | Ya |
| ST-CART-05 | VALIDATED | CHECKOUT | ORDERED | Ya |
| ST-CART-06 | EMPTY | CHECKOUT | EMPTY | Tidak |
| ST-CART-07 | EMPTY | VALIDATE_CART | EMPTY | Tidak |
| ST-CART-08 | ACTIVE | CHECKOUT | ACTIVE | Tidak |
| ST-CART-09 | VALIDATED | ADD_VALID_ITEM | VALIDATED | Tidak |
| ST-CART-10 | ORDERED | ADD_VALID_ITEM | ORDERED | Tidak |
| ST-CART-11 | ORDERED | UPDATE_ITEM | ORDERED | Tidak |
| ST-CART-12 | ORDERED | CHECKOUT | ORDERED | Tidak |

Diagram tersedia di `docs/diagrams/cart-state-transition.md`. Hasil: 12/12 test lulus.

Analisis: seluruh transisi valid menghasilkan target tepat, transisi ilegal mempertahankan state
awal, dan terminal state tidak dapat diaktifkan kembali.

## 3.3 White-Box Testing dan Cyclomatic Complexity

### 3.3.1 Fungsi `validateCartQuantity`

Fungsi memeriksa: tipe/finite, integer, minimum, maksimum, lalu stok. Potongan kode sumber berada di
`apps/api/src/modules/cart/domain/validateCartQuantity.ts`.

Jumlah decision node = 5. Maka:

`V(G) = decision + 1 = 5 + 1 = 6`

Dari CFG: `E=17`, `N=13`, `P=1`, sehingga `V(G)=E-N+2P=17-13+2=6`.

| Path | Jalur | Input | Expected |
|---|---|---|---|
| P1 | 1-2-3-13 | "dua", stock 10 | QUANTITY_TYPE |
| P2 | 1-2-4-5-13 | 1.5, stock 10 | QUANTITY_INTEGER |
| P3 | 1-2-4-6-7-13 | 0, stock 10 | QUANTITY_MIN |
| P4 | 1-2-4-6-8-9-13 | 11, stock 20 | QUANTITY_MAX |
| P5 | 1-2-4-6-8-10-11-13 | 6, stock 5 | QUANTITY_STOCK |
| P6 | 1-2-4-6-8-10-12-13 | 5, stock 10 | Valid |

Input NaN ditambahkan untuk menguji cabang internal composite predicate. CFG berada di
`docs/diagrams/cfg-validate-cart-quantity.md`.

### 3.3.2 Fungsi `transitionOrderStatus`

Fungsi memeriksa status sama, lalu lookup transition map. Source:
`apps/api/src/modules/order/domain/transitionOrderStatus.ts`.

Decision node = 2. `V(G)=2+1=3`. Dari CFG: `E=8`, `N=7`, `P=1`, sehingga
`V(G)=8-7+2=3`.

| Path | Jalur | Input | Expected |
|---|---|---|---|
| P1 | 1-2-3-7 | DRAFT -> DRAFT | STATUS_UNCHANGED |
| P2 | 1-2-4-5-7 | DRAFT -> CONFIRMED | changed true |
| P3 | 1-2-4-6-7 | COMPLETED -> CANCELLED | INVALID_STATUS_TRANSITION |

CFG: `docs/diagrams/cfg-transition-order-status.md`.

### 3.3.3 Hasil dan coverage

Eksekusi 25 Juli 2026 pukul 23:39:17:

```text
PASS transitionCartState.test.ts       12 tests
PASS transitionOrderStatus.test.ts     14 tests
PASS validateCartQuantity.test.ts      11 tests
PASS health.test.ts                     2 tests
Test Files 4 passed (4)
Tests 39 passed (39)
Duration 1.94s
```

Ketiga fungsi domain mencapai 100% statements, branches, functions, dan lines. Coverage global tidak
dijadikan indikator bagian ini karena ikut menghitung bootstrap, seed, dan konfigurasi database yang
bukan objek analisis advanced test design.

## 3.4 Traceability Kebutuhan dan Test Case

| Requirement | Test terkait | Jenis |
|---|---|---|
| FR-02-FR-04 | API-AUTH-01-08; UI login | API/UI |
| FR-05-FR-06 | API-PROD-01-05; component product | API/component |
| FR-07-FR-09 | API-PROD-06-14 | API integration |
| FR-10 | ST-CART-01/10; BDD valid quantity | State/BDD |
| FR-11 | ST-CART-04/11; cart route update | State/API |
| FR-12 | ST-CART-02; cart route delete | State/API |
| FR-13 | TDD quantity; cart totals | Unit/API |
| FR-14 | WB-QTY-01-06; TDD-QTY-01-09; BDD boundary | White-box/TDD/BDD |
| FR-15-FR-16 | ST-CART-03/05/06/07/08; order API | State/API |
| FR-17-FR-18 | order API creation/snapshot | API integration |
| FR-19 | order detail/history API and UI | API/UI |
| FR-20 | ST-ORD-01; WB-STS-02; BDD | State/white-box/BDD |
| FR-21 | ST-ORD-03; BDD | State/BDD |
| FR-22 | ST-ORD-02/04; BDD | State/BDD |
| FR-23 | ST-ORD-05-14; WB-STS-01/03; BDD negative | State/white-box/BDD |
| FR-24 | Seluruh API route tests | API |

---

# BAB IV IMPLEMENTASI TEST-DRIVEN DEVELOPMENT

## 4.1 Implementasi TDD

Dua fungsi dipilih karena keduanya merupakan aturan bisnis murni, kritis, dan memiliki banyak kondisi:

1. `validateCartQuantity(quantity, stock)` untuk kuantitas 1-10 dan stok.
2. `transitionOrderStatus(current, target)` untuk workflow pesanan.

Test case quantity terdiri dari valid 1/10, teks, NaN, pecahan, 0, -1, 11, dan melebihi stok.
Status mencakup empat transisi valid, DRAFT->COMPLETED, COMPLETED->CANCELLED,
CANCELLED->DRAFT, dan unchanged.

## 4.2 Tahap Red

Unit test ditulis sebelum implementasi. Eksekusi 25 Juli 2026 pukul 23:29:31 gagal karena kedua
module implementasi belum tersedia:

```text
Test Files 2 failed (2)
FAIL validateCartQuantity.test.ts
Error: Cannot find module './validateCartQuantity.js'
FAIL transitionOrderStatus.test.ts
Error: Cannot find module './transitionOrderStatus.js'
```

Makna: kegagalan sesuai harapan, test benar-benar mendahului production code. Screenshot log dan
source unit test wajib ditampilkan. Sumber evidence: `docs/evidence/tdd-red.md`.

## 4.3 Tahap Green

Implementasi minimum dibuat dengan rangkaian kondisi langsung. Belum digunakan constants, typed error
factory, atau transition map. Hasil pukul 23:31:21:

```text
PASS transitionOrderStatus.test.ts (14 tests)
PASS validateCartQuantity.test.ts (11 tests)
Test Files 2 passed (2)
Tests 25 passed (25)
Duration 634ms
```

Makna: perilaku wajib telah terpenuhi oleh implementasi minimum. Sumber:
`docs/evidence/tdd-green.md` dan commit `84cdb3b` untuk kode Green.

## 4.4 Tahap Refactor

Perubahan quantity:

- angka 1 dan 10 dipusatkan pada immutable `CART_QUANTITY_LIMIT`;
- kode error memakai union type `CartQuantityErrorCode`;
- pesan dipusatkan dalam `errorMessages`;
- hasil gagal dibuat melalui helper `invalidQuantity`.

Perubahan status:

- kondisi gabungan dipindahkan ke `VALID_ORDER_TRANSITIONS`;
- status terminal terlihat eksplisit melalui array kosong;
- fungsi hanya melakukan pemeriksaan unchanged dan lookup map.

Semua 25 test tetap lulus dan kedua fungsi mencapai 100% coverage. Refactor tidak mengubah observable
behavior tetapi meningkatkan readability, type safety, auditability, dan maintainability. Tampilkan
perbandingan kode Green vs Refactor dan log test. Sumber: `docs/evidence/tdd-refactor.md`.

## 4.5 Hasil Eksekusi TDD

| Tahap | Hasil | Interpretasi |
|---|---|---|
| Red | 2 suite gagal karena module belum ada | Test mendahului implementasi |
| Green | 25/25 test lulus | Implementasi minimum memenuhi spesifikasi |
| Refactor | 25/25 lulus; target 100% coverage | Struktur membaik tanpa regresi |

---

# BAB V IMPLEMENTASI BEHAVIOR-DRIVEN DEVELOPMENT

## 5.1 Implementasi BDD

BDD menerjemahkan aturan kuantitas dan status ke bahasa Gherkin yang dapat dibaca developer, tester,
dan stakeholder. Framework yang digunakan Cucumber-JS dengan TypeScript/tsx. Step definition
memanggil fungsi production yang sama, bukan menyalin logika.

## 5.2 File Feature dan Skenario

| Ketentuan soal | Implementasi |
|---|---|
| Minimal 2 feature | `cart-quantity.feature`, `order-status.feature` |
| Minimal 5 skenario | 9 definisi, 15 instance setelah Examples |
| Scenario Outline | Boundary quantity dan valid status transitions |
| Positif | quantity 5; empat transisi valid |
| Minimal 2 negatif | teks, pecahan, stok, completed cancellation, cancelled reactivation |
| Boundary | 0, 1, 10, 11 |
| Perubahan status | DRAFT/CONFIRMED/COMPLETED/CANCELLED |

Feature cart memuat valid 5, teks, pecahan, boundary outline, dan melebihi stok. Feature order memuat
empat transisi valid melalui outline, penolakan pembatalan COMPLETED, reaktivasi CANCELLED, dan status
yang sama. Tampilkan isi lengkap kedua feature dari folder `features/`.

## 5.3 Step Definition

File `features/step-definitions/greencart.steps.ts`:

- `Given product stock...` menyimpan stok pada custom World.
- `When customer validates...` memanggil `validateCartQuantity`.
- `Then...` menggunakan `node:assert/strict` untuk result/code.
- Given/When/Then status memanggil `transitionOrderStatus` dan memastikan status tetap jika gagal.
- Helper `asOrderStatus` menolak status yang tidak dikenal.

## 5.4 Hasil Eksekusi BDD

Eksekusi 25 Juli 2026 pukul 23:45:58 dengan `npm run bdd`:

```text
15 scenarios (15 passed)
50 steps (50 passed)
0m 0.55s (0m 0.5s executing your code)
```

Tidak ada undefined/pending step. Seluruh positive, negative, boundary, stock, dan status scenario
lulus. Laporan mesin: `docs/evidence/cucumber-report.json`. Evidence manusia:
`docs/evidence/bdd-execution-result.md`.

---

# BAB VI OTOMATISASI PENGUJIAN UI

## 6.1 Tools dan Framework

Cypress 15.19, TypeScript, Electron 138 headless, React frontend, PostgreSQL 17 lokal. Selector
`data-testid`, role, label, dan visible text dipakai untuk assertion dan interaksi.

## 6.2 Struktur Proyek UI Saat Ini

```text
cypress/
  e2e/
    authentication.cy.ts
    products.cy.ts
    cart.cy.ts
    checkout.cy.ts
  pages/
    LoginPage.ts
    ProductsPage.ts
    CartPage.ts
    CheckoutPage.ts
  support/
    e2e.ts
  tsconfig.json
cypress.config.ts
```

## 6.3 Penerapan Page Object Model

Implementasi memenuhi empat Page Object minimal yang dipersyaratkan:

```text
cypress/pages/LoginPage.ts
cypress/pages/ProductsPage.ts
cypress/pages/CartPage.ts
cypress/pages/CheckoutPage.ts
```

Page Object membungkus navigasi, selector, action, dan assertion halaman yang dapat digunakan ulang.
Test script hanya menyusun alur skenario sehingga selector tidak diduplikasi di setiap spec.

## 6.4 Data Pengujian

Data demo development:

- Admin: username `admin`, password demo development.
- Customer: username `customer`, password demo development.
- Invalid credential: customer dengan password salah.
- Checkout valid: nomor telepon format valid dan alamat minimal sesuai schema.
- Checkout invalid: nama/telepon/alamat kosong atau terlalu pendek.

Jangan tampilkan credential production. Lebih baik simpan data terstruktur pada fixture.

## 6.5 Skenario Pengujian UI

Soal mewajibkan minimal delapan. Implementasi memiliki sembilan test mandiri:

| ID | Skenario wajib | Status aktual |
|---|---|---|
| UI-01 | Login valid | Lulus |
| UI-02 | Login invalid | Lulus |
| UI-03 | Field login kosong | Lulus |
| UI-04 | Menampilkan daftar dan mencari produk | Lulus |
| UI-05 | Menambah produk ke cart | Lulus |
| UI-06 | Mengubah quantity cart | Lulus |
| UI-07 | Menghapus item cart | Lulus |
| UI-08 | Checkout valid | Lulus |
| UI-09 | Checkout invalid/tidak lengkap | Lulus |

Setiap skenario memakai assertion. Setup cart menghapus item lama sehingga pengujian dapat dijalankan
berulang pada database lokal yang sama.

## 6.6 Implementasi Otomatisasi UI Saat Ini

Sembilan test dibagi dalam empat spec:

1. Authentication: invalid credential, field kosong, dan login Customer valid.
2. Products: daftar produk dan pencarian.
3. Cart: add, update quantity, dan delete.
4. Checkout: data tidak valid ditolak dan data valid membuat pesanan.

Keempat Page Object memisahkan selector/action dari test script dan dipakai lintas spec.

## 6.7 Hasil Eksekusi UI

Evidence 26 Juli 2026:

| Spec | Test | Hasil |
|---|---|---|
| authentication | 3 | 3 lulus |
| products | 1 | 1 lulus |
| cart | 3 | 3 lulus |
| checkout | 2 | 2 lulus |

Browser Electron 138 headless, database PostgreSQL 17 lokal. Total 9/9 lulus dalam 37 detik. Video
empat spec berada di `cypress/videos/` bila artefak lokal masih tersedia.

## 6.8 Analisis Hasil UI

Hasil aktual 9/9 lulus dan memenuhi jumlah minimum, cakupan skenario wajib, assertion, positive dan
negative case, repeatability, serta empat Page Object. Keterbatasan yang tersisa adalah eksekusi baru
menggunakan Electron headless dan belum mencakup cross-browser/device farm.

---

# BAB VII OTOMATISASI PENGUJIAN RESTFUL API

## 7.1 Tools dan Framework

Supertest mengirim HTTP request langsung ke Express app, Vitest sebagai runner/assertion, TypeScript
sebagai bahasa, Zod untuk validation, dan in-memory repository sebagai isolasi test. Production tetap
memakai Prisma/PostgreSQL. Test dijalankan CLI melalui `npm test`.

## 7.2 Daftar Endpoint yang Diuji

Endpoint auth, products, cart, orders, admin orders, health, OpenAPI JSON, dan Swagger UI telah diuji.
Detail endpoint ada di BAB II dan `apps/api/src/docs/openapi.ts`.

## 7.3 Desain Test Case API

Empat belas product cases memenuhi butir minimum produk:

| ID | Skenario | Expected |
|---|---|---|
| API-PROD-01 | List products | 200, JSON, pagination, header, response time |
| API-PROD-02 | Search/filter/sort | data sesuai query |
| API-PROD-03 | Detail valid ID | 200, required fields/types |
| API-PROD-04 | Detail ID not found | 404 |
| API-PROD-05 | Malformed ID | 422 |
| API-PROD-06 | Create valid | 201, response sesuai payload |
| API-PROD-07 | Create tanpa nama | 422, field name |
| API-PROD-08 | Harga negatif | 422, pesan harga |
| API-PROD-09 | Stok negatif | 422 |
| API-PROD-10 | Update valid | 200, nilai berubah |
| API-PROD-11 | Update ID not found | 404 |
| API-PROD-12 | PATCH kosong | 422 |
| API-PROD-13 | Delete | 204 lalu detail 404 |
| API-PROD-14 | Delete ID not found | 404 |

Tambahan auth (8), cart (4), order (6), health (2), OpenAPI (2), dan domain tests menghasilkan total
API test terakhir yang tercatat pada handoff sebanyak **73 test lulus**. Gunakan output eksekusi
terbaru sebagai angka final bila test dijalankan ulang.

Order cases mencakup order DRAFT valid, cart kosong, recipient invalid, detail by number, valid/illegal
transition, dan Customer ditolak dari endpoint Admin. Cart cases mencakup unauthenticated, add+total,
gabungan melebihi stok, update, dan delete (beberapa assertion berada dalam test gabungan).

## 7.4 Environment dan Variabel

| Variabel | Fungsi |
|---|---|
| Base URL test | Express app in-memory/Supertest, tanpa port eksternal |
| Bearer token | Diperoleh dari endpoint login test |
| Product ID | Fixture UUID/repository test |
| Order ID/number | Dibaca dari response create order |
| Repository | In-memory untuk isolasi dan repeatability |
| Production DB | PostgreSQL/Prisma, tidak dipakai oleh integration test terisolasi |

Jangan menampilkan AUTH_SECRET, token nyata, atau DATABASE_URL.

## 7.5 Skenario Positif dan Negatif

Positif: list/detail, create/update/delete produk, login, profil, add/update/delete cart, checkout,
detail order, valid status. Negatif: wrong password, empty fields, unauthorized/forbidden, not found,
malformed ID, missing name, negative price/stock, empty PATCH, stock conflict, empty cart, invalid
recipient, illegal transition.

## 7.6 Implementasi Validasi API

| Validasi soal | Penerapan |
|---|---|
| Status code | 200, 201, 204, 401, 403, 404, 409, 422 |
| Response body | success/message/data/errors dan nilai domain |
| Payload vs response | create/update product dan order |
| Header | Content-Type application/json |
| Response time | list products di bawah 2 detik |
| Field wajib | product/order/auth fields |
| Tipe data | UUID/string/number/integer/boolean/array |
| JSON Schema | OpenAPI schemas dan pemeriksaan dokumen; tampilkan assertion aktual yang tersedia |
| Pesan error | credential, validation, stock, transition |
| Positif/negatif | tersebar di seluruh suite |

Catatan jujur: evidence lama `product-api-test-result.md` menyebut JSON Schema akan dilengkapi pada
order suite. Sebelum mengklaim validasi JSON Schema penuh, pastikan test aktual memiliki schema
assertion atau jelaskan bahwa kontrak schema divalidasi melalui dokumen OpenAPI test.

## 7.7 Hasil Eksekusi API

Status handoff terakhir: 73 API tests lulus, 9 Web component tests lulus, typecheck dan production
build lulus. Evidence terpisah mencatat product 14/14, auth 8/8, advanced test design 39/39, serta
commerce flow suite. Ambil satu screenshot output `npm test` terbaru sebelum membuat PPT final agar
angka, timestamp, dan durasi konsisten.

## 7.8 Analisis Hasil API

API memenuhi fungsi inti, role guard, validasi payload, response code, error message, stok, dan state
transition. Repository in-memory membuat test cepat dan repeatable, sementara smoke test database
nyata memvalidasi adapter Prisma/PostgreSQL. Defect PATCH kosong ditemukan oleh test negatif,
diperbaiki, dan retest lulus. Risiko tersisa terdapat pada dependency advisory serta kebutuhan
mempertegas JSON Schema assertion jika belum ada.

---

# BAB VIII DEFECT DAN EVALUASI KUALITAS

## 8.1 Daftar Defect

| ID | Ringkasan | Severity | Priority | Status |
|---|---|---|---|---|
| DEF-API-001 | `PATCH /api/products/:id` dengan `{}` diterima sebagai update | Medium | High | Closed |

## 8.2 Klasifikasi Severity dan Priority

Severity Medium karena tidak menyebabkan kehilangan data atau service down, tetapi melanggar kontrak
validasi dan dapat menghasilkan update semu. Priority High karena endpoint Admin merupakan fungsi inti
dan perilaku mudah direproduksi serta berpotensi membingungkan client.

## 8.3 Analisis Penyebab

`createProductSchema.partial()` mewarisi default `imageUrl: null` dan `isActive: true`. Refinement
untuk memastikan object memiliki key berjalan setelah default diterapkan. Akibatnya payload `{}`
berubah menjadi object dengan dua field dan lolos sebagai update.

## 8.4 Rekomendasi dan Perbaikan

Field yang memiliki default dioverride pada update schema menjadi optional tanpa default. Hanya field
yang benar-benar dikirim client yang dihitung. Pertahankan regression test API-PROD-12 agar defect
tidak muncul kembali.

## 8.5 Hasil Retest

Retest 25 Juli 2026 pukul 23:55:24: seluruh 14 test produk lulus dan `PATCH {}` sekarang mengembalikan
422. Status defect Closed. Sumber: `docs/defects/DEF-API-001.md`.

## 8.6 Evaluasi Kualitas Aplikasi

Kekuatan:

- Requirement diberi ID dan dipetakan ke test.
- Aturan bisnis kritis berupa pure functions dan 100% coverage pada target white-box/TDD.
- BDD melampaui minimum: 15 scenario/50 step lulus.
- API automation melampaui minimum 12 case dan mencakup banyak jenis validasi.
- Checkout production memakai transaksi database dan snapshot order.
- Autentikasi bcrypt/JWT, role guard, Zod, Helmet, dan CORS.
- Production, Swagger, dan health endpoint tersedia online.
- TypeScript, lint, component test, build, dan deployment smoke test tersedia.

Audit dependency 26 Juli 2026: 0 critical, 9 high, 2 moderate. Advisory React Router berkaitan dengan
RSC sementara GreenCart memakai SPA Vite tanpa RSC; Prisma/coverage terutama tooling. `npm audit
fix --force` tidak dilakukan karena berisiko breaking major version. Risiko diterima sementara dan
wajib ditinjau ulang.

## 8.7 Keterbatasan Pengujian

- UI automation mencakup 9 test dan empat Page Object; cross-browser matrix belum dilakukan.
- Belum ada cross-browser matrix, device farm, visual regression, accessibility audit otomatis,
  load/stress test, penetration test, chaos/recovery test, dan soak test.
- Database integration memakai local PostgreSQL untuk smoke/E2E, sementara mayoritas API suite memakai
  in-memory repository.
- Warning ukuran chunk visual 3D masih ada pada build.
- Dependency advisory noncritical masih tercatat.
- Payment, shipping provider, email, dan notification tidak diuji karena di luar scope.
- Credential database yang pernah terekspos harus dirotasi sebelum penyerahan final.

---

# BAB IX PENUTUP

## 9.1 Kesimpulan

GreenCart berhasil dikembangkan sebagai aplikasi toko botani full-stack dengan frontend React,
REST API Express, Prisma, dan PostgreSQL. Fitur inti login, katalog, detail, cart, checkout, order,
dashboard, CRUD produk, dan state transition telah tersedia serta dapat diakses online.

Advanced Test Design berhasil memvalidasi dua proses bisnis melalui state transition dan dua fungsi
melalui Cyclomatic Complexity/independent path. Dua fungsi utama dikembangkan dengan TDD dan tetap
lulus setelah refactor dengan 100% coverage pada target. Implementasi BDD menghasilkan 15 scenario
dan 50 step lulus. API automation melampaui minimum kasus dan membuktikan respons positif/negatif,
autentikasi, validasi, stok, serta transisi. Satu defect update kosong ditemukan, diperbaiki, dan
ditutup setelah retest.

UI automation telah memenuhi jumlah minimum dengan 9 test dan empat Page Object. Evidence eksekusi
menunjukkan seluruh spec lulus; keterbatasan yang tetap perlu disebut adalah belum adanya pengujian
lintas browser dan device farm.

## 9.2 Rekomendasi Pengembangan

1. Selesaikan delapan Cypress test dan POM empat halaman.
2. Tambahkan cross-browser, accessibility, responsive visual, dan performance testing.
3. Tambahkan JSON Schema assertion eksplisit bila belum tersedia.
4. Optimalkan lazy loading/code splitting bundle 3D.
5. Perbarui dependency secara terencana dan audit ulang.
6. Tambahkan monitoring, structured logging, rate limiting, refresh token/revocation, dan backup test.
7. Integrasikan payment gateway, shipping API, email/notifikasi, dan review pada versi berikutnya.
8. Tambahkan CI/CD quality gate untuk test, lint, typecheck, BDD, E2E, dan build.

## 9.3 Kontribusi Setiap Anggota

Gunakan tabel pada Bagian 1.2 lalu tambahkan bukti commit/task bila tersedia. Narasi siap pakai:

“Pengerjaan GreenCart dilakukan secara kolaboratif. Muh Yahya Al Qadri berfokus pada frontend dan
integrasi UI; Muh. Khaidir Nur berfokus pada backend, database, API, dan autentikasi; Nursyahlan
Ruslan berfokus pada perancangan test, BDD, dan quality assurance; Mustapiah berfokus pada dokumentasi,
evidence, laporan, dan materi presentasi. Seluruh anggota terlibat dalam review, pengujian ulang,
dan pemeriksaan hasil akhir.”

---

## 10. DAFTAR BUKTI DAN SUMBER FILE

| Materi | Sumber |
|---|---|
| Baseline requirement | `PERENCANAAN_GREENCART.md` |
| README dan URL | `README.md` |
| ERD/diagram | `docs/diagrams/*.md` |
| Advanced test design | `docs/test-cases/advanced-test-design.md` |
| RTM | `docs/test-cases/requirement-traceability-matrix.md` |
| TDD case/evidence | `docs/test-cases/tdd-business-rules.md`, `docs/evidence/tdd-*.md` |
| BDD | `features/*.feature`, `features/step-definitions/*.ts`, evidence BDD |
| API cases | `docs/test-cases/product-api.md`, `authentication-api.md` |
| UI evidence | `docs/evidence/cypress-e2e-result.md`, `cypress/e2e/*.cy.ts` |
| Defect | `docs/defects/DEF-API-001.md` |
| Security | `docs/evidence/security-audit.md` |
| Deployment | `docs/DEPLOYMENT.md`, `docs/HANDOFF.md` |
| Prisma schema | `apps/api/prisma/schema.prisma` |
| OpenAPI | `apps/api/src/docs/openapi.ts` |
| Domain functions | `apps/api/src/modules/*/domain/*.ts` |

---

## 11. CHECKLIST SCREENSHOT UNTUK PPT FINAL

- [ ] Cover dengan identitas lengkap dan kelas yang benar.
- [ ] Homepage desktop dan mobile.
- [ ] Login valid, invalid, dan empty-field error.
- [ ] Katalog, filter/search, detail produk.
- [ ] Cart add/update/delete dan perhitungan total.
- [ ] Checkout valid dan invalid.
- [ ] Order berhasil, nomor order, riwayat, timeline.
- [ ] Dashboard, CRUD produk, daftar/detail order, status transition.
- [ ] ERD, architecture, dua state diagrams, dua CFG.
- [ ] Source code dua fungsi white-box.
- [ ] Unit test dan coverage advanced test design.
- [ ] TDD Red, Green, Refactor beserta kode sebelum/sesudah.
- [ ] Dua feature Gherkin, step definition, hasil 15 scenario/50 step.
- [ ] Struktur empat Cypress Page Object, 9 test, hasil eksekusi/video.
- [ ] Source Supertest, tabel minimal 12 API test, hasil eksekusi.
- [ ] Swagger UI dan response API.
- [ ] Defect before/fix/retest.
- [ ] Production website, health API, dan repository dapat dibuka.
- [ ] Tidak ada credential/secret dalam screenshot.

---

## 12. GAP WAJIB SEBELUM DIKUMPULKAN

1. Ambil screenshot output quality gate dan Cypress final yang konsisten.
2. Pastikan JSON Schema validation API ditunjukkan secara faktual, bukan sekadar diklaim.
3. Rotasi credential Neon/token yang pernah terekspos lalu redeploy dan smoke test.
4. Isi kelas, dosen, nama kelompok, serta identitas individu pada nama file.
5. Ambil semua screenshot aplikasi dan kode yang diwajibkan soal.
6. Buat PPT/PPTX, bukan hanya laporan Word/PDF; kumpulkan bersama ZIP source code.
7. Pastikan URL production/repository dapat dibuka dosen tanpa login khusus.

---

## 13. PROMPT SIAP SALIN UNTUK GPT PLUS

```text
Susun sebuah laporan proyek UTS dalam format presentasi PowerPoint berdasarkan bahan mentah yang saya
lampirkan. Mata kuliah: Advanced Software Testing and Quality Assurance. Ikuti struktur wajib secara
persis: BAB I Pendahuluan; BAB II Analisis dan Perancangan; BAB III Advanced Test Design; BAB IV TDD;
BAB V BDD; BAB VI UI Automation; BAB VII REST API Automation; BAB VIII Defect dan Evaluasi Kualitas;
BAB IX Penutup.

Jangan meringkas dengan menghilangkan subbagian wajib. Buat slide yang cukup banyak agar setiap tabel,
diagram, kode, dan hasil test terbaca. Setiap pembahasan teknis harus memiliki placeholder bukti dengan
nama screenshot/file sumber. Gunakan bahasa Indonesia akademik yang jelas, jangan mengarang data,
jumlah test, coverage, atau hasil eksekusi. Jangan tampilkan token, password production, DATABASE_URL,
atau isi .env. Otomatisasi UI telah memiliki 9 Cypress test dan empat Page Object; gunakan hasil
tersebut secara akurat dan jangan mengubah jumlahnya.

Gunakan desain botanical commerce profesional dengan rasio 16:9, warna hijau/krem, kontras tinggi,
caption gambar/tabel, nomor BAB, serta URL website, API, Swagger, dan repository. Karena tugas tidak
dipresentasikan, buat setiap slide self-explanatory dan sertakan penjelasan singkat fungsi setiap
source code yang ditampilkan. Hasil akhir yang saya perlukan adalah outline slide-per-slide lengkap,
teks siap tempel, daftar aset per slide, serta saran layout.
```
