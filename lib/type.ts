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

export type BudgetTransaction = {
  category: BudgetCategory;
  date: string; // ISO 8601 format
  amount: number;
  name: string;
};

export type TransactionsByCategory = Record<string, BudgetTransaction[]>;
