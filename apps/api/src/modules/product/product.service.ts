import type { ProductRepository } from './product.repository.js';
import type { CreateProductPayload, UpdateProductPayload } from './product.schema.js';
import type { ProductListOptions } from './product.types.js';

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  list(options: ProductListOptions) {
    return this.repository.list(options);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async create(payload: CreateProductPayload) {
    const slug = await this.uniqueSlug(payload.name);
    return this.repository.create({ ...payload, slug });
  }

  async update(id: string, payload: UpdateProductPayload) {
    const slug = payload.name ? await this.uniqueSlug(payload.name, id) : undefined;
    return this.repository.update(id, { ...payload, ...(slug && { slug }) });
  }

  delete(id: string) {
    return this.repository.delete(id);
  }

  private async uniqueSlug(name: string, exceptId?: string) {
    const base = slugify(name);
    let candidate = base;
    let suffix = 2;
    while (await this.repository.isSlugTaken(candidate, exceptId)) candidate = `${base}-${suffix++}`;
    return candidate;
  }
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
