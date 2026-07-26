import { describe, expect, it } from 'vitest';
import { transitionOrderStatus } from './transitionOrderStatus.js';

describe('transitionOrderStatus — TDD function 2', () => {
  it.each([
    ['DRAFT', 'CONFIRMED'],
    ['DRAFT', 'CANCELLED'],
    ['CONFIRMED', 'COMPLETED'],
    ['CONFIRMED', 'CANCELLED'],
  ] as const)('mengizinkan transisi %s → %s', (current, target) => {
    expect(transitionOrderStatus(current, target)).toEqual({
      changed: true,
      from: current,
      to: target,
    });
  });

  it.each([
    ['DRAFT', 'COMPLETED'],
    ['CONFIRMED', 'DRAFT'],
    ['COMPLETED', 'CANCELLED'],
    ['CANCELLED', 'DRAFT'],
    ['CANCELLED', 'CONFIRMED'],
    ['CANCELLED', 'COMPLETED'],
  ] as const)('menolak transisi ilegal %s → %s', (current, target) => {
    expect(transitionOrderStatus(current, target)).toMatchObject({
      changed: false,
      code: 'INVALID_STATUS_TRANSITION',
      from: current,
      to: target,
    });
  });

  it.each(['DRAFT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const)(
    'menolak transisi menuju status yang sama: %s',
    (status) => {
      expect(transitionOrderStatus(status, status)).toMatchObject({
        changed: false,
        code: 'STATUS_UNCHANGED',
      });
    },
  );
});
