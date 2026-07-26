import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';
import { InMemoryProductRepository } from '../product/in-memory-product.repository.js';
import type { Product } from '../product/product.types.js';

const categoryId = '10000000-0000-4000-8000-000000000001';
const validProduct = {
  name: 'Calathea Orbifolia',
  description: 'Daun lebar dengan corak alami untuk ruang teduh.',
  price: 165000,
  stock: 5,
  imageUrl: null,
  categoryId,
  careLevel: 'MEDIUM',
  lightRequirement: 'Cahaya tidak langsung',
  wateringFrequency: 'Dua kali seminggu',
  isActive: true,
};

let app: ReturnType<typeof createApp>;

beforeEach(() => {
  app = createApp({
    productRepository: new InMemoryProductRepository([seedProduct()]),
    protectProductMutations: true,
  });
});

describe('Authentication and authorization', () => {
  it('login valid menggunakan email mengembalikan JWT dan public user tanpa password', async () => {
    const response = await request(app).post('/api/auth/login').send({ identity: 'admin@greencart.test', password: 'Admin123!' });
    expect(response.status).toBe(200);
    expect(response.body.data.token).toEqual(expect.any(String));
    expect(response.body.data.user).toMatchObject({ username: 'admin', role: 'ADMIN' });
    expect(response.body.data.user.passwordHash).toBeUndefined();
  });

  it('login valid menggunakan username customer', async () => {
    const response = await request(app).post('/api/auth/login').send({ identity: 'customer', password: 'Customer123!' });
    expect(response.status).toBe(200);
    expect(response.body.data.user.role).toBe('CUSTOMER');
  });

  it('login salah menolak kredensial dengan 401 tanpa membocorkan akun', async () => {
    const response = await request(app).post('/api/auth/login').send({ identity: 'admin', password: 'wrong' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Email/username atau password salah.');
  });

  it('login kosong menghasilkan 422 dan detail field', async () => {
    const response = await request(app).post('/api/auth/login').send({});
    expect(response.status).toBe(422);
    expect(response.body.errors).toEqual(expect.arrayContaining([expect.objectContaining({ field: 'identity' }), expect.objectContaining({ field: 'password' })]));
  });

  it('GET /auth/me menolak request tanpa Bearer token', async () => {
    const response = await request(app).get('/api/auth/me');
    expect(response.status).toBe(401);
  });

  it('GET /auth/me mengembalikan user dari token valid', async () => {
    const login = await request(app).post('/api/auth/login').send({ identity: 'admin', password: 'Admin123!' });
    const response = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${login.body.data.token}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({ username: 'admin', role: 'ADMIN' });
  });

  it('customer ditolak dari mutasi produk dengan 403', async () => {
    const login = await request(app).post('/api/auth/login').send({ identity: 'customer', password: 'Customer123!' });
    const response = await request(app).post('/api/products').set('Authorization', `Bearer ${login.body.data.token}`).send(validProduct);
    expect(response.status).toBe(403);
  });

  it('admin boleh membuat produk setelah autentikasi', async () => {
    const login = await request(app).post('/api/auth/login').send({ identity: 'admin', password: 'Admin123!' });
    const response = await request(app).post('/api/products').set('Authorization', `Bearer ${login.body.data.token}`).send(validProduct);
    expect(response.status).toBe(201);
  });
});

function seedProduct(): Product {
  const timestamp = new Date('2026-07-25T00:00:00.000Z');
  return { id: '20000000-0000-4000-8000-000000000001', name: 'Monstera Deliciosa', slug: 'monstera-deliciosa', description: 'Tanaman tropis berdaun ikonik untuk ruangan.', price: 185000, stock: 12, imageUrl: null, categoryId, categoryName: 'Tanaman Indoor', careLevel: 'EASY', lightRequirement: 'Cahaya tidak langsung', wateringFrequency: 'Satu kali seminggu', isActive: true, createdAt: timestamp, updatedAt: timestamp };
}
