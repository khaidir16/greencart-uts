import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { InvalidTokenError } from './auth.service.js';
import type { AuthService } from './auth.service.js';
import type { AuthRole } from './auth.types.js';

export function requireAuth(service: AuthService): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.header('authorization');
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
    if (!token) return response.status(401).json({ success: false, message: 'Autentikasi diperlukan.' });
    try {
      request.user = await service.verifyToken(token);
      return next();
    } catch (error) {
      if (error instanceof InvalidTokenError) return response.status(401).json({ success: false, message: error.message });
      return next(error);
    }
  };
}

export function requireRole(role: AuthRole): RequestHandler {
  return (request, response, next) => {
    if (!request.user) return response.status(401).json({ success: false, message: 'Autentikasi diperlukan.' });
    if (request.user.role !== role) return response.status(403).json({ success: false, message: 'Anda tidak memiliki hak akses.' });
    return next();
  };
}
