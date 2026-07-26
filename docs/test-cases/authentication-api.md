# Authentication dan Authorization GreenCart

## Endpoint

| Method | Endpoint | Akses | Respons |
|---|---|---|---|
| POST | `/api/auth/login` | Public | 200, 401, 422 |
| GET | `/api/auth/me` | Bearer token | 200, 401 |
| POST | `/api/auth/logout` | Bearer token | 204, 401 |

Mutasi produk `POST`, `PATCH`, dan `DELETE` pada konfigurasi production menggunakan middleware
`requireAuth` lalu `requireRole('ADMIN')`.

## Akun demo development

| Role | Identity | Password |
|---|---|---|
| Admin | `admin` atau `admin@greencart.test` | `Admin123!` |
| Customer | `customer` atau `customer@greencart.test` | `Customer123!` |

Password hanya untuk environment demonstrasi UTS dan harus diganti pada deployment nyata.

## Automated cases

| ID | Skenario | Expected |
|---|---|---|
| API-AUTH-01 | Login email admin valid | 200, JWT, public user |
| API-AUTH-02 | Login username customer valid | 200, role CUSTOMER |
| API-AUTH-03 | Password salah | 401, pesan umum |
| API-AUTH-04 | Field login kosong | 422, detail field |
| API-AUTH-05 | `/me` tanpa token | 401 |
| API-AUTH-06 | `/me` dengan token valid | 200 |
| API-AUTH-07 | Customer mutasi produk | 403 |
| API-AUTH-08 | Admin mutasi produk | 201 |

Password tidak pernah dikembalikan dalam response. Password database disimpan sebagai bcrypt hash,
sedangkan token ditandatangani dengan HS256 dan memiliki masa berlaku dua jam.
