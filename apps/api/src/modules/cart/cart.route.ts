import { Router } from 'express';
import { ZodError } from 'zod';
import type { CartRepository } from './cart.repository.js';
import type { ProductRepository } from '../product/product.repository.js';
import { CartService, CartValidationError } from './cart.service.js';
import { addCartItemSchema, cartItemIdSchema, updateCartItemSchema } from './cart.schema.js';

export function createCartRouter(carts: CartRepository, products: ProductRepository) {
  const router = Router(); const service = new CartService(carts, products);
  router.get('/', async (request, response) => response.json({ success: true, message: 'Keranjang berhasil diambil.', data: await service.get(request.user!.id) }));
  router.post('/items', async (request, response) => { try { const body = addCartItemSchema.parse(request.body); return response.status(201).json({ success: true, message: 'Produk berhasil ditambahkan ke keranjang.', data: await service.add(request.user!.id, body.productId, body.quantity) }); } catch (error) { return sendError(error, response); } });
  router.patch('/items/:itemId', async (request, response) => { try { const itemId = cartItemIdSchema.parse(request.params.itemId); const body = updateCartItemSchema.parse(request.body); return response.json({ success: true, message: 'Jumlah berhasil diperbarui.', data: await service.update(request.user!.id, itemId, body.quantity) }); } catch (error) { return sendError(error, response); } });
  router.delete('/items/:itemId', async (request, response) => { try { const itemId = cartItemIdSchema.parse(request.params.itemId); return response.json({ success: true, message: 'Item berhasil dihapus.', data: await service.remove(request.user!.id, itemId) }); } catch (error) { return sendError(error, response); } });
  return router;
}

function sendError(error: unknown, response: Parameters<Parameters<Router['get']>[1]>[1]) {
  if (error instanceof ZodError) return response.status(422).json({ success: false, message: 'Data yang dikirim tidak valid.', errors: error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) });
  if (error instanceof CartValidationError) return response.status(error.status).json({ success: false, message: error.message });
  console.error(error); return response.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
}
