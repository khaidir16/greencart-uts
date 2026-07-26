import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { createAuthRouter } from './modules/auth/auth.route.js';
import { InMemoryAuthRepository } from './modules/auth/in-memory-auth.repository.js';
import type { AuthRepository } from './modules/auth/auth.repository.js';
import { requireAuth, requireRole } from './modules/auth/auth.middleware.js';
import { AuthService } from './modules/auth/auth.service.js';
import { InMemoryProductRepository } from './modules/product/in-memory-product.repository.js';
import type { ProductRepository } from './modules/product/product.repository.js';
import { createProductRouter } from './modules/product/product.route.js';
import { healthRouter } from './routes/health.route.js';

const defaultUsers = [
  { id: '30000000-0000-4000-8000-000000000001', email: 'admin@greencart.test', username: 'admin', name: 'Admin GreenCart', role: 'ADMIN' as const, passwordHash: '$2b$10$qNGodx8jDC0HiPWBXb60OeliF5/JUeUFpTWmN55dVwtMmGXMhWxmu' },
  { id: '30000000-0000-4000-8000-000000000002', email: 'customer@greencart.test', username: 'customer', name: 'Customer Demo', role: 'CUSTOMER' as const, passwordHash: '$2b$10$gyr42xjqP2H.Ywh/uIa17ub4t4a1ep3Y5RzQKp1dUFAy/2B9Umpxe' },
];

export function createApp(options?: {
  productRepository?: ProductRepository;
  authRepository?: AuthRepository;
  authSecret?: string;
  protectProductMutations?: boolean;
}) {
  const app = express();
  const productRepository = options?.productRepository ?? new InMemoryProductRepository();
  const authRepository = options?.authRepository ?? new InMemoryAuthRepository(defaultUsers);
  const authService = new AuthService(authRepository, options?.authSecret ?? env.authSecret);

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
  app.use('/api/auth', createAuthRouter(authService));
  const adminGuards = options?.protectProductMutations
    ? [requireAuth(authService), requireRole('ADMIN')]
    : [];
  app.use('/api/products', createProductRouter(productRepository, adminGuards));

  app.use((_request, response) => {
    response.status(404).json({
      success: false,
      message: 'Endpoint tidak ditemukan.',
    });
  });

  return app;
}

export const app = createApp();
