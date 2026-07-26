import type { AuthRole } from '../modules/auth/auth.types.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; email: string; username: string; name: string; role: AuthRole };
  }
}
