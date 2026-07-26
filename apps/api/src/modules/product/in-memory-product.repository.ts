import type { ProductRepository } from './product.repository.js';
import type { Product, ProductListOptions, ProductWriteInput } from './product.types.js';

export class InMemoryProductRepository implements ProductRepository {
  private readonly products = new Map<string, Product>();
  private sequence = 1;

  constructor(seed: Product[] = []) {
    seed.forEach((product) => this.products.set(product.id, structuredClone(product)));
  }

  async listCategories() { return [...new Map([...this.products.values()].map((product) => [product.categoryId, { id: product.categoryId, name: product.categoryName ?? 'Kategori', slug: product.categoryId }])).values()]; }

  async list(options: ProductListOptions) {
    let items = [...this.products.values()].filter((product) => product.isActive);
    if (options.search) {
      const search = options.search.toLocaleLowerCase('id-ID');
      items = items.filter((product) =>
        `${product.name} ${product.description}`.toLocaleLowerCase('id-ID').includes(search),
      );
    }
    if (options.categoryId) items = items.filter((product) => product.categoryId === options.categoryId);
    if (options.inStock !== undefined) {
      items = items.filter((product) => (options.inStock ? product.stock > 0 : product.stock === 0));
    }
    items.sort(productSorter(options.sort));
    const total = items.length;
    const start = (options.page - 1) * options.limit;
    return { items: items.slice(start, start + options.limit).map((product) => structuredClone(product)), total };
  }

  async findById(id: string) {
    const product = this.products.get(id);
    return product ? structuredClone(product) : null;
  }

  async findBySlug(slug: string) {
    const product = [...this.products.values()].find((item) => item.slug === slug && item.isActive);
    return product ? structuredClone(product) : null;
  }

  async isSlugTaken(slug: string, exceptId?: string) {
    return [...this.products.values()].some((product) => product.slug === slug && product.id !== exceptId);
  }

  async create(input: ProductWriteInput & { slug: string }) {
    const timestamp = new Date();
    const id = `00000000-0000-4000-8000-${String(this.sequence++).padStart(12, '0')}`;
    const product: Product = { ...input, id, createdAt: timestamp, updatedAt: timestamp };
    this.products.set(id, product);
    return structuredClone(product);
  }

  async update(id: string, input: Partial<ProductWriteInput> & { slug?: string }) {
    const product = this.products.get(id);
    if (!product) return null;
    const updated = { ...product, ...input, updatedAt: new Date() };
    this.products.set(id, updated);
    return structuredClone(updated);
  }

  async delete(id: string) {
    return this.products.delete(id);
  }
}

function productSorter(sort: ProductListOptions['sort']) {
  return (a: Product, b: Product) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'id-ID');
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return b.createdAt.getTime() - a.createdAt.getTime();
  };
}
