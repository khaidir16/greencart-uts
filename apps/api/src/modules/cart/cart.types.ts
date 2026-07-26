export type CartProduct = { id: string; slug: string; name: string; price: number; stock: number; imageUrl: string | null };
export type CartItem = { id: string; productId: string; quantity: number; product: CartProduct; subtotal: number };
export type Cart = { id: string | null; items: CartItem[]; totalQuantity: number; total: number };
