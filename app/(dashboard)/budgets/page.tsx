import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/actions/budgets';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { getAllTransactions } from '@/actions/transactions';
import { BudgetCategory } from '@/lib/type';

async function Page() {
  const budgets = (await getBudgets()).map((budget) => ({
    ...budget,
    category: budget.category as BudgetCategory,
  }));
  const transactions = await getAllTransactions();

  return (
    <Suspense fallback={<Spinner />}>
      <Budgets budgets={budgets} transactions={transactions} />;
    </Suspense>
  );
}

export default Page;
