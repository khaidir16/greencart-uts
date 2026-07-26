import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';
import { InMemoryProductRepository } from './in-memory-product.repository.js';
import type { Product } from './product.types.js';

const categoryId = '10000000-0000-4000-8000-000000000001';
const productId = '20000000-0000-4000-8000-000000000001';
const missingId = '20000000-0000-4000-8000-999999999999';

const validPayload = {
  name: 'Philodendron Birkin',
  description: 'Tanaman indoor dengan garis putih yang unik.',
  price: 175000,
  stock: 9,
  imageUrl: null,
  categoryId,
  careLevel: 'EASY',
  lightRequirement: 'Cahaya tidak langsung',
  wateringFrequency: 'Satu kali seminggu',
  isActive: true,
} as const;

let repository: InMemoryProductRepository;
let app: ReturnType<typeof createApp>;

beforeEach(() => {
  repository = new InMemoryProductRepository([seedProduct()]);
  app = createApp({ productRepository: repository });
});

describe('Automated REST API — products', () => {
  it('GET /api/products mengembalikan daftar, header, pagination, dan response time', async () => {
    const startedAt = performance.now();
    const response = await request(app).get('/api/products');
    const responseTime = performance.now() - startedAt;

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.headers['x-powered-by']).toBeUndefined();
    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toEqual({ page: 1, limit: 12, total: 1, totalPages: 1 });
    expect(responseTime).toBeLessThan(2000);
  });

  it('GET /api/products mendukung pencarian dan filter stok', async () => {
    const response = await request(app).get('/api/products?search=monstera&inStock=true&sort=price-desc');
    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toBe('Monstera Deliciosa');
  });

  it('GET detail menggunakan ID valid dan memvalidasi field wajib serta tipe data', async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
        description: expect.any(String),
        categoryId: expect.any(String),
      }),
    );
  });

  it('GET detail mengembalikan 404 untuk ID yang tidak ditemukan', async () => {
    const response = await request(app).get(`/api/products/${missingId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Produk tidak ditemukan.');
  });

  it('GET detail mengembalikan 422 untuk format ID yang salah', async () => {
    const response = await request(app).get('/api/products/bukan-uuid');
    expect(response.status).toBe(422);
    expect(response.body.errors[0].field).toBe('request');
  });

  it('POST membuat produk dengan payload valid dan response sesuai request', async () => {
    const response = await request(app).post('/api/products').send(validPayload);
    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject(validPayload);
    expect(response.body.data.slug).toBe('philodendron-birkin');
  });

  it('POST menolak produk tanpa nama', async () => {
    const { name: _name, ...payload } = validPayload;
    void _name;
    const response = await request(app).post('/api/products').send(payload);
    expect(response.status).toBe(422);
    expect(response.body.errors).toContainEqual(expect.objectContaining({ field: 'name' }));
  });

  it('POST menolak harga negatif dengan pesan yang sesuai', async () => {
    const response = await request(app).post('/api/products').send({ ...validPayload, price: -1 });
    expect(response.status).toBe(422);
    expect(response.body.errors[0]).toMatchObject({ field: 'price', message: 'Harga harus lebih besar dari nol.' });
  });

  it('POST menolak stok negatif', async () => {
    const response = await request(app).post('/api/products').send({ ...validPayload, stock: -1 });
    expect(response.status).toBe(422);
    expect(response.body.errors[0].field).toBe('stock');
  });

  it('PATCH memperbarui produk menggunakan payload valid', async () => {
    const response = await request(app).patch(`/api/products/${productId}`).send({ price: 199000, stock: 7 });
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({ id: productId, price: 199000, stock: 7 });
  });

  it('PATCH mengembalikan 404 untuk ID yang tidak ditemukan', async () => {
    const response = await request(app).patch(`/api/products/${missingId}`).send({ stock: 3 });
    expect(response.status).toBe(404);
  });

  it('PATCH menolak payload kosong', async () => {
    const response = await request(app).patch(`/api/products/${productId}`).send({});
    expect(response.status).toBe(422);
  });

  it('DELETE menghapus produk dan detail berikutnya menjadi 404', async () => {
    const deleted = await request(app).delete(`/api/products/${productId}`);
    const lookup = await request(app).get(`/api/products/${productId}`);
    expect(deleted.status).toBe(204);
    expect(deleted.text).toBe('');
    expect(lookup.status).toBe(404);
  });

  it('DELETE mengembalikan 404 untuk ID yang tidak ditemukan', async () => {
    const response = await request(app).delete(`/api/products/${missingId}`);
    expect(response.status).toBe(404);
  });
});

function seedProduct(): Product {
  const timestamp = new Date('2026-07-25T00:00:00.000Z');
  return {
    id: productId,
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    description: 'Tanaman tropis berdaun ikonik untuk ruangan.',
    price: 185000,
    stock: 12,
    imageUrl: null,
    categoryId,
    categoryName: 'Tanaman Indoor',
    careLevel: 'EASY',
    lightRequirement: 'Cahaya tidak langsung',
    wateringFrequency: 'Satu kali seminggu',
    isActive: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
