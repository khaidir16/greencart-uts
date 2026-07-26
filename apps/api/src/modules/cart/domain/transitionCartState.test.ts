import { describe, expect, it } from 'vitest';
import { transitionCartState, type CartEvent, type CartState } from './transitionCartState.js';

describe('State Transition Testing — cart lifecycle', () => {
  it.each([
    ['EMPTY', 'ADD_VALID_ITEM', 'ACTIVE'],
    ['ACTIVE', 'REMOVE_LAST_ITEM', 'EMPTY'],
    ['ACTIVE', 'VALIDATE_CART', 'VALIDATED'],
    ['VALIDATED', 'UPDATE_ITEM', 'ACTIVE'],
    ['VALIDATED', 'CHECKOUT', 'ORDERED'],
  ] as const)('%s + %s → %s', (current, event, target) => {
    expect(transitionCartState(current, event)).toEqual({
      changed: true,
      from: current,
      to: target,
      event,
    });
  });

  it.each([
    ['EMPTY', 'CHECKOUT'],
    ['EMPTY', 'VALIDATE_CART'],
    ['ACTIVE', 'CHECKOUT'],
    ['VALIDATED', 'ADD_VALID_ITEM'],
    ['ORDERED', 'ADD_VALID_ITEM'],
    ['ORDERED', 'UPDATE_ITEM'],
    ['ORDERED', 'CHECKOUT'],
  ] as ReadonlyArray<readonly [CartState, CartEvent]>)('menolak %s + %s', (current, event) => {
    expect(transitionCartState(current, event)).toMatchObject({
      changed: false,
      from: current,
      to: current,
      event,
      code: 'INVALID_CART_TRANSITION',
    });
  });
});
