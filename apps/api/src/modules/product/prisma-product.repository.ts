import { Prisma, type PrismaClient } from '@prisma/client';
import { ProductDeleteConflictError, type ProductRepository } from './product.repository.js';
import type { ProductListOptions, ProductWriteInput } from './product.types.js';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly database: PrismaClient) {}

  listCategories() { return this.database.category.findMany({ select: { id: true, name: true, slug: true }, orderBy: { name: 'asc' } }); }

  async list(options: ProductListOptions) {
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(options.search && {
        OR: [
          { name: { contains: options.search, mode: 'insensitive' } },
          { description: { contains: options.search, mode: 'insensitive' } },
        ],
      }),
      ...(options.categoryId && { categoryId: options.categoryId }),
      ...(options.category && { category: { slug: options.category } }),
      ...(options.inStock !== undefined && { stock: options.inStock ? { gt: 0 } : 0 }),
    };
    const [records, total] = await this.database.$transaction([
      this.database.product.findMany({
        where,
        include: { category: { select: { name: true } } },
        orderBy: toOrderBy(options.sort),
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.database.product.count({ where }),
    ]);
    return { items: records.map(toProduct), total };
  }

  async findById(id: string) {
    const record = await this.database.product.findUnique({
      where: { id },
      include: { category: { select: { name: true } } },
    });
    return record ? toProduct(record) : null;
  }

  async findBySlug(slug: string) {
    const record = await this.database.product.findFirst({
      where: { slug, isActive: true },
      include: { category: { select: { name: true } } },
    });
    return record ? toProduct(record) : null;
  }

  async isSlugTaken(slug: string, exceptId?: string) {
    return Boolean(
      await this.database.product.findFirst({
        where: { slug, ...(exceptId && { id: { not: exceptId } }) },
        select: { id: true },
      }),
    );
  }

  async create(input: ProductWriteInput & { slug: string }) {
    const record = await this.database.product.create({
      data: input,
      include: { category: { select: { name: true } } },
    });
    return toProduct(record);
  }

  async update(id: string, input: Partial<ProductWriteInput> & { slug?: string }) {
    try {
      const record = await this.database.product.update({
        where: { id },
        data: input,
        include: { category: { select: { name: true } } },
      });
      return toProduct(record);
    } catch (error) {
      if (isPrismaCode(error, 'P2025')) return null;
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.database.product.delete({ where: { id } });
      return true;
    } catch (error) {
      if (isPrismaCode(error, 'P2025')) return false;
      if (isPrismaCode(error, 'P2003')) throw new ProductDeleteConflictError();
      throw error;
    }
  }
}

function toProduct(record: Prisma.ProductGetPayload<{ include: { category: { select: { name: true } } } }>) {
  return {
    ...record,
    price: record.price.toNumber(),
    categoryName: record.category.name,
    careLevel: record.careLevel as 'EASY' | 'MEDIUM' | 'HARD',
    category: undefined,
  };
}

function toOrderBy(sort: ProductListOptions['sort']): Prisma.ProductOrderByWithRelationInput {
  if (sort === 'name-asc') return { name: 'asc' };
  if (sort === 'price-asc') return { price: 'asc' };
  if (sort === 'price-desc') return { price: 'desc' };
  return { createdAt: 'desc' };
}

function isPrismaCode(error: unknown, code: string) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === code;
}
