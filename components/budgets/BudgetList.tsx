import data from '@/data/data.json';

import { BudgetCategory } from '@/lib/utilsBudgets';
import BudgetCard from './BudgetCard';

const { budgets } = data;

function BudgetList() {
  return budgets ? (
    <ul className="flex flex-col gap-6">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.category}
          {...budget}
          category={budget.category as BudgetCategory}
        />
      ))}
    </ul>
  ) : (
    <p>No Budgets</p>
  );
}

export default BudgetList;
