import type { ProductRepository } from '../product/product.repository.js';
import type { CartRepository } from './cart.repository.js';
import type { Cart } from './cart.types.js';

export class InMemoryCartRepository implements CartRepository {
  private readonly carts = new Map<string, Map<string, { id: string; quantity: number }>>();
  private sequence = 1;
  constructor(private readonly products: ProductRepository) {}

  async get(userId: string) {
    const entries = [...(this.carts.get(userId)?.entries() ?? [])];
    const items = (await Promise.all(entries.map(async ([productId, item]) => {
      const product = await this.products.findById(productId);
      return product ? { ...item, productId, product: { id: product.id, slug: product.slug, name: product.name, price: product.price, stock: product.stock, imageUrl: product.imageUrl }, subtotal: product.price * item.quantity } : null;
    }))).filter((item): item is NonNullable<typeof item> => Boolean(item));
    return summarize(userId, items);
  }

  async setItem(userId: string, productId: string, quantity: number) {
    const cart = this.carts.get(userId) ?? new Map();
    const current = cart.get(productId);
    cart.set(productId, { id: current?.id ?? `10000000-0000-4000-8000-${String(this.sequence++).padStart(12, '0')}`, quantity });
    this.carts.set(userId, cart);
    return this.get(userId);
  }

  async deleteItem(userId: string, itemId: string) {
    const cart = this.carts.get(userId);
    const entry = [...(cart?.entries() ?? [])].find(([, item]) => item.id === itemId);
    return entry ? Boolean(cart?.delete(entry[0])) : false;
  }
  async clear(userId: string) { this.carts.delete(userId); }
}

function summarize(id: string, items: Cart['items']): Cart { return { id: `cart-${id}`, items, totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.subtotal, 0) }; }
