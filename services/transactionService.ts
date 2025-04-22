import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type TypeOptions = {
  search: string;
  category: string;
  sortBy: string;
};

export async function getTransactions(options: TypeOptions) {
  const { search, category, sortBy } = options;

  const sortMap: Record<string, Prisma.TransactionOrderByWithRelationInput> = {
    latest: { createdAt: 'desc' },
    oldest: { createdAt: 'asc' },
    atoz: { name: 'asc' },
    ztoa: { name: 'desc' },
    highest: { amount: 'desc' },
    lowest: { amount: 'asc' },
  };

  try {
    const where: Prisma.TransactionWhereInput = {};
    const orderBy = sortMap[sortBy] ?? sortMap.latest;

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (category !== 'all') {
      where.category = category;
    }

    const transactions = await prisma.transaction.findMany({ where, orderBy });
    return transactions;
  } catch (error) {
    console.error('[getTransaction Error]', error);
    throw new Error('Failed to fetch transactions');
  }
}
