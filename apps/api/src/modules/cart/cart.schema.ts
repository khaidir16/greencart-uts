import { z } from 'zod';
export const addCartItemSchema = z.object({ productId: z.uuid('ID produk tidak valid.'), quantity: z.number().int().min(1).max(10) });
export const updateCartItemSchema = z.object({ quantity: z.number().int().min(1).max(10) });
export const cartItemIdSchema = z.uuid('ID item tidak valid.');
