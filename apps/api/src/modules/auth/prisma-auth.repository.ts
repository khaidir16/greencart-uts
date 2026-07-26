import type { PrismaClient } from '@prisma/client';
import type { AuthRepository } from './auth.repository.js';
import type { AuthUser } from './auth.types.js';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly database: PrismaClient) {}

  async findByIdentity(identity: string) {
    const user = await this.database.user.findFirst({
      where: { OR: [{ email: identity.toLowerCase() }, { username: identity }] },
    });
    return user ? toAuthUser(user) : null;
  }

  async findById(id: string) {
    const user = await this.database.user.findUnique({ where: { id } });
    return user ? toAuthUser(user) : null;
  }
}

function toAuthUser(user: { id: string; email: string; username: string; name: string; passwordHash: string; role: 'CUSTOMER' | 'ADMIN' }): AuthUser {
  return { ...user, role: user.role };
}
