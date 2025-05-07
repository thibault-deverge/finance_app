import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getAllBalances() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  return prisma.balance.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
