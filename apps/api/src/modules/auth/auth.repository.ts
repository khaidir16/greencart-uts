import type { AuthUser } from './auth.types.js';

export interface AuthRepository {
  findByIdentity(identity: string): Promise<AuthUser | null>;
  findById(id: string): Promise<AuthUser | null>;
}
