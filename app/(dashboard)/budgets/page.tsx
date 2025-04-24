import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/actions/budgets';

const budgets = await getBudgets();

function Page() {
  return <Budgets budgets={budgets} />;
}

export default Page;
