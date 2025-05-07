import { getAllBalances } from '@/actions/balance';
import { getBudgets } from '@/actions/budgets';
import { getAllTransactions } from '@/actions/transactions';
import Overview from '@/components/overview/Overview';

async function Page() {
  const budgets = await getBudgets();
  const transactions = await getAllTransactions();
  const balance = await getAllBalances();

  return (
    <Overview budgets={budgets} transactions={transactions} balance={balance} />
  );
}

export default Page;
