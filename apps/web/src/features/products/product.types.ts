export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  categoryName?: string;
  careLevel: 'EASY' | 'MEDIUM' | 'HARD';
  lightRequirement: string;
  wateringFrequency: string;
};

export type ProductListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CartItem = { id: string; productId: string; quantity: number; product: Pick<Product, 'id' | 'slug' | 'name' | 'price' | 'stock' | 'imageUrl'>; subtotal: number };
export type Cart = { id: string | null; items: CartItem[]; totalQuantity: number; total: number };
export type Order = { id: string; orderNumber: string; recipientName: string; phone: string; shippingAddress: string; totalAmount: number; status: 'DRAFT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'; items: Array<{ id: string; productId: string | null; productName: string; unitPrice: number; quantity: number; subtotal: number }>; createdAt: string; customerName?: string; customerEmail?: string };
