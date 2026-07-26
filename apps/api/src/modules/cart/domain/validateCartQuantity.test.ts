import { describe, expect, it } from 'vitest';
import { validateCartQuantity } from './validateCartQuantity.js';

describe('validateCartQuantity — TDD function 1', () => {
  it.each([1, 5, 10])('menerima bilangan bulat valid: %s', (quantity) => {
    expect(validateCartQuantity(quantity, 10)).toEqual({ valid: true, value: quantity });
  });

  it.each([
    { quantity: 'dua', code: 'QUANTITY_TYPE' },
    { quantity: Number.NaN, code: 'QUANTITY_TYPE' },
    { quantity: 1.5, code: 'QUANTITY_INTEGER' },
    { quantity: 0, code: 'QUANTITY_MIN' },
    { quantity: -1, code: 'QUANTITY_MIN' },
    { quantity: 11, code: 'QUANTITY_MAX' },
  ])('menolak $quantity dengan kode $code', ({ quantity, code }) => {
    expect(validateCartQuantity(quantity, 20)).toMatchObject({ valid: false, code });
  });

  it('menolak jumlah yang melebihi stok', () => {
    expect(validateCartQuantity(6, 5)).toMatchObject({ valid: false, code: 'QUANTITY_STOCK' });
  });

  it('mendahulukan batas maksimal 10 sebelum pemeriksaan stok', () => {
    expect(validateCartQuantity(11, 5)).toMatchObject({ valid: false, code: 'QUANTITY_MAX' });
  });
});
