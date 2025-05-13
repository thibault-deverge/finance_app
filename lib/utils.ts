import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export interface FinancialSummary {
  paidBills: number;
  totalUpcoming: number;
  dueSoon: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatAmountSign(amount: number): string {
  const sign = amount < 0 ? '-' : '+';
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}\$${formatted}`;
}

export function formatDateToShortString(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }); // ex: "Aug"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function getOrdinalSuffix(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function getMonthlyLabel(day: number): string {
  return `Monthly-${day}${getOrdinalSuffix(day)}`;
}
