export const CART_QUANTITY_LIMIT = Object.freeze({ min: 1, max: 10 });

export type CartQuantityErrorCode =
  | 'QUANTITY_TYPE'
  | 'QUANTITY_INTEGER'
  | 'QUANTITY_MIN'
  | 'QUANTITY_MAX'
  | 'QUANTITY_STOCK';

export type CartQuantityResult =
  | { valid: true; value: number }
  | { valid: false; code: CartQuantityErrorCode; message: string };

const errorMessages: Record<CartQuantityErrorCode, string> = {
  QUANTITY_TYPE: 'Jumlah produk harus berupa angka.',
  QUANTITY_INTEGER: 'Jumlah produk harus berupa bilangan bulat.',
  QUANTITY_MIN: `Jumlah minimal pembelian adalah ${CART_QUANTITY_LIMIT.min} unit.`,
  QUANTITY_MAX: `Jumlah maksimal pembelian adalah ${CART_QUANTITY_LIMIT.max} unit.`,
  QUANTITY_STOCK: 'Jumlah pembelian melebihi stok yang tersedia.',
};

function invalidQuantity(code: CartQuantityErrorCode): CartQuantityResult {
  return { valid: false, code, message: errorMessages[code] };
}

export function validateCartQuantity(quantity: unknown, stock: number): CartQuantityResult {
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    return invalidQuantity('QUANTITY_TYPE');
  }

  if (!Number.isInteger(quantity)) {
    return invalidQuantity('QUANTITY_INTEGER');
  }

  if (quantity < CART_QUANTITY_LIMIT.min) {
    return invalidQuantity('QUANTITY_MIN');
  }

  if (quantity > CART_QUANTITY_LIMIT.max) {
    return invalidQuantity('QUANTITY_MAX');
  }

  if (quantity > stock) {
    return invalidQuantity('QUANTITY_STOCK');
  }

  return { valid: true, value: quantity };
}
