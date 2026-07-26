import { createApp } from '../apps/api/src/app.js';
import { prisma } from '../apps/api/src/config/database.js';
import { env } from '../apps/api/src/config/env.js';
import { PrismaAuthRepository } from '../apps/api/src/modules/auth/prisma-auth.repository.js';
import { PrismaCartRepository } from '../apps/api/src/modules/cart/prisma-cart.repository.js';
import { PrismaOrderRepository } from '../apps/api/src/modules/order/prisma-order.repository.js';
import { PrismaProductRepository } from '../apps/api/src/modules/product/prisma-product.repository.js';

const productRepository = new PrismaProductRepository(prisma);
const authRepository = new PrismaAuthRepository(prisma);
const cartRepository = new PrismaCartRepository(prisma);
const orderRepository = new PrismaOrderRepository(prisma);

export default createApp({
  productRepository,
  authRepository,
  authSecret: env.authSecret,
  protectProductMutations: true,
  cartRepository,
  orderRepository,
});
