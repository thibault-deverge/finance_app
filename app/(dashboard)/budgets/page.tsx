import { getBudgets } from '@/actions/budgets';
import { getAllTransactions } from '@/actions/transactions';
import Budgets from '@/components/budgets/Budgets';

async function Page() {
  const budgets = await getBudgets();
  const transactions = await getAllTransactions();

  return <Budgets budgets={budgets} transactions={transactions} />;
}

export default Page;
