import { Transaction } from '@prisma/client';

export type TransactionsByCategory = Record<string, Transaction[]>;
