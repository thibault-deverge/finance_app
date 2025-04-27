// OVERVIEW
export type CardProps = {
  title: string;
  amount: number;
  isFirstCard: boolean;
};
export type TitleProps = {
  name: string;
};

export type CardType = 'pots' | 'budgets' | 'recurringBills';

export type CardMiniType = {
  title: string;
  amount: number;
  color: string;
  type: CardType;
};

// BUDGETS
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

export type Budget = {
  category: BudgetCategory;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  maximum: number;
  theme: string | null;
};

export type Transactions = {
  id: string;
  avatar: string | null;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Balance = {
  id: string;
  current: number;
  income: number;
  expenses: number;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BudgetTransaction = {
  category: BudgetCategory;
  date: string; // ISO 8601 format
  amount: number;
  name: string;
};

export type TransactionsByCategory = Record<string, BudgetTransaction[]>;
