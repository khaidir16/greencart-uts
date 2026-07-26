export type AuthRole = 'CUSTOMER' | 'ADMIN';

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  role: AuthRole;
  passwordHash: string;
};

export type PublicUser = Omit<AuthUser, 'passwordHash'>;
