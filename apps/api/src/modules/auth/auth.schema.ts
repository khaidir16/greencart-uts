import { z } from 'zod';

export const loginSchema = z.object({
  identity: z.string().trim().min(1, 'Email atau username wajib diisi.'),
  password: z.string().min(1, 'Password wajib diisi.'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
