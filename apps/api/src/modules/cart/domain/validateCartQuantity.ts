export type CartQuantityResult =
  | { valid: true; value: number }
  | { valid: false; code: string; message: string };

export function validateCartQuantity(quantity: unknown, stock: number): CartQuantityResult {
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    return { valid: false, code: 'QUANTITY_TYPE', message: 'Jumlah produk harus berupa angka.' };
  }

  if (!Number.isInteger(quantity)) {
    return { valid: false, code: 'QUANTITY_INTEGER', message: 'Jumlah produk harus berupa bilangan bulat.' };
  }

  if (quantity <= 0) {
    return { valid: false, code: 'QUANTITY_MIN', message: 'Jumlah minimal pembelian adalah 1 unit.' };
  }

  if (quantity > 10) {
    return { valid: false, code: 'QUANTITY_MAX', message: 'Jumlah maksimal pembelian adalah 10 unit.' };
  }

  if (quantity > stock) {
    return { valid: false, code: 'QUANTITY_STOCK', message: 'Jumlah pembelian melebihi stok yang tersedia.' };
  }

  return { valid: true, value: quantity };
}
