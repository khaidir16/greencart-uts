# Control Flow Graph — validateCartQuantity

```mermaid
flowchart TD
  N1([1 Start]) --> N2{2 Number dan finite?}
  N2 -- Tidak --> N3[3 QUANTITY_TYPE]
  N2 -- Ya --> N4{4 Integer?}
  N4 -- Tidak --> N5[5 QUANTITY_INTEGER]
  N4 -- Ya --> N6{6 quantity >= 1?}
  N6 -- Tidak --> N7[7 QUANTITY_MIN]
  N6 -- Ya --> N8{8 quantity <= 10?}
  N8 -- Tidak --> N9[9 QUANTITY_MAX]
  N8 -- Ya --> N10{10 quantity <= stock?}
  N10 -- Tidak --> N11[11 QUANTITY_STOCK]
  N10 -- Ya --> N12[12 Valid]
  N3 --> N13([13 End])
  N5 --> N13
  N7 --> N13
  N9 --> N13
  N11 --> N13
  N12 --> N13
```

Composite predicate `typeof quantity === number && Number.isFinite(quantity)` diperlakukan sebagai
satu decision node pada CFG tingkat fungsi. Evaluasi short-circuit internal dicakup oleh branch
coverage melalui input teks dan `NaN`.
