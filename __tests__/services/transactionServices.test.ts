import { getTransactions } from '@/services/transactionService';
import { prisma } from '@/lib/prisma';
import { TRANSACTION_PER_PAGE } from '@/lib/constants';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    transaction: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));

const fakeTransactions = [
  {
    id: '1',
    name: 'Transaction 1',
    amount: 100,
    category: 'shopping',
    date: new Date(),
    avatar: '/avatar1.png',
  },
  {
    id: '2',
    name: 'Transaction 2',
    amount: -50,
    category: 'bills',
    date: new Date(),
    avatar: '/avatar2.png',
  },
];

const fakeCount = 2;

describe('getTransactions', () => {
  test('returns transactions and totalCount from Prisma', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      fakeTransactions
    );
    (prisma.transaction.count as jest.Mock).mockResolvedValueOnce(fakeCount);

    const result = await getTransactions({
      search: '',
      category: 'all',
      sortBy: 'latest',
      page: 1,
      itemPerPage: TRANSACTION_PER_PAGE,
    });

    expect(result.transactions).toBe(fakeTransactions);
    expect(result.totalCount).toBe(fakeCount);

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { date: 'desc' },
      take: TRANSACTION_PER_PAGE,
      skip: 0,
    });
    expect(prisma.transaction.count).toHaveBeenCalledWith({ where: {} });
  });

  test('applies a case-insensitive name search filter', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      fakeTransactions
    );
    (prisma.transaction.count as jest.Mock).mockResolvedValueOnce(fakeCount);

    await getTransactions({
      search: 'rent',
      category: 'all',
      sortBy: 'latest',
      page: 2,
      itemPerPage: TRANSACTION_PER_PAGE,
    });

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      where: {
        OR: [{ name: { contains: 'rent', mode: 'insensitive' } }],
      },
      orderBy: { date: 'desc' },
      take: TRANSACTION_PER_PAGE,
      skip: (2 - 1) * TRANSACTION_PER_PAGE,
    });
    expect(prisma.transaction.count).toHaveBeenCalledWith({
      where: {
        OR: [{ name: { contains: 'rent', mode: 'insensitive' } }],
      },
    });
  });

  test('applies a category filter when category is not "all"', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      fakeTransactions
    );
    (prisma.transaction.count as jest.Mock).mockResolvedValueOnce(fakeCount);

    await getTransactions({
      search: '',
      category: 'bills',
      sortBy: 'latest',
      page: 1,
      itemPerPage: TRANSACTION_PER_PAGE,
    });

    const expectedWhere = { category: 'bills' };

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      where: expectedWhere,
      orderBy: { date: 'desc' },
      take: TRANSACTION_PER_PAGE,
      skip: 0,
    });
    expect(prisma.transaction.count).toHaveBeenCalledWith({
      where: expectedWhere,
    });
  });

  test('orders by amount desc when sortBy is "highest"', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      fakeTransactions
    );
    (prisma.transaction.count as jest.Mock).mockResolvedValueOnce(fakeCount);

    await getTransactions({
      search: '',
      category: 'all',
      sortBy: 'highest',
      page: 1,
      itemPerPage: TRANSACTION_PER_PAGE,
    });

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { amount: 'desc' },
      take: TRANSACTION_PER_PAGE,
      skip: 0,
    });
    expect(prisma.transaction.count).toHaveBeenCalledWith({
      where: {},
    });
  });

  test('falls back to latest sort when sortBy is unrecognized', async () => {
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce(
      fakeTransactions
    );
    (prisma.transaction.count as jest.Mock).mockResolvedValueOnce(fakeCount);

    await getTransactions({
      search: '',
      category: 'all',
      sortBy: 'not-a-valid-key',
      page: 1,
      itemPerPage: TRANSACTION_PER_PAGE,
    });

    expect(prisma.transaction.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { date: 'desc' },
      take: TRANSACTION_PER_PAGE,
      skip: 0,
    });
    expect(prisma.transaction.count).toHaveBeenCalledWith({ where: {} });
  });

  it('throws a "Failed to fetch transactions" error when Prisma fails', async () => {
    const prismaError = new Error('DB connection lost');
    (prisma.transaction.findMany as jest.Mock).mockRejectedValueOnce(
      prismaError
    );

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await expect(
      getTransactions({
        search: '',
        category: 'all',
        sortBy: 'latest',
        page: 1,
        itemPerPage: TRANSACTION_PER_PAGE,
      })
    ).rejects.toThrow('Failed to fetch transactions');

    expect(consoleSpy).toHaveBeenCalledWith(
      '[getTransaction Error]',
      prismaError
    );
    consoleSpy.mockRestore();
  });
});
