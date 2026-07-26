import { compare } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import type { AuthRepository } from './auth.repository.js';
import type { LoginPayload } from './auth.schema.js';
import type { AuthRole, PublicUser } from './auth.types.js';

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email/username atau password salah.');
    this.name = 'InvalidCredentialsError';
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Token autentikasi tidak valid atau sudah kedaluwarsa.');
    this.name = 'InvalidTokenError';
  }
}

export class AuthService {
  private readonly secret: Uint8Array;

  constructor(private readonly repository: AuthRepository, secret: string) {
    this.secret = new TextEncoder().encode(secret);
  }

  async login(payload: LoginPayload) {
    const user = await this.repository.findByIdentity(payload.identity);
    if (!user || !(await compare(payload.password, user.passwordHash))) throw new InvalidCredentialsError();
    const token = await new SignJWT({ role: user.role, email: user.email, username: user.username })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(this.secret);
    return { token, user: toPublicUser(user) };
  }

  async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      if (!payload.sub) throw new InvalidTokenError();
      const user = await this.repository.findById(payload.sub);
      if (!user) throw new InvalidTokenError();
      return toPublicUser(user);
    } catch {
      throw new InvalidTokenError();
    }
  }
}

export function toPublicUser(user: { id: string; email: string; username: string; name: string; role: AuthRole }): PublicUser {
  return { id: user.id, email: user.email, username: user.username, name: user.name, role: user.role };
}
