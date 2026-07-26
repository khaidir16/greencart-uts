import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, CareLevel, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL wajib tersedia untuk menjalankan seed.');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const categories = [
  ['Tanaman Indoor', 'tanaman-indoor'],
  ['Tanaman Herbal', 'tanaman-herbal'],
  ['Pot dan Wadah', 'pot-dan-wadah'],
  ['Pupuk dan Media', 'pupuk-dan-media'],
  ['Alat Berkebun', 'alat-berkebun'],
] as const;

const products = [
  { name: 'Monstera Deliciosa', slug: 'monstera-deliciosa', category: 'tanaman-indoor', price: 185000, stock: 12, careLevel: CareLevel.EASY, lightRequirement: 'Cahaya tidak langsung', wateringFrequency: '1–2 kali seminggu', description: 'Tanaman tropis berdaun ikonik untuk sudut ruang yang hangat.' },
  { name: 'Sansevieria Laurentii', slug: 'sansevieria-laurentii', category: 'tanaman-indoor', price: 95000, stock: 20, careLevel: CareLevel.EASY, lightRequirement: 'Cahaya rendah hingga terang', wateringFrequency: 'Setiap 2–3 minggu', description: 'Tanaman tangguh dengan siluet tegas dan perawatan minimal.' },
  { name: 'Lavender Hidup', slug: 'lavender-hidup', category: 'tanaman-herbal', price: 125000, stock: 8, careLevel: CareLevel.MEDIUM, lightRequirement: 'Cahaya terang', wateringFrequency: '2–3 kali seminggu', description: 'Aroma lembut dan warna ungu untuk balkon atau jendela.' },
  { name: 'Pot Terakota Aria', slug: 'pot-terakota-aria', category: 'pot-dan-wadah', price: 79000, stock: 25, careLevel: CareLevel.EASY, lightRequirement: 'Tidak berlaku', wateringFrequency: 'Tidak berlaku', description: 'Pot terakota berpori untuk membantu sirkulasi akar.' },
  { name: 'Media Tanam Organik', slug: 'media-tanam-organik', category: 'pupuk-dan-media', price: 45000, stock: 30, careLevel: CareLevel.EASY, lightRequirement: 'Tidak berlaku', wateringFrequency: 'Sesuai tanaman', description: 'Campuran ringan untuk tanaman indoor dan bibit.' },
] as const;

async function main() {
  const categoryMap = new Map<string, string>();
  for (const [name, slug] of categories) {
    const category = await prisma.category.upsert({ where: { slug }, update: { name }, create: { name, slug } });
    categoryMap.set(slug, category.id);
  }

  for (const product of products) {
    const categoryId = categoryMap.get(product.category);
    if (!categoryId) throw new Error(`Kategori seed tidak ditemukan: ${product.category}`);
    const { category, ...productData } = product;
    void category;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...productData, categoryId },
      create: { ...productData, categoryId },
    });
  }

  const [adminPasswordHash, customerPasswordHash] = await Promise.all([
    hash('Admin123!', 10),
    hash('Customer123!', 10),
  ]);
  await prisma.user.upsert({ where: { email: 'admin@greencart.test' }, update: { name: 'Admin GreenCart', role: UserRole.ADMIN, passwordHash: adminPasswordHash }, create: { email: 'admin@greencart.test', username: 'admin', name: 'Admin GreenCart', passwordHash: adminPasswordHash, role: UserRole.ADMIN } });
  await prisma.user.upsert({ where: { email: 'customer@greencart.test' }, update: { name: 'Customer Demo', role: UserRole.CUSTOMER, passwordHash: customerPasswordHash }, create: { email: 'customer@greencart.test', username: 'customer', name: 'Customer Demo', passwordHash: customerPasswordHash, role: UserRole.CUSTOMER } });
  console.log(`Seed selesai: ${products.length} produk, ${categories.length} kategori, dan 2 akun demo.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => prisma.$disconnect());
