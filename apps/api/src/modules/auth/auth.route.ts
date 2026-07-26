import { Router } from 'express';
import { ZodError } from 'zod';
import { InvalidCredentialsError } from './auth.service.js';
import type { AuthService } from './auth.service.js';
import { loginSchema } from './auth.schema.js';
import { requireAuth } from './auth.middleware.js';

export function createAuthRouter(service: AuthService) {
  const router = Router();

  router.post('/login', async (request, response) => {
    try {
      const result = await service.login(loginSchema.parse(request.body));
      return response.status(200).json({ success: true, message: 'Login berhasil.', data: result });
    } catch (error) {
      if (error instanceof ZodError) return response.status(422).json({ success: false, message: 'Data login tidak valid.', errors: error.issues.map((issue) => ({ field: issue.path.join('.') || 'request', message: issue.message })) });
      if (error instanceof InvalidCredentialsError) return response.status(401).json({ success: false, message: error.message });
      console.error(error);
      return response.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
    }
  });

  router.post('/logout', requireAuth(service), (_request, response) => response.status(204).send());
  router.get('/me', requireAuth(service), (request, response) => response.status(200).json({ success: true, message: 'Profil aktif berhasil diambil.', data: request.user }));
  return router;
}
