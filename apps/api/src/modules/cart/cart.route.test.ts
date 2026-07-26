import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';
import { InMemoryProductRepository } from '../product/in-memory-product.repository.js';
import type { Product } from '../product/product.types.js';

const product: Product = { id: '20000000-0000-4000-8000-000000000001', name: 'Monstera', slug: 'monstera', description: 'Tanaman tropis pilihan.', price: 100000, stock: 5, imageUrl: null, categoryId: '20000000-0000-4000-8000-000000000002', categoryName: 'Indoor', careLevel: 'EASY', lightRequirement: 'Teduh', wateringFrequency: 'Mingguan', isActive: true, createdAt: new Date(), updatedAt: new Date() };

async function setup() {
  const app = createApp({ productRepository: new InMemoryProductRepository([product]), authSecret: 'cart-test-secret' });
  const login = await request(app).post('/api/auth/login').send({ identity: 'customer', password: 'Customer123!' });
  return { app, token: login.body.data.token as string };
}

describe('Cart API', () => {
  it('menolak akses tanpa autentikasi', async () => { const { app } = await setup(); expect((await request(app).get('/api/cart')).status).toBe(401); });
  it('menambah item dan menghitung total', async () => { const { app, token } = await setup(); const response = await request(app).post('/api/cart/items').set('Authorization', `Bearer ${token}`).send({ productId: product.id, quantity: 2 }); expect(response.status).toBe(201); expect(response.body.data).toMatchObject({ totalQuantity: 2, total: 200000 }); expect(response.body.data.items[0]).toMatchObject({ quantity: 2, subtotal: 200000 }); });
  it('menolak jumlah gabungan yang melebihi stok', async () => { const { app, token } = await setup(); await request(app).post('/api/cart/items').set('Authorization', `Bearer ${token}`).send({ productId: product.id, quantity: 3 }); const response = await request(app).post('/api/cart/items').set('Authorization', `Bearer ${token}`).send({ productId: product.id, quantity: 3 }); expect(response.status).toBe(409); expect(response.body.message).toContain('stok'); });
  it('memperbarui dan menghapus item', async () => { const { app, token } = await setup(); const added = await request(app).post('/api/cart/items').set('Authorization', `Bearer ${token}`).send({ productId: product.id, quantity: 1 }); const itemId = added.body.data.items[0].id as string; const updated = await request(app).patch(`/api/cart/items/${itemId}`).set('Authorization', `Bearer ${token}`).send({ quantity: 4 }); expect(updated.body.data.total).toBe(400000); const removed = await request(app).delete(`/api/cart/items/${itemId}`).set('Authorization', `Bearer ${token}`); expect(removed.body.data.items).toHaveLength(0); });
});
