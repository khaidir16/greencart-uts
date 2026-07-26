export type CheckoutInput = { recipientName: string; phone: string; shippingAddress: string };
export type OrderItem = { id: string; productId: string | null; productName: string; unitPrice: number; quantity: number; subtotal: number };
export type Order = { id: string; orderNumber: string; recipientName: string; phone: string; shippingAddress: string; totalAmount: number; status: 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'; items: OrderItem[]; createdAt: Date; customerName?: string; customerEmail?: string };
