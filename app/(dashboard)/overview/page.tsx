import { getBudgets } from '@/actions/budgets';
import Overview from '@/components/overview/Overview';

export type Budget = {
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

function page() {
  return <Overview budgets={budgets} />;
}

export default page;
