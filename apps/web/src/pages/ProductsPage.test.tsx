import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductsPage } from './ProductsPage';

const response = {
  data: [{ id: 'product-1', name: 'Monstera Deliciosa', slug: 'monstera-deliciosa', description: 'Tanaman tropis untuk ruangan.', price: 185000, stock: 12, imageUrl: null, categoryId: 'category-1', categoryName: 'Tanaman Indoor', careLevel: 'EASY', lightRequirement: 'Tidak langsung', wateringFrequency: 'Seminggu sekali' }],
  meta: { page: 1, limit: 8, total: 1, totalPages: 1 },
};

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('ProductsPage', () => {
  it('menampilkan katalog dari API untuk guest', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(response), { status: 200 }));
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    expect(await screen.findByRole('link', { name: 'Lihat Monstera Deliciosa' })).toBeInTheDocument();
    expect(screen.getByText(/Rp\s*185\.000/)).toBeInTheDocument();
    expect(screen.getByText('1 produk ditemukan')).toBeInTheDocument();
  });

  it('mengirim pencarian dan filter melalui query API', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(response), { status: 200 }));
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    await screen.findByText('Monstera Deliciosa');
    fireEvent.change(screen.getByLabelText('Cari produk'), { target: { value: 'monstera' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cari' }));
    fireEvent.change(screen.getByLabelText('Ketersediaan'), { target: { value: 'true' } });
    await waitFor(() => expect(fetchMock.mock.calls.at(-1)?.[0]).toContain('search=monstera'));
    await waitFor(() => expect(fetchMock.mock.calls.at(-1)?.[0]).toContain('inStock=true'));
  });

  it('menampilkan error API dan dapat mencoba lagi', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ message: 'Server bermasalah.' }), { status: 500 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(response), { status: 200 }));
    render(<MemoryRouter><ProductsPage /></MemoryRouter>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Server bermasalah.');
    fireEvent.click(screen.getByRole('button', { name: 'Coba lagi' }));
    expect(await screen.findByText('Monstera Deliciosa')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
