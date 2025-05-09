import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type TypeOptions = {
  search: string;
  category?: string;
  sortBy: string;
  page: number;
  itemPerPage?: number;
  onlyRecurringBills?: boolean;
};

const sortMap: Record<string, Prisma.TransactionOrderByWithRelationInput> = {
  latest: { date: 'desc' },
  oldest: { date: 'asc' },
  atoz: { name: 'asc' },
  ztoa: { name: 'desc' },
  highest: { amount: 'desc' },
  lowest: { amount: 'asc' },
};

export async function getTransactions(options: TypeOptions) {
  const { search, category, sortBy, page, itemPerPage, onlyRecurringBills } =
    options;

  try {
    const where: Prisma.TransactionWhereInput = {};
    const orderBy = sortMap[sortBy] ?? sortMap.latest;

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (category !== 'all') {
      where.category = category;
    }

    if (onlyRecurringBills) {
      where.recurring = true;
    }

    const findArgs: Prisma.TransactionFindManyArgs = {
      where,
      orderBy,
    }

    if (!onlyRecurringBills && itemPerPage) {
      findArgs.take = itemPerPage
      findArgs.skip = (page - 1) * itemPerPage
    }

    const transactions = await prisma.transaction.findMany(findArgs);
    const totalCount = await prisma.transaction.count({ where });

    return { transactions, totalCount };
  } catch (error) {
    console.error('[getTransaction Error]', error);
    throw new Error('Failed to fetch transactions');
  }
}
