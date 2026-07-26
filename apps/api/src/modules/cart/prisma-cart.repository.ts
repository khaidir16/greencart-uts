import type { PrismaClient } from '@prisma/client';
import type { CartRepository } from './cart.repository.js';

export class PrismaCartRepository implements CartRepository {
  constructor(private readonly database: PrismaClient) {}
  async get(userId: string) {
    const cart = await this.database.cart.findUnique({ where: { userId }, include: { items: { orderBy: { createdAt: 'asc' }, include: { product: true } } } });
    if (!cart) return { id: null, items: [], totalQuantity: 0, total: 0 };
    const items = cart.items.map((item) => ({ id: item.id, productId: item.productId, quantity: item.quantity, product: { id: item.product.id, slug: item.product.slug, name: item.product.name, price: item.product.price.toNumber(), stock: item.product.stock, imageUrl: item.product.imageUrl }, subtotal: item.product.price.toNumber() * item.quantity }));
    return { id: cart.id, items, totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.subtotal, 0) };
  }
  async setItem(userId: string, productId: string, quantity: number) {
    const cart = await this.database.cart.upsert({ where: { userId }, create: { userId }, update: {} });
    await this.database.cartItem.upsert({ where: { cartId_productId: { cartId: cart.id, productId } }, create: { cartId: cart.id, productId, quantity }, update: { quantity } });
    return this.get(userId);
  }
  async deleteItem(userId: string, itemId: string) {
    const result = await this.database.cartItem.deleteMany({ where: { id: itemId, cart: { userId } } });
    return result.count > 0;
  }
  async clear(userId: string) { await this.database.cartItem.deleteMany({ where: { cart: { userId } } }); }
}
