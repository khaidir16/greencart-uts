# State Transition — Status Pesanan

```mermaid
stateDiagram-v2
  [*] --> DRAFT: checkout berhasil
  DRAFT --> CONFIRMED: konfirmasi admin
  DRAFT --> CANCELLED: pembatalan
  CONFIRMED --> COMPLETED: pesanan selesai
  CONFIRMED --> CANCELLED: pembatalan
  COMPLETED --> COMPLETED: transisi lain ditolak
  CANCELLED --> CANCELLED: aktivasi ulang ditolak
```

Status `COMPLETED` dan `CANCELLED` adalah terminal state. Self-transition juga ditolak karena tidak
menghasilkan perubahan status.
