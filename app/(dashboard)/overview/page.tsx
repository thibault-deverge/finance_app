import { getAllBalances } from '@/actions/balance';
import { getBudgets } from '@/actions/budgets';
import { getAllTransactions } from '@/actions/transactions';
import Overview from '@/components/overview/Overview';
import { Spinner } from '@/components/ui/Spinner';
import { Suspense } from 'react';

async function Page() {
  const budgets = await getBudgets();
  const transactions = await getAllTransactions();
  const balance = await getAllBalances();

  return (
    <Suspense fallback={<Spinner />}>
      <Overview
        budgets={budgets}
        transactions={transactions}
        balance={balance}
      />
    </Suspense>
  );
}

export default Page;
