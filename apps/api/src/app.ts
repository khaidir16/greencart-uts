import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { InMemoryProductRepository } from './modules/product/in-memory-product.repository.js';
import type { ProductRepository } from './modules/product/product.repository.js';
import { createProductRouter } from './modules/product/product.route.js';
import { healthRouter } from './routes/health.route.js';

export function createApp(options?: { productRepository?: ProductRepository }) {
  const app = express();
  const productRepository = options?.productRepository ?? new InMemoryProductRepository();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
  cors({
    origin: env.webOrigin,
    credentials: true,
  }),
);
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/health', healthRouter);
  app.use('/api/products', createProductRouter(productRepository));

  app.use((_request, response) => {
    response.status(404).json({
      success: false,
      message: 'Endpoint tidak ditemukan.',
    });
  });

  return app;
}

export const app = createApp();
