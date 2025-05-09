'use client';
import type { Transaction } from '@prisma/client';

export function useSortedBills(transactions: Transaction[], sortBy: string) {
  const now = new Date();

  const withDue = transactions.map((tx) => {
    const day = new Date(tx.date).getUTCDate();
    const due = new Date(now.getFullYear(), now.getMonth(), day);
    return { tx, due };
  });

  const sorted = [...withDue].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return a.due.getDate() - b.due.getDate();
      case 'oldest':
        return b.due.getDate() - a.due.getDate();
      case 'atoz':
        return a.tx.name.localeCompare(b.tx.name);
      case 'ztoa':
        return b.tx.name.localeCompare(a.tx.name);
      case 'highest':
        return b.tx.amount - a.tx.amount;
      case 'lowest':
        return a.tx.amount - b.tx.amount;
      default:
        return 0;
    }
  });

  return sorted.map(({ tx }) => tx);
}
