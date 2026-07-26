import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app.js';

describe('OpenAPI documentation', () => {
  const app = createApp({ authSecret: 'openapi-test-secret' });

  it('menyediakan dokumen OpenAPI JSON dengan endpoint utama', async () => {
    const response = await request(app).get('/api/docs/openapi.json');
    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe('3.1.0');
    expect(response.body.paths).toHaveProperty('/products');
    expect(response.body.paths).toHaveProperty('/cart/items');
    expect(response.body.paths).toHaveProperty('/orders');
    expect(response.body.paths).toHaveProperty('/admin/orders/{id}/status');
  });

  it('menyediakan Swagger UI', async () => {
    const response = await request(app).get('/api/docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('id="swagger-ui"');
    expect(response.text).toContain('GreenCart API Docs');
  });
});
