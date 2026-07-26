import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app.js';

describe('GreenCart API foundation', () => {
  it('mengembalikan status sehat dari health endpoint', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toMatchObject({
      success: true,
      message: 'GreenCart API is healthy.',
      data: {
        service: 'greencart-api',
        status: 'UP',
      },
    });
    expect(response.body.data.timestamp).toEqual(expect.any(String));
  });

  it('mengembalikan JSON 404 untuk endpoint yang tidak tersedia', async () => {
    const response = await request(app).get('/api/not-found');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Endpoint tidak ditemukan.',
    });
  });
});
