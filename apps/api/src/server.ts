import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
  console.log(`GreenCart API berjalan di http://localhost:${env.port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} diterima. Menghentikan GreenCart API...`);
  server.close((error) => {
    if (error) {
      console.error('GreenCart API gagal berhenti dengan bersih.', error);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
