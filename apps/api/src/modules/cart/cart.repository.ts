import type { Cart } from './cart.types.js';

export interface CartRepository {
  get(userId: string): Promise<Cart>;
  setItem(userId: string, productId: string, quantity: number): Promise<Cart>;
  deleteItem(userId: string, itemId: string): Promise<boolean>;
  clear(userId: string): Promise<void>;
}
