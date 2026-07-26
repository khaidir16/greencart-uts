import { useEffect, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Leaf, PackageSearch, Search, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Product, ProductListMeta } from '../features/products/product.types';
import { apiRequestEnvelope } from '../services/api';

const sortOptions = [
  ['newest', 'Terbaru'],
  ['name-asc', 'Nama A–Z'],
  ['price-asc', 'Harga terendah'],
  ['price-desc', 'Harga tertinggi'],
] as const;

export function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(params.get('search') ?? '');
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ProductListMeta>({ page: 1, limit: 8, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const query = params.toString();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    const apiParams = new URLSearchParams(params);
    apiParams.set('limit', '8');
    apiRequestEnvelope<Product[], ProductListMeta>(`/products?${apiParams}`, { signal: controller.signal })
      .then(({ data, meta: responseMeta }) => { setProducts(data); setMeta(responseMeta); })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'Katalog gagal dimuat.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [query, reloadKey]);

  function updateParam(name: string, value?: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value); else next.delete(name);
    if (name !== 'page') next.delete('page');
    setParams(next);
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    updateParam('search', searchInput.trim() || undefined);
  }

  return (
    <main className="container-shell py-12 sm:py-16">
      <header className="max-w-3xl">
        <p className="section-kicker">Katalog botani</p>
        <h1 className="section-title">Temukan hijau yang cocok untuk ruangmu.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">Jelajahi tanaman dan perlengkapan pilihan, lengkap dengan stok serta panduan perawatan.</p>
      </header>

      <section aria-label="Filter katalog" className="panel mt-9 grid gap-4 p-4 lg:grid-cols-[1fr_auto_auto]">
        <form onSubmit={submitSearch} className="field-shell">
          <Search size={18} aria-hidden="true" />
          <input aria-label="Cari produk" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Cari nama atau deskripsi…" />
          <button className="button-base button-primary px-4 py-2 text-xs" type="submit">Cari</button>
        </form>
        <label className="field-label">
          <span className="sr-only">Ketersediaan</span>
          <select aria-label="Ketersediaan" className="h-[3.25rem] rounded-[.9rem] border border-sage-200 bg-sage-50 px-4 text-sm text-forest-900" value={params.get('inStock') ?? ''} onChange={(event) => updateParam('inStock', event.target.value || undefined)}>
            <option value="">Semua stok</option><option value="true">Tersedia</option><option value="false">Stok habis</option>
          </select>
        </label>
        <label className="field-label">
          <span className="sr-only">Urutkan produk</span>
          <select aria-label="Urutkan produk" className="h-[3.25rem] rounded-[.9rem] border border-sage-200 bg-sage-50 px-4 text-sm text-forest-900" value={params.get('sort') ?? 'newest'} onChange={(event) => updateParam('sort', event.target.value)}>
            {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </section>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600" aria-live="polite">{loading ? 'Memuat produk…' : `${meta.total} produk ditemukan`}</p>
        {(params.has('search') || params.has('inStock') || params.has('sort')) && <button className="button-base button-ghost px-3 py-2 text-xs" onClick={() => { setSearchInput(''); setParams({}); }}>Reset filter</button>}
      </div>

      {loading && <ProductSkeletons />}
      {!loading && error && <div role="alert" className="panel mt-6 grid min-h-56 place-items-center p-8 text-center"><div><PackageSearch className="mx-auto text-terracotta-500" /><h2 className="mt-4 font-display text-xl font-semibold text-forest-950">Katalog belum dapat dimuat</h2><p className="mt-2 text-sm text-slate-600">{error}</p><button className="button-base button-secondary mt-5 px-4 py-2 text-sm" onClick={() => setReloadKey((value) => value + 1)}>Coba lagi</button></div></div>}
      {!loading && !error && products.length === 0 && <div className="panel mt-6 grid min-h-56 place-items-center p-8 text-center"><div><Leaf className="mx-auto text-leaf-600" /><h2 className="mt-4 font-display text-xl font-semibold text-forest-950">Produk tidak ditemukan</h2><p className="mt-2 text-sm text-slate-600">Coba kata pencarian atau filter lain.</p></div></div>}
      {!loading && !error && products.length > 0 && <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>}

      {!loading && !error && meta.totalPages > 1 && <nav aria-label="Pagination katalog" className="mt-10 flex items-center justify-center gap-3"><button className="button-base button-secondary px-4 py-2 text-sm" disabled={meta.page <= 1} onClick={() => updateParam('page', String(meta.page - 1))}><ArrowLeft size={16} /> Sebelumnya</button><span className="text-sm font-semibold text-forest-900">{meta.page} / {meta.totalPages}</span><button className="button-base button-secondary px-4 py-2 text-sm" disabled={meta.page >= meta.totalPages} onClick={() => updateParam('page', String(meta.page + 1))}>Berikutnya <ArrowRight size={16} /></button></nav>}
    </main>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const colors = ['#479c34', '#28763e', '#769f42', '#a2603f'];
  return <article className="product-card flex flex-col"><Link to={`/products/${product.slug}`} aria-label={`Lihat ${product.name}`}><div className="product-visual" style={{ '--product-accent': colors[index % colors.length] } as CSSProperties}>{product.imageUrl ? <img src={product.imageUrl} alt="" className="h-full w-full object-cover" /> : <><div className="product-plant" /><div className="product-pot-mini" /></>}<span className={`badge absolute left-4 top-4 z-10 ${product.stock ? 'badge-green' : 'bg-white text-slate-500'}`}>{product.stock ? `${product.stock} tersedia` : 'Stok habis'}</span></div></Link><div className="flex flex-1 flex-col p-5"><p className="text-[.68rem] font-bold uppercase tracking-[.12em] text-leaf-600">{product.categoryName ?? 'GreenCart'}</p><Link to={`/products/${product.slug}`} className="mt-2 font-display text-xl font-semibold text-forest-950 hover:text-leaf-600">{product.name}</Link><p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{product.description}</p><div className="mt-auto flex items-end justify-between gap-3 pt-5"><div><p className="text-[.65rem] text-slate-500">Harga</p><p className="font-display text-lg font-bold text-forest-900">{formatRupiah(product.price)}</p></div><Link to={`/products/${product.slug}`} className="icon-button bg-sage-100" aria-label={`Pilih ${product.name}`}><ShoppingBag size={18} /></Link></div></div></article>;
}

function ProductSkeletons() { return <div aria-hidden="true" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div key={index} className="product-card"><div className="skeleton h-64" /><div className="space-y-3 p-5"><div className="skeleton h-3 w-24 rounded" /><div className="skeleton h-6 w-4/5 rounded" /><div className="skeleton h-10 rounded" /></div></div>)}</div>; }

function formatRupiah(value: number) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value); }
