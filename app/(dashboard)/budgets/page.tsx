import Budgets from '@/components/budgets/Budgets';
import { getBudgets } from '@/services/budgetService';

type Budget = {
  category: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  maximum: number;
  theme: string | null;
};

export type BudgetsProps = {
  budgets: Budget[];
};
const budgets = await getBudgets();

function Page() {
  return <Budgets budgets={budgets} />;
}

export default Page;
