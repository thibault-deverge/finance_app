import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { TRANSACTION_PER_PAGE } from '@/lib/constants';

type TypeOptions = {
  search: string;
  category: string;
  sortBy: string;
  page: number;
};

export async function getTransactions(options: TypeOptions) {
  const { search, category, sortBy, page } = options;

  const sortMap: Record<string, Prisma.TransactionOrderByWithRelationInput> = {
    latest: { date: 'desc' },
    oldest: { date: 'asc' },
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

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy,
      take: TRANSACTION_PER_PAGE,
      skip: (page - 1) * TRANSACTION_PER_PAGE,
    });
    const totalCount = await prisma.transaction.count({ where });

    return { transactions, totalCount };
  } catch (error) {
    console.error('[getTransaction Error]', error);
    throw new Error('Failed to fetch transactions');
  }
}
