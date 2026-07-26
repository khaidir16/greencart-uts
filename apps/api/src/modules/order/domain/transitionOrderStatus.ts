export type OrderStatus = 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export type OrderStatusTransitionResult =
  | { changed: true; from: OrderStatus; to: OrderStatus }
  | {
      changed: false;
      code: 'STATUS_UNCHANGED' | 'INVALID_STATUS_TRANSITION';
      message: string;
      from: OrderStatus;
      to: OrderStatus;
    };

export function transitionOrderStatus(
  current: OrderStatus,
  target: OrderStatus,
): OrderStatusTransitionResult {
  if (current === target) {
    return {
      changed: false,
      code: 'STATUS_UNCHANGED',
      message: `Pesanan sudah berstatus ${current}.`,
      from: current,
      to: target,
    };
  }

  if (current === 'DRAFT' && (target === 'CONFIRMED' || target === 'CANCELLED')) {
    return { changed: true, from: current, to: target };
  }

  if (current === 'CONFIRMED' && (target === 'COMPLETED' || target === 'CANCELLED')) {
    return { changed: true, from: current, to: target };
  }

  return {
    changed: false,
    code: 'INVALID_STATUS_TRANSITION',
    message: `Perubahan status dari ${current} menjadi ${target} tidak diperbolehkan.`,
    from: current,
    to: target,
  };
}
