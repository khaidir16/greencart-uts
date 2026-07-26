# State Transition — Siklus Keranjang

```mermaid
stateDiagram-v2
  [*] --> EMPTY: keranjang dibuat
  EMPTY --> ACTIVE: ADD_VALID_ITEM
  ACTIVE --> EMPTY: REMOVE_LAST_ITEM
  ACTIVE --> VALIDATED: VALIDATE_CART
  VALIDATED --> ACTIVE: UPDATE_ITEM
  VALIDATED --> ORDERED: CHECKOUT
  ORDERED --> ORDERED: seluruh perubahan ditolak
```

`VALIDATED` berarti jumlah, stok, dan data keranjang telah diperiksa. Perubahan item mengembalikan
keranjang ke `ACTIVE` agar validasi dijalankan kembali. `ORDERED` merupakan terminal state.
