# Desain Skenario BDD GreenCart

## Ringkasan pemenuhan persyaratan

| Persyaratan | Implementasi |
|---|---|
| Minimal 2 file `.feature` | `cart-quantity.feature`, `order-status.feature` |
| Minimal 5 skenario | 9 definisi skenario; 15 skenario setelah Examples |
| Scenario Outline + Examples | Boundary jumlah dan transisi status valid |
| Skenario positif | Jumlah valid dan empat transisi valid |
| Minimal 2 negatif | Teks, pecahan, stok, completed-cancelled, reaktivasi cancelled |
| Validasi batas | 1, 10, 0, dan 11 |
| Perubahan status | DRAFT/CONFIRMED/COMPLETED/CANCELLED |

## Traceability

| Feature/skenario | Kebutuhan |
|---|---|
| Add a valid quantity | FR-10, FR-14 |
| Reject quantity as text/fraction | FR-14 |
| Validate quantity boundaries | FR-14 |
| Reject quantity exceeding stock | FR-14, FR-16 |
| Allow valid order transitions | FR-20, FR-21, FR-22 |
| Reject completed cancellation/reactivation | FR-23 |
| Reject unchanged status | FR-23 |

Step definition langsung memanggil fungsi domain produksi `validateCartQuantity` dan
`transitionOrderStatus`, sehingga Gherkin menguji aturan yang sama dengan REST API nantinya.
