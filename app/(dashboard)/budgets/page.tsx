import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/actions/budgets';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { getAllTransactions } from '@/actions/transactions';

async function Page() {
  const budgets = await getBudgets();
  const transactions = await getAllTransactions();

  return (
    <Suspense fallback={<Spinner />}>
      <Budgets budgets={budgets} transactions={transactions} />;
    </Suspense>
  );
}

export default Page;
