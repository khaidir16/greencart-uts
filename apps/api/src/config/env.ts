import 'dotenv/config';

function readPort(value: string | undefined): number {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error('PORT harus berupa bilangan bulat antara 1 dan 65535.');
  }

  return port;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const authSecret = process.env.AUTH_SECRET ?? 'development-only-greencart-secret-change-in-production';
const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:5173';

if (nodeEnv === 'production' && authSecret.length < 32) {
  throw new Error('AUTH_SECRET production wajib memiliki minimal 32 karakter.');
}

if (nodeEnv === 'production' && !process.env.WEB_ORIGIN) {
  throw new Error('WEB_ORIGIN wajib tersedia pada environment production.');
}

export const env = {
  nodeEnv,
  port: readPort(process.env.PORT),
  webOrigin,
  authSecret,
} as const;
