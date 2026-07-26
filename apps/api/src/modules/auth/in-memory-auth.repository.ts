import type { AuthRepository } from './auth.repository.js';
import type { AuthUser } from './auth.types.js';

export class InMemoryAuthRepository implements AuthRepository {
  constructor(private readonly users: AuthUser[]) {}

  async findByIdentity(identity: string) {
    const normalized = identity.trim().toLocaleLowerCase('id-ID');
    return this.users.find((user) => user.email.toLowerCase() === normalized || user.username.toLowerCase() === normalized) ?? null;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null;
  }
}
