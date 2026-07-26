import type { CartRepository } from '../cart/cart.repository.js';
import type { ProductRepository } from '../product/product.repository.js';
import { CheckoutConflictError, type OrderRepository } from './order.repository.js';
import type { CheckoutInput, Order } from './order.types.js';

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>(); private sequence = 1;
  constructor(private readonly carts: CartRepository, private readonly products: ProductRepository) {}
  async createFromCart(userId: string, input: CheckoutInput) {
    const cart = await this.carts.get(userId); if (!cart.items.length) throw new CheckoutConflictError('Keranjang tidak boleh kosong.');
    for (const item of cart.items) { const product = await this.products.findById(item.productId); if (!product || product.stock < item.quantity) throw new CheckoutConflictError(`Stok ${item.product.name} tidak mencukupi.`); }
    const id = `40000000-0000-4000-8000-${String(this.sequence++).padStart(12, '0')}`; const createdAt = new Date();
    const order: Order = { id, orderNumber: `GC-${createdAt.getFullYear()}-${String(this.sequence).padStart(6, '0')}`, ...input, totalAmount: cart.total, status: 'DRAFT', createdAt, items: cart.items.map((item, index) => ({ id: `50000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`, productId: item.productId, productName: item.product.name, unitPrice: item.product.price, quantity: item.quantity, subtotal: item.subtotal })) };
    this.orders.set(`${userId}:${order.orderNumber}`, order); await this.carts.clear(userId); return structuredClone(order);
  }
  async findByNumber(userId: string, orderNumber: string) { const order = this.orders.get(`${userId}:${orderNumber}`); return order ? structuredClone(order) : null; }
  async listByUser(userId: string) { return [...this.orders.entries()].filter(([key]) => key.startsWith(`${userId}:`)).map(([, order]) => structuredClone(order)).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); }
  async listAll(status?: Order['status']) { return [...this.orders.values()].filter((order) => !status || order.status === status).map((order) => structuredClone(order)); }
  async findById(id: string) { const order = [...this.orders.values()].find((item) => item.id === id); return order ? structuredClone(order) : null; }
  async updateStatus(id: string, status: Order['status']) { const entry = [...this.orders.entries()].find(([, order]) => order.id === id); if (!entry) return null; const updated = { ...entry[1], status }; this.orders.set(entry[0], updated); return structuredClone(updated); }
}
