import { Router, type RequestHandler } from 'express';
import { ZodError } from 'zod';
import { ProductDeleteConflictError, type ProductRepository } from './product.repository.js';
import {
  createProductSchema,
  productIdSchema,
  productListQuerySchema,
  updateProductSchema,
} from './product.schema.js';
import { ProductService } from './product.service.js';

export function createProductRouter(repository: ProductRepository, adminGuards: RequestHandler[] = []) {
  const router = Router();
  const service = new ProductService(repository);

  router.get('/', async (request, response) => {
    try {
      const query = productListQuerySchema.parse(request.query);
      const result = await service.list(query);
      const totalPages = Math.ceil(result.total / query.limit);
      response.status(200).json({
        success: true,
        message: 'Daftar produk berhasil diambil.',
        data: result.items,
        meta: { page: query.page, limit: query.limit, total: result.total, totalPages },
      });
    } catch (error) {
      sendError(error, response);
    }
  });

  router.get('/:id', async (request, response) => {
    try {
      const id = productIdSchema.parse(request.params.id);
      const product = await service.findById(id);
      if (!product) return response.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
      return response.status(200).json({ success: true, message: 'Detail produk berhasil diambil.', data: product });
    } catch (error) {
      return sendError(error, response);
    }
  });

  router.post('/', ...adminGuards, async (request, response) => {
    try {
      const payload = createProductSchema.parse(request.body);
      const product = await service.create(payload);
      response.status(201).json({ success: true, message: 'Produk berhasil ditambahkan.', data: product });
    } catch (error) {
      sendError(error, response);
    }
  });

  router.patch('/:id', ...adminGuards, async (request, response) => {
    try {
      const id = productIdSchema.parse(request.params.id);
      const payload = updateProductSchema.parse(request.body);
      const product = await service.update(id, payload);
      if (!product) return response.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
      return response.status(200).json({ success: true, message: 'Produk berhasil diperbarui.', data: product });
    } catch (error) {
      return sendError(error, response);
    }
  });

  router.delete('/:id', ...adminGuards, async (request, response) => {
    try {
      const id = productIdSchema.parse(request.params.id);
      const deleted = await service.delete(id);
      if (!deleted) return response.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
      return response.status(204).send();
    } catch (error) {
      if (error instanceof ProductDeleteConflictError) {
        return response.status(409).json({ success: false, message: error.message });
      }
      return sendError(error, response);
    }
  });

  return router;
}

function sendError(error: unknown, response: Parameters<Parameters<Router['get']>[1]>[1]) {
  if (error instanceof ZodError) {
    return response.status(422).json({
      success: false,
      message: 'Data yang dikirim tidak valid.',
      errors: error.issues.map((issue) => ({ field: issue.path.join('.') || 'request', message: issue.message })),
    });
  }
  console.error(error);
  return response.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
}
