import type { ProductRepository } from '../product/product.repository.js';
import type { CartRepository } from './cart.repository.js';

export class CartValidationError extends Error { constructor(message: string, public readonly status = 422) { super(message); } }

export class CartService {
  constructor(private readonly carts: CartRepository, private readonly products: ProductRepository) {}
  get(userId: string) { return this.carts.get(userId); }
  async add(userId: string, productId: string, quantity: number) {
    const product = await this.products.findById(productId);
    if (!product || !product.isActive) throw new CartValidationError('Produk tidak ditemukan.', 404);
    const cart = await this.carts.get(userId);
    const current = cart.items.find((item) => item.productId === productId)?.quantity ?? 0;
    const total = current + quantity;
    validateQuantity(total, product.stock);
    return this.carts.setItem(userId, productId, total);
  }
  async update(userId: string, itemId: string, quantity: number) {
    const cart = await this.carts.get(userId);
    const item = cart.items.find((candidate) => candidate.id === itemId);
    if (!item) throw new CartValidationError('Item keranjang tidak ditemukan.', 404);
    validateQuantity(quantity, item.product.stock);
    return this.carts.setItem(userId, item.productId, quantity);
  }
  async remove(userId: string, itemId: string) {
    if (!await this.carts.deleteItem(userId, itemId)) throw new CartValidationError('Item keranjang tidak ditemukan.', 404);
    return this.carts.get(userId);
  }
}

function validateQuantity(quantity: number, stock: number) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new CartValidationError('Jumlah harus berupa bilangan bulat antara 1 dan 10.');
  if (quantity > stock) throw new CartValidationError('Jumlah melebihi stok yang tersedia.', 409);
}
