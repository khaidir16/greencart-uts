import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { healthRouter } from './routes/health.route.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: env.webOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRouter);

app.use((_request, response) => {
  response.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan.',
  });
});
