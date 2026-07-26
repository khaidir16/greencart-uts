import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('GreenCart routing foundation', () => {
  it('menampilkan identitas GreenCart pada beranda', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /bawa kehidupan/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /jelajahi koleksi/i })).toHaveAttribute('href', '/products');
    expect(screen.getByTestId('botanical-fallback')).toBeInTheDocument();
  });

  it('menampilkan halaman 404 untuk rute yang tidak dikenal', () => {
    render(<MemoryRouter initialEntries={['/halaman-tidak-ada']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /tanaman ini belum tumbuh/i })).toBeInTheDocument();
  });
});
