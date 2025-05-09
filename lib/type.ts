import { Transaction } from '@prisma/client';
import { ReactNode } from 'react';

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

export type TransactionsByCategory = Record<string, Transaction[]>;

export interface FormDataState {
  id: string;
  name: string;
  target: string | number;
  total: string | number;
  category: string;
  maximum: string | number;
  theme: string;
}

// ##############################
// Modal
export interface ModalProps {
  children: ReactNode;
}

export interface ModalContextType {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openName: string;
}

export type OpenProps = {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  opens: string;
};

export interface FormContextType {
  formData: {
    id: string;
    category: string;
    maximum: string | number;
    name: string;
    target: string | number;
    theme: string;
    total: string | number;
  };
  updateFormData: (
    field: keyof FormContextType['formData'],
    value: string | number
  ) => void;
}
