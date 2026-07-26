import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL wajib tersedia ketika koneksi database digunakan.');
}

const globalDatabase = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalDatabase.prisma ?? new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

if (process.env.NODE_ENV !== 'production') globalDatabase.prisma = prisma;
