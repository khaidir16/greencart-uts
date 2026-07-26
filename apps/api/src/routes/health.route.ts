import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'GreenCart API is healthy.',
    data: {
      service: 'greencart-api',
      status: 'UP',
      timestamp: new Date().toISOString(),
    },
  });
});
