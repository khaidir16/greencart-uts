import 'dotenv/config';

function readPort(value: string | undefined): number {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error('PORT harus berupa bilangan bulat antara 1 dan 65535.');
  }

  return port;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readPort(process.env.PORT),
  webOrigin: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
  authSecret: process.env.AUTH_SECRET ?? 'development-only-greencart-secret-change-in-production',
} as const;
