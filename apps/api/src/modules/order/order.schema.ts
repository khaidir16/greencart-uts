import { z } from 'zod';
export const checkoutSchema = z.object({ recipientName: z.string().trim().min(3, 'Nama penerima minimal 3 karakter.').max(120), phone: z.string().trim().regex(/^\+?[0-9][0-9\s-]{7,19}$/, 'Nomor telepon tidak valid.'), shippingAddress: z.string().trim().min(15, 'Alamat minimal 15 karakter.').max(500) });
export const orderNumberSchema = z.string().trim().min(5).max(40);
export const orderIdSchema = z.uuid('ID pesanan tidak valid.');
export const orderStatusSchema = z.enum(['DRAFT', 'CONFIRMED', 'COMPLETED', 'CANCELLED']);
