import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/services/budgetService';

const budgets = await getBudgets();

function Page() {
  return <Budgets budgets={budgets} />;
}

export default Page;
