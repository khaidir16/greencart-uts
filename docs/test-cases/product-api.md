# REST API Produk GreenCart

## Endpoint

| Method | Endpoint | Fungsi | Respons utama |
|---|---|---|---|
| GET | `/api/products` | List, search, filter, sort, pagination | 200, 422 |
| GET | `/api/products/:id` | Detail berdasarkan UUID | 200, 404, 422 |
| POST | `/api/products` | Membuat produk | 201, 422 |
| PATCH | `/api/products/:id` | Pembaruan parsial | 200, 404, 422 |
| DELETE | `/api/products/:id` | Menghapus produk | 204, 404, 409, 422 |

Method pembaruan yang dipilih adalah `PATCH` dan digunakan secara konsisten.

## Query list

| Parameter | Aturan |
|---|---|
| `page` | Integer minimal 1; default 1 |
| `limit` | Integer 1–50; default 12 |
| `search` | Maksimal 100 karakter |
| `categoryId` | UUID |
| `inStock` | `true` atau `false` |
| `sort` | `newest`, `name-asc`, `price-asc`, `price-desc` |

## Payload create

```json
{
  "name": "Philodendron Birkin",
  "description": "Tanaman indoor dengan garis putih yang unik.",
  "price": 175000,
  "stock": 9,
  "imageUrl": null,
  "categoryId": "10000000-0000-4000-8000-000000000001",
  "careLevel": "EASY",
  "lightRequirement": "Cahaya tidak langsung",
  "wateringFrequency": "Satu kali seminggu",
  "isActive": true
}
```

## Automated test cases

| ID | Skenario | Expected |
|---|---|---|
| API-PROD-01 | Mengambil seluruh produk | 200, JSON, pagination |
| API-PROD-02 | Search, stok, dan sort | Data sesuai filter |
| API-PROD-03 | Detail ID valid | 200 dan field bertipe benar |
| API-PROD-04 | Detail ID tidak ditemukan | 404 |
| API-PROD-05 | Format ID salah | 422 |
| API-PROD-06 | Create payload valid | 201 dan response sesuai request |
| API-PROD-07 | Create tanpa nama | 422 dan field `name` |
| API-PROD-08 | Create harga negatif | 422 dan pesan harga |
| API-PROD-09 | Create stok negatif | 422 |
| API-PROD-10 | Update valid | 200 dan nilai berubah |
| API-PROD-11 | Update ID tidak ditemukan | 404 |
| API-PROD-12 | Update payload kosong | 422 |
| API-PROD-13 | Delete produk | 204 lalu detail 404 |
| API-PROD-14 | Delete ID tidak ditemukan | 404 |

Test menggunakan repository in-memory terisolasi sehingga dapat diulang dan tidak bergantung pada
urutan maupun database eksternal. Production server menggunakan repository Prisma PostgreSQL.
