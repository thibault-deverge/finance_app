export type BudgetTransaction = {
  category: BudgetCategory;
  date: string; // ISO 8601 format
  amount: number;
  name: string;
};

export type BudgetCategory =
  | 'Entertainment'
  | 'Dine Out'
  | 'General'
  | 'Bills'
  | 'Education'
  | 'Groceries'
  | 'Lifestyle'
  | 'Personal Care'
  | 'Shopping'
  | 'Transportation';

export type TransactionsByCategory = Record<string, BudgetTransaction[]>;