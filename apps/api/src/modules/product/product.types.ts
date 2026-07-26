export type CareLevel = 'EASY' | 'MEDIUM' | 'HARD';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  categoryName?: string;
  careLevel: CareLevel;
  lightRequirement: string;
  wateringFrequency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductWriteInput = Omit<
  Product,
  'id' | 'slug' | 'categoryName' | 'createdAt' | 'updatedAt'
>;

export type ProductListOptions = {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  inStock?: boolean;
  sort: 'newest' | 'name-asc' | 'price-asc' | 'price-desc';
};

export type ProductListResult = { items: Product[]; total: number };
export type ProductCategory = { id: string; name: string; slug: string };
