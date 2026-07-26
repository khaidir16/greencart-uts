import type { Prisma, PrismaClient } from '@prisma/client';
import { CheckoutConflictError, type OrderRepository } from './order.repository.js';
import type { CheckoutInput } from './order.types.js';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly database: PrismaClient) {}
  async createFromCart(userId: string, input: CheckoutInput) {
    return this.database.$transaction(async (transaction) => {
      const cart = await transaction.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
      if (!cart?.items.length) throw new CheckoutConflictError('Keranjang tidak boleh kosong.');
      for (const item of cart.items) {
        const updated = await transaction.product.updateMany({ where: { id: item.productId, isActive: true, stock: { gte: item.quantity } }, data: { stock: { decrement: item.quantity } } });
        if (!updated.count) throw new CheckoutConflictError(`Stok ${item.product.name} tidak mencukupi.`);
      }
      const order = await transaction.order.create({ data: { orderNumber: orderNumber(), userId, ...input, totalAmount: cart.items.reduce((sum, item) => sum + item.product.price.toNumber() * item.quantity, 0), items: { create: cart.items.map((item) => ({ productId: item.productId, productName: item.product.name, unitPrice: item.product.price, quantity: item.quantity, subtotal: item.product.price.toNumber() * item.quantity })) }, statusHistory: { create: { toStatus: 'DRAFT', changedById: userId, note: 'Pesanan dibuat oleh Customer.' } } }, include: { items: true } });
      await transaction.cartItem.deleteMany({ where: { cartId: cart.id } }); return mapOrder(order);
    }, { isolationLevel: 'Serializable' });
  }
  async findByNumber(userId: string, orderNumberValue: string) { const order = await this.database.order.findFirst({ where: { userId, orderNumber: orderNumberValue }, include: { items: true } }); return order ? mapOrder(order) : null; }
  async listByUser(userId: string) { const orders = await this.database.order.findMany({ where: { userId }, include: { items: true, user: true }, orderBy: { createdAt: 'desc' } }); return orders.map(mapOrder); }
  async listAll(status?: 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') { const orders = await this.database.order.findMany({ where: status ? { status } : {}, include: { items: true, user: true }, orderBy: { createdAt: 'desc' } }); return orders.map(mapOrder); }
  async findById(id: string) { const order = await this.database.order.findUnique({ where: { id }, include: { items: true, user: true } }); return order ? mapOrder(order) : null; }
  async updateStatus(id: string, status: 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED', changedById: string) { try { const order = await this.database.order.update({ where: { id }, data: { status, statusHistory: { create: { fromStatus: (await this.database.order.findUniqueOrThrow({ where: { id }, select: { status: true } })).status, toStatus: status, changedById } } }, include: { items: true, user: true } }); return mapOrder(order); } catch { return null; } }
}

type OrderRecord = Prisma.OrderGetPayload<{ include: { items: true } }> | Prisma.OrderGetPayload<{ include: { items: true; user: true } }>;
function mapOrder(order: OrderRecord) { const user = 'user' in order ? order.user : undefined; return { ...order, user: undefined, customerName: user?.name, customerEmail: user?.email, totalAmount: order.totalAmount.toNumber(), status: order.status as 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED', items: order.items.map((item) => ({ ...item, unitPrice: item.unitPrice.toNumber(), subtotal: item.subtotal.toNumber() })) }; }
function orderNumber() { return `GC-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`; }
