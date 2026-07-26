import type { CheckoutInput, Order } from './order.types.js';
export interface OrderRepository { createFromCart(userId: string, input: CheckoutInput): Promise<Order>; findByNumber(userId: string, orderNumber: string): Promise<Order | null>; listByUser(userId: string): Promise<Order[]>; listAll(status?: Order['status']): Promise<Order[]>; findById(id: string): Promise<Order | null>; updateStatus(id: string, status: Order['status'], changedById: string): Promise<Order | null>; }
export class CheckoutConflictError extends Error { constructor(message: string) { super(message); } }
