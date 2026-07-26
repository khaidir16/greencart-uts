import type {
  Product,
  ProductListOptions,
  ProductListResult,
  ProductWriteInput,
} from './product.types.js';

export interface ProductRepository {
  list(options: ProductListOptions): Promise<ProductListResult>;
  findById(id: string): Promise<Product | null>;
  isSlugTaken(slug: string, exceptId?: string): Promise<boolean>;
  create(input: ProductWriteInput & { slug: string }): Promise<Product>;
  update(id: string, input: Partial<ProductWriteInput> & { slug?: string }): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

export class ProductDeleteConflictError extends Error {
  constructor() {
    super('Produk tidak dapat dihapus karena telah digunakan pada pesanan.');
    this.name = 'ProductDeleteConflictError';
  }
}
