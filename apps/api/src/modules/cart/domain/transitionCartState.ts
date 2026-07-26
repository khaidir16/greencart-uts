export type CartState = 'EMPTY' | 'ACTIVE' | 'VALIDATED' | 'ORDERED';

export type CartEvent =
  | 'ADD_VALID_ITEM'
  | 'REMOVE_LAST_ITEM'
  | 'VALIDATE_CART'
  | 'UPDATE_ITEM'
  | 'CHECKOUT';

export type CartTransitionResult =
  | { changed: true; from: CartState; to: CartState; event: CartEvent }
  | {
      changed: false;
      from: CartState;
      to: CartState;
      event: CartEvent;
      code: 'INVALID_CART_TRANSITION';
      message: string;
    };

const CART_TRANSITIONS: Readonly<
  Partial<Record<CartState, Partial<Record<CartEvent, CartState>>>>
> = Object.freeze({
  EMPTY: { ADD_VALID_ITEM: 'ACTIVE' },
  ACTIVE: { REMOVE_LAST_ITEM: 'EMPTY', VALIDATE_CART: 'VALIDATED' },
  VALIDATED: { UPDATE_ITEM: 'ACTIVE', CHECKOUT: 'ORDERED' },
  ORDERED: {},
});

export function transitionCartState(current: CartState, event: CartEvent): CartTransitionResult {
  const target = CART_TRANSITIONS[current]?.[event];

  if (target) return { changed: true, from: current, to: target, event };

  return {
    changed: false,
    from: current,
    to: current,
    event,
    code: 'INVALID_CART_TRANSITION',
    message: `Event ${event} tidak dapat dijalankan ketika keranjang berstatus ${current}.`,
  };
}
