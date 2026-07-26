import { z } from 'zod';

const name = z.string().trim().min(1, 'Nama produk wajib diisi.').max(160);
const description = z.string().trim().min(10, 'Deskripsi minimal 10 karakter.').max(5000);
const price = z.number({ error: 'Harga harus berupa angka.' }).positive('Harga harus lebih besar dari nol.');
const stock = z.number({ error: 'Stok harus berupa angka.' }).int('Stok harus berupa bilangan bulat.').min(0, 'Stok tidak boleh negatif.');

export const createProductSchema = z.object({
  name,
  description,
  price,
  stock,
  imageUrl: z.url('URL gambar tidak valid.').max(500).nullable().optional().default(null),
  categoryId: z.uuid('ID kategori tidak valid.'),
  careLevel: z.enum(['EASY', 'MEDIUM', 'HARD']),
  lightRequirement: z.string().trim().min(1).max(120),
  wateringFrequency: z.string().trim().min(1).max(120),
  isActive: z.boolean().optional().default(true),
});

export const updateProductSchema = createProductSchema
  .partial()
  .extend({
    imageUrl: z.url('URL gambar tidak valid.').max(500).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Minimal satu field harus diperbarui.',
  });

export const productIdSchema = z.uuid('ID produk tidak valid.');
export const productSlugSchema = z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug produk tidak valid.');

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().trim().max(100).optional(),
  categoryId: z.uuid('ID kategori tidak valid.').optional(),
  inStock: z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
  sort: z.enum(['newest', 'name-asc', 'price-asc', 'price-desc']).default('newest'),
});

export type CreateProductPayload = z.infer<typeof createProductSchema>;
export type UpdateProductPayload = z.infer<typeof updateProductSchema>;
