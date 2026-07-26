import { createApp } from './app.js';
import { prisma } from './config/database.js';
import { env } from './config/env.js';
import { PrismaProductRepository } from './modules/product/prisma-product.repository.js';

const app = createApp({ productRepository: new PrismaProductRepository(prisma) });

const server = app.listen(env.port, () => {
  console.log(`GreenCart API berjalan di http://localhost:${env.port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} diterima. Menghentikan GreenCart API...`);
  server.close((error) => {
    if (error) {
      console.error('GreenCart API gagal berhenti dengan bersih.', error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
